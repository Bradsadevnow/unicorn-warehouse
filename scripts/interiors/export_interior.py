"""Export a Unicornopolis interior to the web app.

Run with Blender in the background from the project root:

  blender -b Unicornopolis-interior-<id>.blend -P web/scripts/interiors/export_interior.py -- <id>

Writes web/public/interiors/<id>/scene.glb, scene.json, and still.webp.
See web/INTERIORS.md for the naming convention.
"""

import json
import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[3]
interior_id = sys.argv[sys.argv.index("--") + 1]
out = ROOT / "web" / "public" / "interiors" / interior_id
out.mkdir(parents=True, exist_ok=True)


def ground(point):
    """Blender (x, y) on the ground to glTF (x, z)."""
    return round(point.x, 3), round(-point.y, 3)


def footprint(obj):
    corners = [obj.matrix_world @ Vector(corner) for corner in obj.bound_box]
    xs = [c.x for c in corners]
    zs = [-c.y for c in corners]
    return {"minX": round(min(xs), 3), "maxX": round(max(xs), 3), "minZ": round(min(zs), 3), "maxZ": round(max(zs), 3)}


objects = bpy.context.scene.objects
floor = objects.get("floor")
spawn = objects.get("spawn")
if not floor or not spawn:
    sys.exit("An interior needs a 'floor' mesh and a 'spawn' empty.")

spawn_x, spawn_z = ground(spawn.matrix_world.translation)
data = {
    "id": interior_id,
    "name": bpy.context.scene.get("interior_name", interior_id),
    "floor": footprint(floor),
    "blockers": [footprint(obj) for obj in objects if obj.name.startswith("blocker.") and obj.type == "MESH"],
    "spawn": {"x": spawn_x, "z": spawn_z, "facing": round(spawn.matrix_world.to_euler().z, 3)},
    "hotspots": [],
    "exits": [],
}
for obj in objects:
    x, z = ground(obj.matrix_world.translation)
    if obj.name.startswith("hotspot."):
        data["hotspots"].append({
            "id": obj.name.split(".", 1)[1],
            "label": obj.get("label", obj.name),
            "x": x,
            "z": z,
            "radius": float(obj.get("radius", 1.2)),
        })
    elif obj.name.startswith("exit."):
        data["exits"].append({"id": obj.name.split(".", 1)[1], "label": obj.get("label", "Exit"), "href": obj.get("href", "/home#town"), "x": x, "z": z})

(out / "scene.json").write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")

# Export everything visible except helpers and the hidden collection.
hidden = bpy.data.collections.get("hidden")
for obj in objects:
    helper = obj.type in {"EMPTY", "CAMERA", "LIGHT"} or (hidden and obj.name in hidden.all_objects)
    obj.select_set(not helper and obj.visible_get())
bpy.ops.export_scene.gltf(
    filepath=str(out / "scene.glb"),
    export_format="GLB",
    use_selection=True,
    export_apply=True,
    export_yup=True,
    export_cameras=False,
    export_lights=False,
)

# Still render from the 'still' camera.
camera = objects.get("still")
if camera:
    scene = bpy.context.scene
    scene.camera = camera
    scene.render.image_settings.file_format = "WEBP"
    scene.render.image_settings.quality = 88
    scene.render.filepath = str(out / "still.webp")
    bpy.ops.render.render(write_still=True)

print(f"Exported {interior_id}: {len(data['blockers'])} blockers, {len(data['hotspots'])} hotspots, {len(data['exits'])} exits")
