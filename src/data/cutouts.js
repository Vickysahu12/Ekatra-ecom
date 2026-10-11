// Background-removed versions of a few studio shots (transparent WebP),
// used where a model sits directly on a tinted panel: the hero slider and the fit finder.
export const cutouts = {
  'look-01': { w: 617, h: 1500 },
  'look-02': { w: 659, h: 1465 },
  'look-03': { w: 601, h: 1500 },
  'look-04': { w: 572, h: 1390 },
  'look-05': { w: 644, h: 1500 },
  'look-06': { w: 881, h: 1500 },
  'look-07': { w: 741, h: 1449 },
  'look-08': { w: 1063, h: 1463 },
  'look-09': { w: 808, h: 1500 },
  'look-14': { w: 757, h: 1198 },
  'look-21': { w: 628, h: 1500 },
  'look-22': { w: 560, h: 1500 },
  'look-37': { w: 596, h: 1500 },
}

export const cutout = (id) => ({ id, src: `/media/cutouts/${id}.webp`, ...cutouts[id] })
