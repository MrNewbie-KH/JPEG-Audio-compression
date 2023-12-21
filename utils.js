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
// create of run length encoding on zigzag
const runLengthEncoding = function (array) {
  const finalString = [];
  let element = -5000;
  for (let i = 0; i < array.length; i++) {
    ctr = 1;
    let str = [];
    for (let j = 0; j < 64; j++) {
      if (array[i][j] === element) {
        element = array[i][j];
        ctr++;
      } else {
        str.push(`${array[i][j]}.${ctr}`);
        element = array[i][j];
        ctr = 1;
      }
    }
    if (ctr !== 1) {
      str += `${element}.${ctr}`;
    }
    finalString.push(str);
  }

  return finalString;
};

module.exports = {
  createQuantizationTable,
  coeffAfterQuantization,
  runLengthEncoding,
};
