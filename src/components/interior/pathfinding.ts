/** Grid A* over an interior's walkable floor. Coordinates are glTF ground coordinates (x, z). */

export type Rect = { minX: number; maxX: number; minZ: number; maxZ: number };
export type Point = { x: number; z: number };

export type WalkGrid = {
  cols: number;
  rows: number;
  cell: number;
  floor: Rect;
  blocked: Uint8Array;
};

/** Cells within `radius` of a wall or blocker are blocked, so the character never clips into them. */
export function buildGrid(floor: Rect, blockers: readonly Rect[], radius = 0.35, cell = 0.25): WalkGrid {
  const cols = Math.ceil((floor.maxX - floor.minX) / cell);
  const rows = Math.ceil((floor.maxZ - floor.minZ) / cell);
  const blocked = new Uint8Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = floor.minX + (c + 0.5) * cell;
      const z = floor.minZ + (r + 0.5) * cell;
      const outside = x < floor.minX + radius || x > floor.maxX - radius || z < floor.minZ + radius || z > floor.maxZ - radius;
      const inBlocker = blockers.some((b) => x > b.minX - radius && x < b.maxX + radius && z > b.minZ - radius && z < b.maxZ + radius);
      if (outside || inBlocker) blocked[r * cols + c] = 1;
    }
  }
  return { cols, rows, cell, floor, blocked };
}

const toCell = (grid: WalkGrid, { x, z }: Point) => ({
  c: Math.min(grid.cols - 1, Math.max(0, Math.floor((x - grid.floor.minX) / grid.cell))),
  r: Math.min(grid.rows - 1, Math.max(0, Math.floor((z - grid.floor.minZ) / grid.cell))),
});
const toPoint = (grid: WalkGrid, c: number, r: number): Point => ({
  x: grid.floor.minX + (c + 0.5) * grid.cell,
  z: grid.floor.minZ + (r + 0.5) * grid.cell,
});
const isOpen = (grid: WalkGrid, c: number, r: number) =>
  c >= 0 && r >= 0 && c < grid.cols && r < grid.rows && !grid.blocked[r * grid.cols + c];

/** The nearest open cell to a point, searching outward. */
function nearestOpen(grid: WalkGrid, start: { c: number; r: number }) {
  if (isOpen(grid, start.c, start.r)) return start;
  for (let ring = 1; ring < Math.max(grid.cols, grid.rows); ring++) {
    let best: { c: number; r: number; d: number } | undefined;
    for (let dr = -ring; dr <= ring; dr++) {
      for (let dc = -ring; dc <= ring; dc++) {
        if (Math.max(Math.abs(dc), Math.abs(dr)) !== ring) continue;
        const c = start.c + dc;
        const r = start.r + dr;
        const d = dc * dc + dr * dr;
        if (isOpen(grid, c, r) && (!best || d < best.d)) best = { c, r, d };
      }
    }
    if (best) return best;
  }
  return start;
}

/** True when a straight walk between two points stays on open cells. */
function lineOfSight(grid: WalkGrid, a: Point, b: Point) {
  const steps = Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / (grid.cell / 2));
  for (let i = 0; i <= steps; i++) {
    const t = steps === 0 ? 0 : i / steps;
    const { c, r } = toCell(grid, { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t });
    if (!isOpen(grid, c, r)) return false;
  }
  return true;
}

/** Waypoints from `from` to the open point nearest `to`, smoothed so the character walks in straight lines. */
export function findPath(grid: WalkGrid, from: Point, to: Point): Point[] {
  const start = nearestOpen(grid, toCell(grid, from));
  const goal = nearestOpen(grid, toCell(grid, to));
  const key = (c: number, r: number) => r * grid.cols + c;
  const open = new Map<number, { c: number; r: number; g: number; f: number }>();
  const came = new Map<number, number>();
  const gScore = new Map<number, number>();
  const h = (c: number, r: number) => Math.hypot(goal.c - c, goal.r - r);
  open.set(key(start.c, start.r), { ...start, g: 0, f: h(start.c, start.r) });
  gScore.set(key(start.c, start.r), 0);

  while (open.size) {
    let currentKey = -1;
    let current: { c: number; r: number; g: number; f: number } | undefined;
    for (const [k, node] of open) if (!current || node.f < current.f) { current = node; currentKey = k; }
    if (!current) break;
    if (current.c === goal.c && current.r === goal.r) {
      const cells: Point[] = [];
      let k: number | undefined = currentKey;
      while (k !== undefined) {
        cells.unshift(toPoint(grid, k % grid.cols, Math.floor(k / grid.cols)));
        k = came.get(k);
      }
      // Finish at the exact target when it is open, otherwise at the nearest open cell.
      const end = isOpen(grid, toCell(grid, to).c, toCell(grid, to).r) ? to : cells[cells.length - 1];
      cells[cells.length - 1] = end;
      return smooth(grid, [from, ...cells.slice(1)]);
    }
    open.delete(currentKey);
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue;
        const c = current.c + dc;
        const r = current.r + dr;
        if (!isOpen(grid, c, r)) continue;
        // No cutting corners past a blocked cell.
        if (dc && dr && (!isOpen(grid, current.c + dc, current.r) || !isOpen(grid, current.c, current.r + dr))) continue;
        const g = current.g + (dc && dr ? Math.SQRT2 : 1);
        const k = key(c, r);
        if (g >= (gScore.get(k) ?? Infinity)) continue;
        gScore.set(k, g);
        came.set(k, currentKey);
        open.set(k, { c, r, g, f: g + h(c, r) });
      }
    }
  }
  return [];
}

function smooth(grid: WalkGrid, points: Point[]) {
  if (points.length < 3) return points;
  const result = [points[0]];
  let anchor = 0;
  for (let i = 2; i < points.length; i++) {
    if (!lineOfSight(grid, points[anchor], points[i])) {
      result.push(points[i - 1]);
      anchor = i - 1;
    }
  }
  result.push(points[points.length - 1]);
  return result;
}
