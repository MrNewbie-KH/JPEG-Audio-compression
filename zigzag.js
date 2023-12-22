// Function to perform zigzag scanning on a 2D array
function zigzagScan(window) {
  const rows = window.length;
  const cols = window[0].length;
  const result = new Array(rows * cols);
  let row = 0;
  let col = 0;
  let index = 0;
  let direction = "up";

  while (index < rows * cols) {
    result[index++] = window[row][col];

    if (direction === "up") {
      if (col === cols - 1) {
        row++;
        direction = "down";
      } else if (row === 0) {
        col++;
        direction = "down";
      } else {
        row--;
        col++;
      }
    } else {
      if (row === rows - 1) {
        col++;
        direction = "up";
      } else if (col === 0) {
        row++;
        direction = "up";
      } else {
        row++;
        col--;
      }
    }
  }

  return result;
}
function inverseZigzag(zigzagArray) {
  const result = Array(8)
    .fill()
    .map(() => Array(8).fill(0));
    const zigzagIndexMap = {
      "00": 0, "01": 1, "10": 2, "20": 3, "11": 4, "02": 5, "03": 6, "12": 7,
      "21": 8, "30": 9,
     "40": 10,
      "31": 11,
       "22": 12,
        "13": 13,
         "04": 14,
          "05": 15,
      "14": 16, "23": 17, "32": 18, "41": 19, "50": 20,
       "60": 21, "51": 22, "42": 23,
      "33": 24, "24": 25, "15": 26, "06": 27, "07": 28,
       "16": 29, "25": 30, "34": 31,
      "43": 32, "52": 33,
      "61": 34, "70": 35,
       "71": 36, "62": 37, "53": 38, "44": 39,
      "35": 40, "26": 41,
       "17": 42, "27": 43, "36": 44, "45": 45, "54": 46,
        "63": 47,
      "72": 48,
       "73": 49,
        "64": 50, "55": 51, "46": 52, "37": 53, "47": 54,
         "56": 55,
      "65": 56, "74": 57,
       "75": 58, "66": 59, "57": 60, "67": 61, "76": 62, "77": 63
    };
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      result[i][j] = zigzagArray[zigzagIndexMap[`${i}${j}`]];
    }
  }
  return result;
}
const zigzagLooping = function (arr) {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      newArray.push(zigzagScan(arr[i][j]));
    }
  }
  return newArray;
};
const inverseZigzagLooping = function (arr) {
  const newArray = [];
  let tuple = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 64 === 0 && i !== 0) {
      newArray.push(tuple);
      tuple = [];
    }
    tuple.push(inverseZigzag(arr[i]));
    if (i === 0) console.log(inverseZigzag(arr[i]));
  }
  // // new array is array of places each is array of arrays  [  [  [],[],[]  ] ,[] ]
  // const finalArray = [];
  // let tempArray = [];
  // for (let i = 0; i < newArray.length; i++) {
  //   if (tempArray.length % 64 === 0 && i !== 0) {
  //     finalArray.push(tempArray);
  //     tempArray = [];
  //   }
  //   tempArray.push(newArray[i]);
  // }
  // return finalArray;
  return newArray;
};

module.exports = {
  zigzagScan,
  zigzagLooping,
  inverseZigzag,
  inverseZigzagLooping,
};
