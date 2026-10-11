// One entry per photo in public/media/looks (each has a full and a -sm variant).
// w/h reserve layout space, tone is the placeholder colour shown while loading.
// knockout marks pure-white cut-out shots: their white is blended into the page tone.
// To swap in the client's shoot: replace the .webp files (keep the names) and update w/h/tone.
export const media = {
  'look-01': { w: 1200, h: 1799, tone: '#aeadaa' },
  'look-02': { w: 1200, h: 1800, tone: '#c4bfba' },
  'look-03': { w: 1200, h: 1800, tone: '#adafb2' },
  'look-04': { w: 1200, h: 1500, tone: '#b8b4bc' },
  'look-05': { w: 1200, h: 1680, tone: '#b8b8b2' },
  'look-06': { w: 1200, h: 1800, tone: '#b7b9b9' },
  'look-07': { w: 1200, h: 1500, tone: '#848c90' },
  'look-08': { w: 1200, h: 1800, tone: '#b6b8b4' },
  'look-09': { w: 1200, h: 1737, tone: '#a4aeaa' },
  'look-10': { w: 1200, h: 960, tone: '#bbb3a9' },
  'look-11': { w: 1200, h: 1600, tone: '#484a44' },
  'look-12': { w: 1200, h: 1764, tone: '#bebdbc' },
  'look-13': { w: 1200, h: 1800, tone: '#acabaa' },
  'look-14': { w: 1200, h: 1800, tone: '#dbdada' },
  'look-15': { w: 1200, h: 800, tone: '#e6e7e9' },
  'look-16': { w: 1200, h: 1800, tone: '#828e9c' },
  'look-17': { w: 1200, h: 1799, tone: '#484b45' },
  'look-18': { w: 1200, h: 1800, tone: '#7d8e92' },
  'look-19': { w: 1200, h: 1800, tone: '#7c7e73' },
  'look-20': { w: 1200, h: 1800, tone: '#797670' },
  'look-21': { w: 1200, h: 1800, knockout: true, tone: '#e2e2e2' },
  'look-22': { w: 1200, h: 1800, knockout: true, tone: '#d9d8d8' },
  'look-23': { w: 1200, h: 1800, knockout: true, tone: '#d9d9d9' },
  'look-24': { w: 1200, h: 1889, tone: '#111419' },
  'look-25': { w: 1200, h: 900, tone: '#c3c5c1' },
  'look-26': { w: 1200, h: 1800, tone: '#9a9fa3' },
  'look-27': { w: 1600, h: 1067, tone: '#334351' },
  'look-28': { w: 1200, h: 1800, tone: '#3e3e3b' },
  'look-29': { w: 1200, h: 1800, tone: '#444c50' },
  'look-30': { w: 1200, h: 1800, tone: '#3f4447' },
  'look-31': { w: 1200, h: 1800, tone: '#423f43' },
  'look-32': { w: 1200, h: 1800, tone: '#3b6969' },
  'look-33': { w: 1200, h: 1781, tone: '#726a5f' },
  'look-34': { w: 1200, h: 1800, tone: '#7a7d72' },
  'look-35': { w: 1200, h: 1800, tone: '#787a6c' },
  'look-36': { w: 1200, h: 1800, tone: '#216e8b' },
  'look-37': { w: 1200, h: 1800, knockout: true, tone: '#d9e1e5' },
  'look-38': { w: 1200, h: 1800, tone: '#686f79' },
  'look-39': { w: 1200, h: 674, tone: '#41535e' },
  'look-40': { w: 1200, h: 1680, tone: '#53645f' },
}

export const mediaIds = Object.keys(media)

export const imageSet = (id) => ({
  id,
  src: `/media/looks/${id}.webp`,
  srcSm: `/media/looks/${id}-sm.webp`,
  ...media[id],
})
