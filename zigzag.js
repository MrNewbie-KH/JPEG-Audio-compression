// Function to perform zigzag scanning on a 2D array
function zigzagScan(window) {
  const zigzag = {
    0: "00", 1: "01", 2: "10", 3: "20", 4: "11", 5: "02", 6: "03", 7: "12",
    8: "21", 9: "30", 10: "40", 11: "31", 12: "22", 13: "13", 14: "04", 15: "05",
    16: "14", 17: "23", 18: "32", 19: "41", 20: "50", 21: "60", 22: "51", 23: "42",
    24: "33", 25: "24", 26: "15", 27: "06", 28: "07", 29: "16", 30: "25", 31: "34",
    32: "43", 33: "52", 34: "61", 35: "70", 36: "71", 37: "62", 38: "53", 39: "44",
    40: "35", 41: "26", 42: "17", 43: "27", 44: "36", 45: "45", 46: "54", 47: "63",
    48: "72", 49: "73", 50: "64", 51: "55", 52: "46", 53: "37", 54: "47", 55: "56",
    56: "65", 57: "74", 58: "75", 59: "66", 60: "57", 61: "67", 62: "76", 63: "77"
  };
  let result =Array(64).fill(0)
  let index =0;
  for(let i=0;i<window.length;i++){
  for(let j=0;j<window.length;j++){
    result[index]=window[zigzag[index][0]][zigzag[index][1]]
    index++;
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
  const width= arr.length
  const height= arr[0].length
  const newArray = [];
  for (let i = 0; i < width; i+=8) {
    for (let j = 0; j < height; j+=8) {
      const block = new Array(8).fill(0).map(() => new Array(8).fill(0));
      for(let ii=0;ii<8;ii++)
      {
        for(let jj=0;jj<8;jj++){
          block[ii][jj]=arr[i+ii][j+jj];
        }
      }
      newArray.push(zigzagScan(block));
    }
  }

  return newArray;
};
const inverseZigzagLooping = function (arr,w,h) {  
  const newArray = Array(w);
  for(let i=0;i<newArray.length;i++){
    newArray[i]=Array(h).fill(0);
  }
  let ctr =0;
  for(let i=0;i<w;i+=8){
    for(let j=0;j<h;j+=8){
      const toInverse = inverseZigzag(arr[ctr]);
      ctr++;
      for(let ii =0;ii<8;ii++){
        for(let jj=0;jj<8;jj++){
          newArray[ii+i][jj+j]=toInverse[ii][jj];
        }
      }
    }
  }
  return newArray;
};

module.exports = {
  zigzagScan,
  zigzagLooping,
  inverseZigzag,
  inverseZigzagLooping,
};
