# Interior pipeline

Each walkable interior is one Blender file exported to a model and a small data file. The site loads them only when a player steps inside.

## Files

| File | Where | Made by |
| --- | --- | --- |
| `Unicornopolis-interior-<id>.blend` | Project root, next to the town files | Modeled in Blender |
| `public/interiors/<id>/scene.glb` | Web app | `scripts/interiors/export_interior.py` |
| `public/interiors/<id>/scene.json` | Web app | `scripts/interiors/export_interior.py` |
| `public/interiors/<id>/still.webp` | Web app | `scripts/interiors/export_interior.py`, from the `still` camera |

Export from the project root with Blender in the background:

```powershell
& "C:\Program Files (x86)\Steam\steamapps\common\Blender\blender.exe" -b Unicornopolis-interior-bank.blend -P web\scripts\interiors\export_interior.py -- bank
```

The Lost Property, Dreamwell, and Department Recognition Office files can be rebuilt and exported together:

```powershell
& "C:\Program Files (x86)\Steam\steamapps\common\Blender\blender.exe" -b --factory-startup --python-exit-code 1 -P web\scripts\interiors\build_quest_interiors.py
```

This rebuild regenerates all three source files from the script. Use the individual exporter to publish edits made in Blender.

## Naming convention

Blender is Z-up and uses metres. One Blender unit is one metre. The player walks on the ground plane at height 0.

| Object | Type | Purpose |
| --- | --- | --- |
| `floor` | Mesh | The walkable area. Its bounding box sets the walkable rectangle. |
| `blocker.*` | Mesh | Anything the player walks around: counters, benches, walls inside the room. Its footprint becomes a blocked rectangle. Blockers stay visible. |
| `spawn` | Empty | Where the player appears. Its Z rotation is the facing direction. |
| `hotspot.<id>` | Empty | Something the player can interact with. Custom properties: `label` (shown on hover) and optional `radius` in metres (default 1.2). The player walks to the hotspot, then the page handles the interaction by `id`. |
| `exit.<id>` | Empty | A way out. Custom properties: `label` and `href`, the page to open. |
| `still` | Camera | The camera for the still render shown on the page before the player steps in. |
| `walls` collection | Collection | Exported normally. Use for walls and the ceiling-free shell. |
| `hidden` collection | Collection | Not exported. Use for reference images and helpers. |

Keep interiors open from above. The game camera looks down at an angle, so a room without a ceiling reads clearly.

## Data file

`scene.json` uses glTF coordinates, where Y is up and the ground plane is X and Z. The exporter converts each Blender point (x, y) to (x, −y).

```json
{
  "id": "bank",
  "name": "Unicorn Warehouse Bank",
  "floor": { "minX": -8, "maxX": 8, "minZ": -6, "maxZ": 6 },
  "blockers": [{ "minX": -6, "maxX": 6, "minZ": -4.6, "maxZ": -3.6 }],
  "spawn": { "x": 0, "z": 5, "facing": 3.14 },
  "hotspots": [{ "id": "teller", "label": "Everyday Tokens counter", "x": 0, "z": -3, "radius": 1.2 }],
  "exits": [{ "id": "front-door", "label": "Back to town", "href": "/home?lot=bank#town", "x": 0, "z": 5.8 }]
}
```

The site builds a walking grid from the floor and blockers and finds a path with A*. Hotspot and exit positions should sit on open floor, not inside a blocker.

## Art direction

Match the town: low-poly, flat pastel materials, soft rounded shapes, no textures. Use the town palette: butter `#fff3c4`, mint `#dcf5e7`, lilac `#e9ddff`, pink `#ffe2f3`, sky `#dfeeff`, peach `#ffe6d6`, with the purple accent `#7839aa` for signs. Base Color is all the site reads from a material.
