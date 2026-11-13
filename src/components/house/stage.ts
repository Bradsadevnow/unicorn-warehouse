/** Shared, mutable pose for the house object. Scroll handlers write to it;
 *  the WebGL scene reads it every frame. Kept outside React on purpose so
 *  scrolling never triggers a render. */
export const stage = {
  /** Horizontal position as a fraction of half the viewport width. */
  x: 0,
  /** Vertical position as a fraction of half the viewport height. */
  y: 0,
  /** Uniform scale. */
  s: 1,
  /** Yaw and roll, radians. */
  ry: 0,
  rz: 0,
  /** 0 assembled, 1 fully separated. */
  explode: 0,
  /** 0 before the entrance, 1 once the object has arrived. */
  intro: 0,
  /** Pointer position, -1..1. */
  mx: 0,
  my: 0,
  /** Per-house constants, set when the page mounts. */
  tilt: 0,
  fitWidth: 3.3,
  baseYaw: 0,
  sway: false,
};

export type Stage = typeof stage;
