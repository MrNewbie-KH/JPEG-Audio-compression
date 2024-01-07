// create quantization table
const createQuantizationTable = function () {
  const arr = [
    [16, 11, 10, 16, 24, 40, 51, 61],
    [12, 12, 14, 19, 26, 58, 60, 55],
    [14, 13, 16, 24, 40, 57, 69, 56],
    [14, 17, 22, 29, 51, 87, 80, 62],
    [18, 22, 37, 56, 68, 109, 103, 77],
    [24, 35, 55, 64, 81, 104, 113, 92],
    [49, 64, 78, 87, 103, 121, 120, 101],
    [72, 92, 95, 98, 112,100,103,99]
]
  return arr;
};
// new coeff numbers after quantization
const coeffAfterQuantization = function (table, coeff,operation) {
  const width=coeff[0].length;
  const height=coeff.length;
  let arr = new Array(width);
  for (let i = 0; i < height; i++) {
    arr[i] = new Array(width).fill(0); 
  }
  for (let u = 0; u < width; u+=8) {
    for (let v = 0; v < height; v+=8) {
      for (let i = 0; i <  8; i++) {
        for (let j = 0; j < 8; j++) {
          if (u + i < coeff.length && v + j < coeff[0].length && i < table.length && j < table[0].length) {
          let equal;
          if(operation==="/" )
            equal = Math.floor(coeff[i+u][j+v] / table[i][j]) ;
          else
            equal = Math.floor(coeff[i+u][j+v] * table[i][j]) ;
          arr[i+u][j+v]=equal;
        }
      }
      }
    }
  }
  return arr;
};
// create of run length encoding on zigzag
const runLengthEncoding = function (array) {
  // array here is an array of arrays
  const finalString = [];
  for (let i = 0; i < array.length; i++) {
    let element = array[i][0];
    let ctr = 1; 
    let str = "";

    for (let j = 1; j < array[i].length; j++) {
      if (array[i][j] === element) {
        ctr++;
      } else {
        str += `${element}.${ctr},`;
        element = array[i][j];
        ctr = 1;
      }
    }
    str += `${element}.${ctr},`;
    str += ";";
    finalString.push(str);
  }
  return finalString;
};

const runLengthDecoding = function (array) {
  // array here is array of strings
  const answerArray = [];
  for (let i = 0; i < array.length; i++) {
    const arrayToBeZigzaged = [];
    const decodedArray = array[i].split(",");
    for (let j = 0; j < decodedArray.length-1; j++) {
      const ele=decodedArray[j].split(".");
      ele[0]=Number(ele[0]);
      ele[1]=Number(ele[1]);
      while(ele[1]>0){
        arrayToBeZigzaged.push(ele[0])
        ele[1]--;
      }
    }
    answerArray.push(arrayToBeZigzaged);
  }
  return answerArray;
};

const clipper = function (arr,height,width){
  let newArr = [];
  for(let i=0;i<width;i++){
  for(let j=0;j<height;j++)
  {
    newArr.push(arr[i][j]);
  }
}
  return newArr;
}

module.exports = {
  createQuantizationTable,
  coeffAfterQuantization,
  runLengthEncoding,
  runLengthDecoding,
  clipper
};
