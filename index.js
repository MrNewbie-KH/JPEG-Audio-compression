const { log } = require("mathjs");
const { readAudioFile } = require("./convertAudio.js");
const { dct2d } = require("./DCT.js");
// create quantization table
const createQuantizationTable = function () {
  const arr = [];
  for (let i = 0; i < 8; i++) {
    const innerArray = [];
    for (let j = 0; j < 8; j++) {
      innerArray.push(1 + (1 + i + j) * 9);
    }
    arr.push(innerArray);
  }
  return arr;
};
// new coeff numbers after quantization
const coeffAfterQuantization = function (table, coeff) {
  const arr = [];
  for (let u = 0; u < 296; u++) {
    const block = [];
    for (let v = 0; v < 296; v++) {
      const column = [];
      for (let i = u; i < u + 8; i++) {
        let row = [];
        for (let j = v; j < v + 8; j++) {
          const equal = Math.floor(coeff[i][j] / table[i % 8][j % 8]);
          row.push(equal); //1
        }
        column.push(row); //8
      }
      block.push(column); //64
    }
    arr.push(block);
  }
  // console.log(arr.length); //296
  // console.log(arr[0].length); //296
  // console.log(arr[295][296]); //64
  return arr;
};
const processAudioFile = async () => {
  const { channelOne2D, channelTwo2D } = await readAudioFile();
  const coeffChannel1 = dct2d(channelOne2D);
  const coeffChannel2 = dct2d(channelTwo2D);
  const quantization = createQuantizationTable();
  const quantizedChannel1 = coeffAfterQuantization(quantization, coeffChannel1);
  const quantizedChannel2 = coeffAfterQuantization(quantization, coeffChannel2);
};
processAudioFile(); // call player
