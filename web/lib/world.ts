// Coarse world coastlines as [lat, lon] polylines, one per landmass.
//
// Kept as separate runs rather than one array: sampling dots along a single
// chain would draw a dotted trail across every ocean between continents.
// Deliberately low-resolution , these are read at the size of a phone screen,
// where the shape of a continent registers and its inlets do not.

export const WORLD: readonly (readonly [number, number][])[] = [
  // North America
  [
    [70, -160], [65, -150], [60, -140], [55, -133], [48, -125], [40, -124], [32, -117],
    [23, -110], [20, -105], [16, -95], [18, -92], [21, -87], [25, -80], [30, -81],
    [35, -76], [40, -74], [45, -67], [48, -60], [52, -56], [58, -62], [63, -77],
    [68, -83], [70, -95], [70, -125], [70, -160],
  ],
  // Central America and the Caribbean arc
  [[16, -95], [14, -88], [10, -84], [9, -79], [11, -74]],
  [[23, -81], [20, -75], [18, -70], [18, -66]],
  // South America
  [
    [11, -74], [10, -64], [8, -60], [5, -52], [0, -50], [-5, -36], [-10, -36],
    [-15, -39], [-23, -43], [-28, -48], [-34, -54], [-38, -58], [-42, -64], [-50, -68],
    [-55, -68], [-52, -72], [-45, -74], [-38, -73], [-30, -71], [-23, -70], [-18, -70],
    [-12, -77], [-5, -81], [0, -80], [6, -77], [11, -74],
  ],
  // Africa
  [
    [36, -6], [33, 10], [32, 20], [31, 25], [30, 32], [22, 37], [12, 43], [10, 51],
    [2, 42], [-5, 39], [-15, 40], [-25, 33], [-34, 26], [-34, 18], [-23, 14],
    [-12, 13], [-5, 9], [4, 9], [6, -2], [5, -9], [12, -16], [20, -17], [28, -13],
    [33, -9], [36, -6],
  ],
  // Europe: Iberia up to Scandinavia, then the Mediterranean back
  [
    [36, -9], [43, -9], [48, -5], [51, 2], [54, 8], [58, 8], [62, 5], [68, 15],
    [70, 28], [66, 33], [60, 29], [55, 21], [54, 14], [45, 13], [41, 16], [38, 16],
    [40, 24], [41, 29], [45, 30], [46, 37],
  ],
  // Asia
  [
    [70, 30], [72, 55], [73, 75], [75, 95], [72, 110], [70, 130], [65, 145], [60, 160],
    [55, 160], [50, 142], [45, 135], [40, 127], [35, 126], [30, 122], [23, 117],
    [20, 110], [12, 109], [8, 100], [15, 95], [20, 92], [22, 90], [20, 85], [15, 80],
    [8, 77], [15, 73], [22, 69], [25, 60], [27, 57], [25, 52], [29, 48], [37, 49],
    [42, 48], [45, 38], [46, 37],
  ],
  // Japan
  [[45, 142], [40, 141], [35, 140], [33, 131]],
  // Australia
  [
    [-11, 131], [-12, 137], [-16, 141], [-21, 149], [-28, 153], [-34, 151], [-38, 146],
    [-35, 139], [-32, 134], [-34, 124], [-33, 116], [-26, 114], [-20, 118], [-14, 127],
    [-11, 131],
  ],
  // New Zealand, Madagascar, the British Isles: small, but their absence reads
  [[-35, 173], [-41, 175], [-46, 168]],
  [[-12, 49], [-20, 44], [-25, 47]],
  [[58, -5], [55, -6], [51, -4], [53, 0], [58, -2]],
];

/** Sample every polyline into an even run of points on a sphere of radius r. */
export function worldPoints(r: number, stepDeg = 1.4): number[] {
  const out: number[] = [];
  for (const line of WORLD) {
    for (let i = 0; i < line.length - 1; i++) {
      const [lat1, lon1] = line[i];
      const [lat2, lon2] = line[i + 1];
      const span = Math.hypot(lat2 - lat1, lon2 - lon1);
      const steps = Math.max(1, Math.round(span / stepDeg));
      for (let s = 0; s < steps; s++) {
        const k = s / steps;
        const lat = lat1 + (lat2 - lat1) * k;
        const lon = lon1 + (lon2 - lon1) * k;
        const phi = ((90 - lat) * Math.PI) / 180;
        const theta = ((lon + 180) * Math.PI) / 180;
        out.push(
          -r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
      }
    }
  }
  return out;
}
