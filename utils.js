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
const coeffAfterQuantization = function (table, coeff,operation) {
  const arr = [];
  for (let u = 0; u < 296; u++) {
    const block = [];
    for (let v = 0; v < 296; v++) {
      const column = [];
      for (let i = u; i < u + 8; i++) {
        let row = [];
        for (let j = v; j < v + 8; j++) {
          let equal;
          if(operation==="/" )
            equal = Math.floor(coeff[i][j] / table[i % 8][j % 8]) ;
          else
            equal = Math.floor(coeff[i][j] * table[i % 8][j % 8]) ;
          
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
      str += `${element}.${ctr},`;
    }
    str += ";";
    finalString.push(str);
  }

  return finalString;
};
const runLengthDecoding = function (array) {
  const answerArray = [];
  const decodedArray = array.map((tuple) => tuple.split(","));
  for (let i = 0; i < decodedArray.length; i++) {
    const arrayToBeZigzaged = [];
    for (let j = 0; j < decodedArray[i].length; j++) {
      const ele = decodedArray[i][j];
      let [val, repeat] = ele.split(".");
      if (j === decodedArray[i].length - 1) {
        repeat = parseInt(repeat);
      }
      while (repeat > 0) {
        arrayToBeZigzaged.push(+val);
        repeat--;
      }
    }
    answerArray.push(arrayToBeZigzaged);
  }

  return answerArray;
};
const prepareArray = function(arr){

    const result = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        for (let k = 0; k < arr[i][j].length; k++) {
          for (let l = 0; l < arr[i][j][k].length; l++) {
            result.push(arr[i][j][k][l]);
          }
        }
      }
    }
    const limit = Math.floor(Math.sqrt(result.length));
    const finalArr =[];
    let temp =[];
    for (let i = 0; i < result.length; i++) {
        if(i%limit===0&&i!==0)
        {
          finalArr.push(temp)
          temp=[];
        }
        temp.push(result[i])
    }
    return finalArr;
}

module.exports = {
  createQuantizationTable,
  coeffAfterQuantization,
  runLengthEncoding,
  runLengthDecoding,
  prepareArray
};
