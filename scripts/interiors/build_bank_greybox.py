"""Build the Unicorn Warehouse Bank interior greybox.

A one-off starting point that follows web/INTERIORS.md. Run headless from the project root:

  blender -b --factory-startup -P web/scripts/interiors/build_bank_greybox.py

Saves Unicornopolis-interior-bank.blend in the project root. Open it to model over the greybox,
then export with export_interior.py. Running this again overwrites the .blend.
"""

import math
from pathlib import Path

import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[3]

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.name = "Unicorn Warehouse Bank"
scene["interior_name"] = "Unicorn Warehouse Bank"

PALETTE = {
    "floor": "#fff3c4",
    "wall": "#fbeefe",
    "trim": "#e9ddff",
    "counter": "#dcf5e7",
    "counter_top": "#fffaff",
    "glass": "#dfeeff",
    "vault": "#e8d27a",
    "vault_trim": "#c8a84e",
    "kiosk": "#ffe2f3",
    "bench": "#ffe6d6",
    "rope": "#bd478e",
    "post": "#c8a84e",
    "plant": "#8fd3a8",
    "pot": "#ffe6d6",
    "sign": "#7839aa",
    "sign_text": "#fffaff",
    "chain": "#a0a3ad",
    "pen": "#7839aa",
}


def material(name):
    if name in bpy.data.materials:
        return bpy.data.materials[name]
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = next(node for node in mat.node_tree.nodes if node.type == "BSDF_PRINCIPLED")
    hex_color = PALETTE[name].lstrip("#")
    rgb = [int(hex_color[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    # Hex colors are sRGB. Base Color expects linear values.
    linear = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in rgb]
    bsdf.inputs["Base Color"].default_value = (*linear, 1)
    bsdf.inputs["Roughness"].default_value = 0.8
    return mat


def box(name, size, location, mat, bevel=0.04):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = size
    bpy.ops.object.transform_apply(scale=True)
    obj.data.materials.append(material(mat))
    if bevel:
        mod = obj.modifiers.new("Bevel", "BEVEL")
        mod.width = bevel
        mod.segments = 2
    return obj


def cylinder(name, radius, depth, location, mat, vertices=24, rotation=(0, 0, 0)):
    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=depth, location=location, vertices=vertices, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material(mat))
    return obj


def sphere(name, radius, location, mat):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=radius, location=location, segments=16, ring_count=8)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(material(mat))
    return obj


def text(name, body, location, size, mat, rotation=(math.radians(90), 0, 0)):
    bpy.ops.object.text_add(location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.body = body
    obj.data.size = size
    obj.data.align_x = "CENTER"
    obj.data.align_y = "CENTER"
    # Flat, low-resolution lettering. The default curve resolution produces thousands of vertices per sign.
    obj.data.extrude = 0
    obj.data.resolution_u = 3
    obj.data.materials.append(material(mat))
    bpy.ops.object.convert(target="MESH")
    return obj


def empty(name, location, **props):
    bpy.ops.object.empty_add(type="SPHERE", radius=0.4, location=location)
    obj = bpy.context.object
    obj.name = name
    for key, value in props.items():
        obj[key] = value
    return obj


W, D, H = 16.0, 12.0, 3.0  # room width (x), depth (y), wall height

# Floor and shell. The front wall is low so the game camera can see in.
box("floor", (W, D, 0.1), (0, 0, -0.05), "floor", bevel=0)
box("wall.back", (W, 0.3, H), (0, D / 2 + 0.15, H / 2), "wall", bevel=0)
box("wall.left", (0.3, D, H), (-W / 2 - 0.15, 0, H / 2), "wall", bevel=0)
box("wall.right", (0.3, D, H), (W / 2 + 0.15, 0, H / 2), "wall", bevel=0)
box("wall.front.left", (W / 2 - 1.4, 0.3, 0.7), (-(W / 4 + 0.7), -D / 2 - 0.15, 0.35), "trim")
box("wall.front.right", (W / 2 - 1.4, 0.3, 0.7), ((W / 4 + 0.7), -D / 2 - 0.15, 0.35), "trim")
box("trim.back", (W, 0.34, 0.25), (0, D / 2 + 0.15, H - 0.12), "trim", bevel=0)

# Teller counter with three windows. The right end leaves a path to the vault.
box("blocker.counter", (8.0, 0.9, 1.1), (-2.0, 3.0, 0.55), "counter")
box("counter.top", (8.2, 1.05, 0.08), (-2.0, 3.0, 1.14), "counter_top", bevel=0.02)
for i, x in enumerate((-4.8, -2.0, 0.8)):
    box(f"counter.window.{i}", (2.2, 0.06, 1.0), (x, 3.25, 1.7), "glass", bevel=0.02)
    box(f"counter.divider.{i}", (0.12, 0.6, 1.1), (x + 1.2, 3.2, 1.7), "trim", bevel=0.02)
box("sign.counter", (6.0, 0.08, 0.6), (-2.0, D / 2 - 0.05, 2.45), "sign", bevel=0.02)
text("sign.counter.text", "Everyday Tokens", (-2.0, D / 2 - 0.12, 2.45), 0.38, "sign_text")

# The chained pen, the only pen in town.
box("pen.stand", (0.35, 0.25, 0.12), (1.4, 2.6, 1.24), "counter_top", bevel=0.02)
cylinder("pen", 0.03, 0.42, (1.4, 2.6, 1.34), "pen", vertices=8, rotation=(0, math.radians(80), math.radians(20)))
for i in range(6):
    bpy.ops.mesh.primitive_torus_add(major_radius=0.045, minor_radius=0.012, major_segments=10, minor_segments=5, location=(1.5 + i * 0.07, 2.62, 1.22), rotation=(0, math.radians(90 * (i % 2)), 0))
    link = bpy.context.object
    link.name = f"pen.chain.{i}"
    link.data.materials.append(material("chain"))

# The vault for Sparkle Savings, on the back wall past the counter.
cylinder("vault.door", 1.3, 0.25, (5.2, D / 2 - 0.1, 1.45), "vault", vertices=40, rotation=(math.radians(90), 0, 0))
cylinder("vault.ring", 1.45, 0.12, (5.2, D / 2 - 0.02, 1.45), "vault_trim", vertices=40, rotation=(math.radians(90), 0, 0))
cylinder("vault.wheel", 0.35, 0.12, (5.2, D / 2 - 0.3, 1.45), "vault_trim", vertices=6, rotation=(math.radians(90), 0, 0))
text("vault.text", "Sparkle Savings", (5.2, D / 2 - 0.25, 3.0 - 0.32), 0.3, "sign")
text("vault.rate", "5.00% Annual Percentage Sparkle", (5.2, D / 2 - 0.25, 0.22), 0.16, "sign")

# Early Payday kiosk on the left.
box("blocker.kiosk", (0.9, 0.9, 1.5), (-6.9, -1.0, 0.75), "kiosk")
box("kiosk.screen", (0.06, 0.7, 0.5), (-6.42, -1.0, 1.3), "glass", bevel=0.01)
text("kiosk.text", "Early Payday", (-6.9, -1.0, 1.75), 0.22, "sign", rotation=(math.radians(90), 0, math.radians(90)))

# Fee board on the left wall.
box("fees.board", (0.08, 2.6, 1.6), (-W / 2 + 0.06, 3.0, 1.7), "sign", bevel=0.02)
text("fees.text", "Simple, transparent fees", (-W / 2 + 0.12, 3.0, 2.3), 0.16, "sign_text", rotation=(math.radians(90), 0, math.radians(90)))
for i in range(5):
    box(f"fees.line.{i}", (0.02, 2.0, 0.06), (-W / 2 + 0.12, 3.0, 2.0 - i * 0.22), "sign_text", bevel=0)

# Queue ropes in front of the counter.
for i, x in enumerate((-5.6, -3.6, -1.6, 0.4)):
    cylinder(f"queue.post.{i}", 0.06, 1.0, (x, 0.9, 0.5), "post", vertices=12)
    sphere(f"queue.post.cap.{i}", 0.09, (x, 0.9, 1.02), "post")
box("blocker.queue", (6.0, 0.12, 0.12), (-2.6, 0.9, 0.85), "rope", bevel=0.03)

# Waiting bench and plants.
box("blocker.bench", (2.4, 0.7, 0.5), (5.6, -3.2, 0.25), "bench")
box("bench.back", (2.4, 0.15, 0.6), (5.6, -2.9, 0.75), "bench")
for i, (x, y) in enumerate(((-7.2, 5.2), (7.2, -5.2), (-7.2, -5.2))):
    cylinder(f"blocker.pot.{i}", 0.35, 0.5, (x, y, 0.25), "pot", vertices=16)
    sphere(f"plant.{i}", 0.5, (x, y, 0.85), "plant")

# Game data.
spawn = empty("spawn", (0, -4.8, 0))
spawn.rotation_euler.z = 0
empty("hotspot.teller", (-2.0, 1.9, 0), label="Everyday Tokens counter", radius=1.4)
empty("hotspot.pen", (1.4, 1.9, 0), label="The chained pen", radius=1.0)
empty("hotspot.vault", (5.2, 4.6, 0), label="Sparkle Savings vault", radius=1.4)
empty("hotspot.kiosk", (-5.9, -1.0, 0), label="Early Payday kiosk", radius=1.1)
empty("hotspot.fees", (-6.6, 3.0, 0), label="Fee board", radius=1.2)
empty("exit.front", (0, -5.6, 0), label="Back to town", href="/home?lot=bank#town")

# Still camera and light for the page render.
bpy.ops.object.camera_add(location=(9.5, -15.5, 12.5))
camera = bpy.context.object
camera.name = "still"
direction = Vector((0, 0.6, 0.6)) - camera.location
camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
camera.data.lens = 38
scene.camera = camera

bpy.ops.object.light_add(type="SUN", location=(-6, -8, 12))
sun = bpy.context.object
sun.data.energy = 3.2
sun.rotation_euler = (math.radians(48), math.radians(-18), math.radians(-30))

world = bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True
background = next(node for node in world.node_tree.nodes if node.type == "BACKGROUND")
background.inputs["Color"].default_value = (0.86, 0.9, 0.95, 1)
background.inputs["Strength"].default_value = 0.9

engines = [item.identifier for item in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items]
scene.render.engine = next((engine for engine in engines if "EEVEE" in engine), engines[0])
scene.render.resolution_x = 1400
scene.render.resolution_y = 900
scene.render.film_transparent = False
scene.view_settings.view_transform = "Standard"

target = ROOT / "Unicornopolis-interior-bank.blend"
bpy.ops.wm.save_as_mainfile(filepath=str(target))
print(f"Saved {target}")
