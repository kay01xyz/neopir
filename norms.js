// Adult Form S norm constants digitised from the user-supplied male/female
// profile sheets. T scores are generated for the complete raw-score range.
(function () {
  "use strict";

  const stats = {
    male: {
      N: [75.2, 19.9], E: [108.5, 18.5], O: [110.1, 17.5], A: [120.1, 16.1], C: [123.6, 17.4],
      N1: [13.3, 4.9], N2: [12.2, 4.5], N3: [11.6, 5.2], N4: [13.7, 4.3], N5: [15.3, 4.2], N6: [9.2, 3.7],
      E1: [22.3, 4.0], E2: [16.0, 4.9], E3: [16.3, 4.7], E4: [17.3, 4.3], E5: [17.2, 4.7], E6: [19.5, 4.3],
      O1: [17.0, 4.7], O2: [16.7, 5.4], O3: [19.7, 3.8], O4: [16.1, 3.8], O5: [19.8, 5.0], O6: [20.8, 4.5],
      A1: [20.9, 4.3], A2: [20.3, 4.3], A3: [22.8, 3.6], A4: [18.1, 3.7], A5: [18.1, 4.4], A6: [19.9, 3.8],
      C1: [22.5, 3.5], C2: [18.9, 4.1], C3: [23.2, 3.9], C4: [19.3, 4.1], C5: [21.8, 4.2], C6: [17.8, 4.0]
    },
    female: {
      N: [83.1, 21.7], E: [110.3, 18.4], O: [111.0, 17.2], A: [128.5, 14.4], C: [122.7, 17.8],
      N1: [15.4, 5.4], N2: [12.6, 4.8], N3: [12.9, 5.6], N4: [15.0, 4.5], N5: [16.3, 4.6], N6: [10.9, 4.0],
      E1: [23.6, 3.8], E2: [17.0, 4.7], E3: [15.4, 4.8], E4: [17.8, 4.4], E5: [15.7, 5.1], E6: [20.8, 4.5],
      O1: [16.2, 5.0], O2: [18.5, 5.1], O3: [20.8, 4.1], O4: [16.8, 3.6], O5: [18.2, 5.0], O6: [20.5, 3.8],
      A1: [21.7, 4.0], A2: [22.2, 4.3], A3: [24.3, 3.2], A4: [19.6, 4.1], A5: [19.7, 3.8], A6: [21.0, 3.1],
      C1: [21.8, 3.5], C2: [19.1, 4.2], C3: [23.2, 3.8], C4: [19.6, 3.9], C5: [21.7, 4.4], C6: [17.3, 4.3]
    }
  };

  function makeLookup(mean, sd, maximum) {
    return Array.from({ length: maximum + 1 }, (_, raw) => {
      const t = Math.round(50 + (10 * (raw - mean)) / sd);
      return Math.max(20, Math.min(80, t));
    });
  }

  const tables = {};
  Object.entries(stats).forEach(([sex, scales]) => {
    tables[sex] = {};
    Object.entries(scales).forEach(([scale, values]) => {
      tables[sex][scale] = makeLookup(values[0], values[1], scale.length === 1 ? 192 : 32);
    });
  });

  window.NEO_NORMS = Object.freeze({
    version: "adult-form-s-profile-sheets-v1",
    stats,
    tables,
    tScore(sex, scale, raw) {
      const table = tables[sex] && tables[sex][scale];
      if (!table || !Number.isInteger(raw) || raw < 0 || raw >= table.length) return null;
      return table[raw];
    },
    band(t) {
      if (t <= 34) return "非常低";
      if (t <= 44) return "低";
      if (t <= 55) return "平均";
      if (t <= 65) return "高";
      return "非常高";
    }
  });
})();
