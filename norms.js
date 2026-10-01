// Raw-score bands transcribed from the corrected Markdown norm files. No T-score conversion.
(function () {
 "use strict";
 const ranges = {
  "male": {
    "N": [
      {
        "key": "very-high",
        "min": 107,
        "max": 192
      },
      {
        "key": "high",
        "min": 87,
        "max": 106
      },
      {
        "key": "average",
        "min": 65,
        "max": 86
      },
      {
        "key": "low",
        "min": 45,
        "max": 64
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 44
      }
    ],
    "E": [
      {
        "key": "very-high",
        "min": 138,
        "max": 192
      },
      {
        "key": "high",
        "min": 119,
        "max": 137
      },
      {
        "key": "average",
        "min": 99,
        "max": 118
      },
      {
        "key": "low",
        "min": 80,
        "max": 98
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 79
      }
    ],
    "O": [
      {
        "key": "very-high",
        "min": 138,
        "max": 192
      },
      {
        "key": "high",
        "min": 120,
        "max": 137
      },
      {
        "key": "average",
        "min": 101,
        "max": 119
      },
      {
        "key": "low",
        "min": 83,
        "max": 100
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 82
      }
    ],
    "A": [
      {
        "key": "very-high",
        "min": 146,
        "max": 192
      },
      {
        "key": "high",
        "min": 129,
        "max": 145
      },
      {
        "key": "average",
        "min": 112,
        "max": 128
      },
      {
        "key": "low",
        "min": 96,
        "max": 111
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 95
      }
    ],
    "C": [
      {
        "key": "very-high",
        "min": 151,
        "max": 192
      },
      {
        "key": "high",
        "min": 134,
        "max": 150
      },
      {
        "key": "average",
        "min": 115,
        "max": 133
      },
      {
        "key": "low",
        "min": 97,
        "max": 114
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 96
      }
    ],
    "N1": [
      {
        "key": "very-high",
        "min": 21,
        "max": 32
      },
      {
        "key": "high",
        "min": 16,
        "max": 20
      },
      {
        "key": "average",
        "min": 11,
        "max": 15
      },
      {
        "key": "low",
        "min": 6,
        "max": 10
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 5
      }
    ],
    "N2": [
      {
        "key": "very-high",
        "min": 20,
        "max": 32
      },
      {
        "key": "high",
        "min": 15,
        "max": 19
      },
      {
        "key": "average",
        "min": 10,
        "max": 14
      },
      {
        "key": "low",
        "min": 6,
        "max": 9
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 5
      }
    ],
    "N3": [
      {
        "key": "very-high",
        "min": 20,
        "max": 32
      },
      {
        "key": "high",
        "min": 15,
        "max": 19
      },
      {
        "key": "average",
        "min": 9,
        "max": 14
      },
      {
        "key": "low",
        "min": 4,
        "max": 8
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 3
      }
    ],
    "N4": [
      {
        "key": "very-high",
        "min": 21,
        "max": 32
      },
      {
        "key": "high",
        "min": 17,
        "max": 20
      },
      {
        "key": "average",
        "min": 12,
        "max": 16
      },
      {
        "key": "low",
        "min": 8,
        "max": 11
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 7
      }
    ],
    "N5": [
      {
        "key": "very-high",
        "min": 22,
        "max": 32
      },
      {
        "key": "high",
        "min": 18,
        "max": 21
      },
      {
        "key": "average",
        "min": 13,
        "max": 17
      },
      {
        "key": "low",
        "min": 9,
        "max": 12
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 8
      }
    ],
    "N6": [
      {
        "key": "very-high",
        "min": 15,
        "max": 32
      },
      {
        "key": "high",
        "min": 12,
        "max": 14
      },
      {
        "key": "average",
        "min": 8,
        "max": 11
      },
      {
        "key": "low",
        "min": 4,
        "max": 7
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 3
      }
    ],
    "E1": [
      {
        "key": "very-high",
        "min": 29,
        "max": 32
      },
      {
        "key": "high",
        "min": 25,
        "max": 28
      },
      {
        "key": "average",
        "min": 21,
        "max": 24
      },
      {
        "key": "low",
        "min": 17,
        "max": 20
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 16
      }
    ],
    "E2": [
      {
        "key": "very-high",
        "min": 24,
        "max": 32
      },
      {
        "key": "high",
        "min": 19,
        "max": 23
      },
      {
        "key": "average",
        "min": 14,
        "max": 18
      },
      {
        "key": "low",
        "min": 9,
        "max": 13
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 8
      }
    ],
    "E3": [
      {
        "key": "very-high",
        "min": 24,
        "max": 32
      },
      {
        "key": "high",
        "min": 19,
        "max": 23
      },
      {
        "key": "average",
        "min": 14,
        "max": 18
      },
      {
        "key": "low",
        "min": 10,
        "max": 13
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 9
      }
    ],
    "E4": [
      {
        "key": "very-high",
        "min": 24,
        "max": 32
      },
      {
        "key": "high",
        "min": 20,
        "max": 23
      },
      {
        "key": "average",
        "min": 15,
        "max": 19
      },
      {
        "key": "low",
        "min": 11,
        "max": 14
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 10
      }
    ],
    "E5": [
      {
        "key": "very-high",
        "min": 25,
        "max": 32
      },
      {
        "key": "high",
        "min": 20,
        "max": 24
      },
      {
        "key": "average",
        "min": 15,
        "max": 19
      },
      {
        "key": "low",
        "min": 10,
        "max": 14
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 9
      }
    ],
    "E6": [
      {
        "key": "very-high",
        "min": 27,
        "max": 32
      },
      {
        "key": "high",
        "min": 22,
        "max": 26
      },
      {
        "key": "average",
        "min": 18,
        "max": 21
      },
      {
        "key": "low",
        "min": 13,
        "max": 17
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 12
      }
    ],
    "O1": [
      {
        "key": "very-high",
        "min": 25,
        "max": 32
      },
      {
        "key": "high",
        "min": 20,
        "max": 24
      },
      {
        "key": "average",
        "min": 15,
        "max": 19
      },
      {
        "key": "low",
        "min": 10,
        "max": 14
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 9
      }
    ],
    "O2": [
      {
        "key": "very-high",
        "min": 26,
        "max": 32
      },
      {
        "key": "high",
        "min": 20,
        "max": 25
      },
      {
        "key": "average",
        "min": 14,
        "max": 19
      },
      {
        "key": "low",
        "min": 9,
        "max": 13
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 8
      }
    ],
    "O3": [
      {
        "key": "very-high",
        "min": 26,
        "max": 32
      },
      {
        "key": "high",
        "min": 22,
        "max": 25
      },
      {
        "key": "average",
        "min": 18,
        "max": 21
      },
      {
        "key": "low",
        "min": 14,
        "max": 17
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 13
      }
    ],
    "O4": [
      {
        "key": "very-high",
        "min": 22,
        "max": 32
      },
      {
        "key": "high",
        "min": 19,
        "max": 21
      },
      {
        "key": "average",
        "min": 15,
        "max": 18
      },
      {
        "key": "low",
        "min": 11,
        "max": 14
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 10
      }
    ],
    "O5": [
      {
        "key": "very-high",
        "min": 28,
        "max": 32
      },
      {
        "key": "high",
        "min": 23,
        "max": 27
      },
      {
        "key": "average",
        "min": 18,
        "max": 22
      },
      {
        "key": "low",
        "min": 13,
        "max": 17
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 12
      }
    ],
    "O6": [
      {
        "key": "very-high",
        "min": 28,
        "max": 32
      },
      {
        "key": "high",
        "min": 24,
        "max": 27
      },
      {
        "key": "average",
        "min": 19,
        "max": 23
      },
      {
        "key": "low",
        "min": 14,
        "max": 18
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 13
      }
    ],
    "A1": [
      {
        "key": "very-high",
        "min": 28,
        "max": 32
      },
      {
        "key": "high",
        "min": 24,
        "max": 27
      },
      {
        "key": "average",
        "min": 19,
        "max": 23
      },
      {
        "key": "low",
        "min": 15,
        "max": 18
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 14
      }
    ],
    "A2": [
      {
        "key": "very-high",
        "min": 27,
        "max": 32
      },
      {
        "key": "high",
        "min": 23,
        "max": 26
      },
      {
        "key": "average",
        "min": 18,
        "max": 22
      },
      {
        "key": "low",
        "min": 14,
        "max": 17
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 13
      }
    ],
    "A3": [
      {
        "key": "very-high",
        "min": 29,
        "max": 32
      },
      {
        "key": "high",
        "min": 25,
        "max": 28
      },
      {
        "key": "average",
        "min": 21,
        "max": 24
      },
      {
        "key": "low",
        "min": 18,
        "max": 20
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 17
      }
    ],
    "A4": [
      {
        "key": "very-high",
        "min": 24,
        "max": 32
      },
      {
        "key": "high",
        "min": 21,
        "max": 23
      },
      {
        "key": "average",
        "min": 17,
        "max": 20
      },
      {
        "key": "low",
        "min": 13,
        "max": 16
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 12
      }
    ],
    "A5": [
      {
        "key": "very-high",
        "min": 25,
        "max": 32
      },
      {
        "key": "high",
        "min": 21,
        "max": 24
      },
      {
        "key": "average",
        "min": 16,
        "max": 20
      },
      {
        "key": "low",
        "min": 12,
        "max": 15
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 11
      }
    ],
    "A6": [
      {
        "key": "very-high",
        "min": 26,
        "max": 32
      },
      {
        "key": "high",
        "min": 22,
        "max": 25
      },
      {
        "key": "average",
        "min": 18,
        "max": 21
      },
      {
        "key": "low",
        "min": 15,
        "max": 17
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 14
      }
    ],
    "C1": [
      {
        "key": "very-high",
        "min": 28,
        "max": 32
      },
      {
        "key": "high",
        "min": 25,
        "max": 27
      },
      {
        "key": "average",
        "min": 21,
        "max": 24
      },
      {
        "key": "low",
        "min": 18,
        "max": 20
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 17
      }
    ],
    "C2": [
      {
        "key": "very-high",
        "min": 26,
        "max": 32
      },
      {
        "key": "high",
        "min": 22,
        "max": 25
      },
      {
        "key": "average",
        "min": 17,
        "max": 21
      },
      {
        "key": "low",
        "min": 13,
        "max": 16
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 12
      }
    ],
    "C3": [
      {
        "key": "very-high",
        "min": 30,
        "max": 32
      },
      {
        "key": "high",
        "min": 26,
        "max": 29
      },
      {
        "key": "average",
        "min": 22,
        "max": 25
      },
      {
        "key": "low",
        "min": 18,
        "max": 21
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 17
      }
    ],
    "C4": [
      {
        "key": "very-high",
        "min": 26,
        "max": 32
      },
      {
        "key": "high",
        "min": 22,
        "max": 25
      },
      {
        "key": "average",
        "min": 18,
        "max": 21
      },
      {
        "key": "low",
        "min": 13,
        "max": 17
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 12
      }
    ],
    "C5": [
      {
        "key": "very-high",
        "min": 29,
        "max": 32
      },
      {
        "key": "high",
        "min": 25,
        "max": 28
      },
      {
        "key": "average",
        "min": 20,
        "max": 24
      },
      {
        "key": "low",
        "min": 16,
        "max": 19
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 15
      }
    ],
    "C6": [
      {
        "key": "very-high",
        "min": 24,
        "max": 32
      },
      {
        "key": "high",
        "min": 20,
        "max": 23
      },
      {
        "key": "average",
        "min": 16,
        "max": 19
      },
      {
        "key": "low",
        "min": 12,
        "max": 15
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 11
      }
    ]
  },
  "female": {
    "N": [
      {
        "key": "very-high",
        "min": 117,
        "max": 192
      },
      {
        "key": "high",
        "min": 96,
        "max": 116
      },
      {
        "key": "average",
        "min": 72,
        "max": 95
      },
      {
        "key": "low",
        "min": 50,
        "max": 71
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 49
      }
    ],
    "E": [
      {
        "key": "very-high",
        "min": 139,
        "max": 192
      },
      {
        "key": "high",
        "min": 121,
        "max": 138
      },
      {
        "key": "average",
        "min": 101,
        "max": 120
      },
      {
        "key": "low",
        "min": 82,
        "max": 100
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 81
      }
    ],
    "O": [
      {
        "key": "very-high",
        "min": 138,
        "max": 192
      },
      {
        "key": "high",
        "min": 121,
        "max": 137
      },
      {
        "key": "average",
        "min": 102,
        "max": 120
      },
      {
        "key": "low",
        "min": 85,
        "max": 101
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 84
      }
    ],
    "A": [
      {
        "key": "very-high",
        "min": 151,
        "max": 192
      },
      {
        "key": "high",
        "min": 137,
        "max": 150
      },
      {
        "key": "average",
        "min": 121,
        "max": 136
      },
      {
        "key": "low",
        "min": 107,
        "max": 120
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 106
      }
    ],
    "C": [
      {
        "key": "very-high",
        "min": 151,
        "max": 192
      },
      {
        "key": "high",
        "min": 133,
        "max": 150
      },
      {
        "key": "average",
        "min": 113,
        "max": 132
      },
      {
        "key": "low",
        "min": 96,
        "max": 112
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 95
      }
    ],
    "N1": [
      {
        "key": "very-high",
        "min": 24,
        "max": 32
      },
      {
        "key": "high",
        "min": 19,
        "max": 23
      },
      {
        "key": "average",
        "min": 13,
        "max": 18
      },
      {
        "key": "low",
        "min": 8,
        "max": 12
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 7
      }
    ],
    "N2": [
      {
        "key": "very-high",
        "min": 21,
        "max": 32
      },
      {
        "key": "high",
        "min": 16,
        "max": 20
      },
      {
        "key": "average",
        "min": 10,
        "max": 15
      },
      {
        "key": "low",
        "min": 6,
        "max": 9
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 5
      }
    ],
    "N3": [
      {
        "key": "very-high",
        "min": 22,
        "max": 32
      },
      {
        "key": "high",
        "min": 16,
        "max": 21
      },
      {
        "key": "average",
        "min": 10,
        "max": 15
      },
      {
        "key": "low",
        "min": 5,
        "max": 9
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 4
      }
    ],
    "N4": [
      {
        "key": "very-high",
        "min": 22,
        "max": 32
      },
      {
        "key": "high",
        "min": 18,
        "max": 21
      },
      {
        "key": "average",
        "min": 13,
        "max": 17
      },
      {
        "key": "low",
        "min": 9,
        "max": 12
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 8
      }
    ],
    "N5": [
      {
        "key": "very-high",
        "min": 24,
        "max": 32
      },
      {
        "key": "high",
        "min": 19,
        "max": 23
      },
      {
        "key": "average",
        "min": 14,
        "max": 18
      },
      {
        "key": "low",
        "min": 10,
        "max": 13
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 9
      }
    ],
    "N6": [
      {
        "key": "very-high",
        "min": 18,
        "max": 32
      },
      {
        "key": "high",
        "min": 14,
        "max": 17
      },
      {
        "key": "average",
        "min": 9,
        "max": 13
      },
      {
        "key": "low",
        "min": 5,
        "max": 8
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 4
      }
    ],
    "E1": [
      {
        "key": "very-high",
        "min": 30,
        "max": 32
      },
      {
        "key": "high",
        "min": 26,
        "max": 29
      },
      {
        "key": "average",
        "min": 22,
        "max": 25
      },
      {
        "key": "low",
        "min": 18,
        "max": 21
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 17
      }
    ],
    "E2": [
      {
        "key": "very-high",
        "min": 25,
        "max": 32
      },
      {
        "key": "high",
        "min": 20,
        "max": 24
      },
      {
        "key": "average",
        "min": 15,
        "max": 19
      },
      {
        "key": "low",
        "min": 10,
        "max": 14
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 9
      }
    ],
    "E3": [
      {
        "key": "very-high",
        "min": 23,
        "max": 32
      },
      {
        "key": "high",
        "min": 19,
        "max": 22
      },
      {
        "key": "average",
        "min": 13,
        "max": 18
      },
      {
        "key": "low",
        "min": 8,
        "max": 12
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 7
      }
    ],
    "E4": [
      {
        "key": "very-high",
        "min": 25,
        "max": 32
      },
      {
        "key": "high",
        "min": 21,
        "max": 24
      },
      {
        "key": "average",
        "min": 16,
        "max": 20
      },
      {
        "key": "low",
        "min": 11,
        "max": 15
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 10
      }
    ],
    "E5": [
      {
        "key": "very-high",
        "min": 24,
        "max": 32
      },
      {
        "key": "high",
        "min": 19,
        "max": 23
      },
      {
        "key": "average",
        "min": 13,
        "max": 18
      },
      {
        "key": "low",
        "min": 8,
        "max": 12
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 7
      }
    ],
    "E6": [
      {
        "key": "very-high",
        "min": 28,
        "max": 32
      },
      {
        "key": "high",
        "min": 24,
        "max": 27
      },
      {
        "key": "average",
        "min": 19,
        "max": 23
      },
      {
        "key": "low",
        "min": 14,
        "max": 18
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 13
      }
    ],
    "O1": [
      {
        "key": "very-high",
        "min": 24,
        "max": 32
      },
      {
        "key": "high",
        "min": 19,
        "max": 23
      },
      {
        "key": "average",
        "min": 14,
        "max": 18
      },
      {
        "key": "low",
        "min": 9,
        "max": 13
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 8
      }
    ],
    "O2": [
      {
        "key": "very-high",
        "min": 27,
        "max": 32
      },
      {
        "key": "high",
        "min": 22,
        "max": 26
      },
      {
        "key": "average",
        "min": 16,
        "max": 21
      },
      {
        "key": "low",
        "min": 11,
        "max": 15
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 10
      }
    ],
    "O3": [
      {
        "key": "very-high",
        "min": 28,
        "max": 32
      },
      {
        "key": "high",
        "min": 24,
        "max": 27
      },
      {
        "key": "average",
        "min": 19,
        "max": 23
      },
      {
        "key": "low",
        "min": 15,
        "max": 18
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 14
      }
    ],
    "O4": [
      {
        "key": "very-high",
        "min": 23,
        "max": 32
      },
      {
        "key": "high",
        "min": 19,
        "max": 22
      },
      {
        "key": "average",
        "min": 15,
        "max": 18
      },
      {
        "key": "low",
        "min": 12,
        "max": 14
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 11
      }
    ],
    "O5": [
      {
        "key": "very-high",
        "min": 26,
        "max": 32
      },
      {
        "key": "high",
        "min": 21,
        "max": 25
      },
      {
        "key": "average",
        "min": 16,
        "max": 20
      },
      {
        "key": "low",
        "min": 11,
        "max": 15
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 10
      }
    ],
    "O6": [
      {
        "key": "very-high",
        "min": 27,
        "max": 32
      },
      {
        "key": "high",
        "min": 23,
        "max": 26
      },
      {
        "key": "average",
        "min": 19,
        "max": 22
      },
      {
        "key": "low",
        "min": 15,
        "max": 18
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 14
      }
    ],
    "A1": [
      {
        "key": "very-high",
        "min": 28,
        "max": 32
      },
      {
        "key": "high",
        "min": 24,
        "max": 27
      },
      {
        "key": "average",
        "min": 20,
        "max": 23
      },
      {
        "key": "low",
        "min": 16,
        "max": 19
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 15
      }
    ],
    "A2": [
      {
        "key": "very-high",
        "min": 29,
        "max": 32
      },
      {
        "key": "high",
        "min": 25,
        "max": 28
      },
      {
        "key": "average",
        "min": 20,
        "max": 24
      },
      {
        "key": "low",
        "min": 16,
        "max": 19
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 15
      }
    ],
    "A3": [
      {
        "key": "very-high",
        "min": 30,
        "max": 32
      },
      {
        "key": "high",
        "min": 27,
        "max": 29
      },
      {
        "key": "average",
        "min": 23,
        "max": 26
      },
      {
        "key": "low",
        "min": 20,
        "max": 22
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 19
      }
    ],
    "A4": [
      {
        "key": "very-high",
        "min": 26,
        "max": 32
      },
      {
        "key": "high",
        "min": 22,
        "max": 25
      },
      {
        "key": "average",
        "min": 18,
        "max": 21
      },
      {
        "key": "low",
        "min": 14,
        "max": 17
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 13
      }
    ],
    "A5": [
      {
        "key": "very-high",
        "min": 26,
        "max": 32
      },
      {
        "key": "high",
        "min": 22,
        "max": 25
      },
      {
        "key": "average",
        "min": 18,
        "max": 21
      },
      {
        "key": "low",
        "min": 14,
        "max": 17
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 13
      }
    ],
    "A6": [
      {
        "key": "very-high",
        "min": 26,
        "max": 32
      },
      {
        "key": "high",
        "min": 23,
        "max": 25
      },
      {
        "key": "average",
        "min": 20,
        "max": 22
      },
      {
        "key": "low",
        "min": 17,
        "max": 19
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 16
      }
    ],
    "C1": [
      {
        "key": "very-high",
        "min": 28,
        "max": 32
      },
      {
        "key": "high",
        "min": 24,
        "max": 27
      },
      {
        "key": "average",
        "min": 20,
        "max": 23
      },
      {
        "key": "low",
        "min": 17,
        "max": 19
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 16
      }
    ],
    "C2": [
      {
        "key": "very-high",
        "min": 26,
        "max": 32
      },
      {
        "key": "high",
        "min": 22,
        "max": 25
      },
      {
        "key": "average",
        "min": 17,
        "max": 21
      },
      {
        "key": "low",
        "min": 13,
        "max": 16
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 12
      }
    ],
    "C3": [
      {
        "key": "very-high",
        "min": 30,
        "max": 32
      },
      {
        "key": "high",
        "min": 26,
        "max": 29
      },
      {
        "key": "average",
        "min": 22,
        "max": 25
      },
      {
        "key": "low",
        "min": 18,
        "max": 21
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 17
      }
    ],
    "C4": [
      {
        "key": "very-high",
        "min": 26,
        "max": 32
      },
      {
        "key": "high",
        "min": 22,
        "max": 25
      },
      {
        "key": "average",
        "min": 18,
        "max": 21
      },
      {
        "key": "low",
        "min": 14,
        "max": 17
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 13
      }
    ],
    "C5": [
      {
        "key": "very-high",
        "min": 29,
        "max": 32
      },
      {
        "key": "high",
        "min": 25,
        "max": 28
      },
      {
        "key": "average",
        "min": 20,
        "max": 24
      },
      {
        "key": "low",
        "min": 15,
        "max": 19
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 14
      }
    ],
    "C6": [
      {
        "key": "very-high",
        "min": 24,
        "max": 32
      },
      {
        "key": "high",
        "min": 20,
        "max": 23
      },
      {
        "key": "average",
        "min": 15,
        "max": 19
      },
      {
        "key": "low",
        "min": 11,
        "max": 14
      },
      {
        "key": "very-low",
        "min": 0,
        "max": 10
      }
    ]
  }
};
 const labels = {"very-low":"非常低",low:"低",average:"平均",high:"高","very-high":"非常高"};
 const levels = {"very-low":1,low:2,average:3,high:4,"very-high":5};
 window.NEO_NORMS = Object.freeze({version:"markdown-bands-2026-10-02", ranges,
 classify(sex, scale, raw) {
  const rows = ranges[sex] && ranges[sex][scale];
  if (!rows || !Number.isInteger(raw)) return null;
  const row = rows.find(r => raw >= r.min && raw <= r.max);
  return row ? {band:labels[row.key], bandKey:row.key, level:levels[row.key]} : null;
 }
 });
})();
