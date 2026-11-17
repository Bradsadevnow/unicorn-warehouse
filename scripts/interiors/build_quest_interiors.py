"""Build the three Horn Fitting interiors and export their web assets."""

import math
import runpy
import sys
from pathlib import Path

import bpy
from mathutils import Vector

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
COLORS = {
    "cream": "fff4cf", "mint": "b9ead4", "leaf": "78b998", "peach": "f8c9ae",
    "pink": "f4bfdb", "lavender": "d3bcec", "pale": "f6eaff", "purple": "643582",
    "blue": "afcce9", "navy": "465b87", "white": "fff9ff", "gold": "e6b45a",
}


def paint(obj, color):
    material = bpy.data.materials.get(color)
    if material is None:
        material = bpy.data.materials.new(color)
        raw = COLORS[color]
        rgb = [int(raw[i:i + 2], 16) / 255 for i in (0, 2, 4)]
        rgba = tuple(c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4 for c in rgb) + (1,)
        material.diffuse_color = rgba
        material.use_nodes = True
        shader = material.node_tree.nodes["Principled BSDF"]
        shader.inputs["Base Color"].default_value = rgba
        shader.inputs["Roughness"].default_value = .78
    obj.data.materials.append(material)
    return obj


def box(name, size, at, color, rounded=True):
    bpy.ops.mesh.primitive_cube_add(size=1, location=at)
    obj = bpy.context.object
    obj.name = name
    obj.scale = size
    bpy.ops.object.transform_apply(scale=True)
    if rounded:
        bevel = obj.modifiers.new("Soft corners", "BEVEL")
        bevel.width = .075
        bevel.segments = 2
    return paint(obj, color)


def cylinder(name, radius, depth, at, color):
    bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=radius, depth=depth, location=at)
    bpy.context.object.name = name
    return paint(bpy.context.object, color)


def sign(label, at, size=.32):
    bpy.ops.object.text_add(location=at, rotation=(math.pi / 2, 0, 0))
    obj = bpy.context.object
    obj.name = label
    obj.data.body = label
    obj.data.align_x = "CENTER"
    obj.data.align_y = "CENTER"
    obj.data.size = size
    obj.data.resolution_u = 3
    paint(obj, "white")
    bpy.ops.object.convert(target="MESH")


def marker(name, x, y, **properties):
    bpy.ops.object.empty_add(location=(x, y, 0))
    obj = bpy.context.object
    obj.name = name
    for key, value in properties.items():
        obj[key] = value


def banner(label, color):
    box("Wall sign", (7.8, .13, .85), (0, 4.95, 2.58), color)
    sign(label, (0, 4.87, 2.58), .42)


def plant(x, y):
    cylinder("blocker.planter", .34, .44, (x, y, .22), "peach")
    for dx, height in [(-.16, .73), (.17, .8), (0, 1.02)]:
        bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=.28, location=(x + dx, y, height))
        bpy.context.object.scale = (1, .85, 1.4)
        paint(bpy.context.object, "leaf")


def lost_property():
    banner("LOST PROPERTY", "navy")
    box("blocker.release-counter", (6.8, 1.05, 1.03), (0, 2.1, .515), "mint")
    box("Counter top", (7, 1.15, .12), (0, 2.1, 1.09), "white")
    for x, label in [(-2, "STATUS"), (0, "RELEASE"), (2, "CLOSURE")]:
        box(label, (1.5, .08, .35), (x, 1.53, .65), "navy")
        sign(label, (x, 1.48, .65), .18)
    for row in range(3):
        for col in range(7):
            x = (col - 3) * .96
            z = .52 + row * .48
            box("Tagged drawer", (.89, .5, .43), (x, 4.46, z), "gold" if (row, col) == (1, 4) else "blue")
            box("Drawer pull", (.25, .08, .065), (x, 4.18, z), "navy")
    box("Queue runner", (2.8, 3.8, .016), (0, -.7, .012), "cream")
    marker("hotspot.release", 0, 1.18, label="Tagged Property counter")


def dreamwell():
    banner("DREAMWELL REST DESK", "purple")
    box("blocker.desk", (4.6, 1, 1), (0, 2.7, .5), "lavender")
    box("Desk top", (4.8, 1.1, .12), (0, 2.7, 1.05), "white")
    box("Verification pad", (.6, .4, .04), (0, 2.38, 1.13), "pink")
    for x in [-4.8, 4.8]:
        box("blocker.pod", (1.9, 3, .43), (x, .65, .24), "blue")
        box("Pod mattress", (1.65, 2.7, .31), (x, .65, .57), "white")
        box("Pod canopy", (1.9, 1.03, .62), (x, 1.65, .95), "pink")
        box("Pod blanket", (1.62, 1.4, .08), (x, -.04, .77), "lavender")
    for x in [-5.8, -3.8, 3.8, 5.8]:
        cylinder("Night light", .18, .55, (x, 4.65, 1.83), "gold")
    box("Quiet runner", (2.6, 4.3, .02), (0, -.5, .011), "lavender")
    marker("hotspot.verification", 0, 1.78, label="Rest Desk")


def department():
    banner("RECOGNITION OFFICE", "purple")
    box("blocker.manager-desk", (4.2, 1.35, .86), (-1.5, 2.35, .43), "peach")
    box("Desk top", (4.35, 1.48, .1), (-1.5, 2.35, .92), "white")
    box("Fitting form", (.59, .48, .03), (-1.5, 1.98, .99), "pink")
    box("blocker.velvet-display", (2.4, 1.26, .88), (3.6, 2.35, .44), "lavender")
    box("Velvet tray", (2.15, .94, .12), (3.6, 2.35, .96), "purple")
    for x in [2.92, 3.6, 4.28]:
        bpy.ops.mesh.primitive_cone_add(vertices=20, radius1=.17, radius2=.045, depth=.47, location=(x, 2.35, 1.23))
        bpy.context.object.name = "Recognition horn"
        paint(bpy.context.object, "gold")
    for x in [-4.5, 0, 4.5]:
        box("Recognition frame", (1.32, .1, .87), (x, 4.91, 1.47), "gold")
        box("Framed certificate", (1.17, .08, .71), (x, 4.84, 1.47), "cream")
    box("Office rug", (5.8, 3.25, .018), (0, -.6, .01), "pink")
    marker("hotspot.fitting", -1.5, 1.16, label="Manager's fitting desk")
    marker("hotspot.recognition", 3.6, 1.19, label="Recognition review")


def build(room_id, name, floor, wall, decorate, exit_path):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.name = name
    scene["interior_name"] = name
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 20
    scene.cycles.use_denoising = True
    scene.render.resolution_x = 1120
    scene.render.resolution_y = 760
    scene.view_settings.view_transform = "Standard"
    scene.render.image_settings.file_format = "WEBP"
    bpy.context.preferences.filepaths.save_version = 0
    box("floor", (14, 10, .1), (0, 0, -.05), floor, False)
    box("Back wall", (14.4, .22, 3.1), (0, 5.11, 1.55), wall, False)
    for side in [-1, 1]:
        box("Side wall", (.22, 10, 2.35), (side * 7.11, 0, 1.175), wall, False)
        box("Front sill", (5.65, .22, .48), (side * 4.27, -5.11, .24), wall)
        plant(side * 6.22, -3.8)
    decorate()
    marker("spawn", 0, -3.55)
    marker("exit.front", 0, -4.65, label="Back to town", href=exit_path)
    bpy.ops.object.camera_add(location=(10.1, -14.4, 12.4))
    camera = bpy.context.object
    camera.name = "still"
    camera.rotation_euler = (Vector((0, .3, .25)) - camera.location).to_track_quat("-Z", "Y").to_euler()
    camera.data.type = "ORTHO"
    camera.data.ortho_scale = 21.5
    scene.camera = camera
    bpy.ops.object.light_add(type="AREA", location=(-2, -4, 10))
    bpy.context.object.data.energy = 1150
    bpy.context.object.data.shape = "DISK"
    bpy.context.object.data.size = 8
    scene.world = bpy.data.worlds.new("Pastel daylight")
    scene.world.use_nodes = True
    scene.world.node_tree.nodes["Background"].inputs["Color"].default_value = (.78, .75, .88, 1)
    scene.world.node_tree.nodes["Background"].inputs["Strength"].default_value = .65
    bpy.ops.wm.save_as_mainfile(filepath=str(ROOT / f"Unicornopolis-interior-{room_id}.blend"))
    sys.argv = [str(HERE / "export_interior.py"), "--", room_id]
    runpy.run_path(str(HERE / "export_interior.py"), run_name="__main__")


build("lost-property", "Lost Property", "white", "mint", lost_property, "/home?lot=police#town")
build("dreamwell", "Dreamwell Rest Desk", "pale", "lavender", dreamwell, "/home?lot=dreamwell#town")
build("department", "Department Recognition Office", "cream", "peach", department, "/home#town")
