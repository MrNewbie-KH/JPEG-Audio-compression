const fs = require("fs");
// create two d zeros array
function create2DArrayZero(width, height) {
  let arr = new Array(height);
  for (let i = 0; i < height; i++) {
    arr[i] = new Array(width).fill(0); 
  }
  return arr;
}
// create 2D array
const matrixConverter = function (arr) {
  let leng = arr.length;
  let h,w ;
  for(let i=Math.floor(Math.sqrt(leng));i>0;i--)
  {
    if(leng % i === 0 ){
      w = i ;
      h = leng/i;
      break;
    }
  }
  let heightAfterPadding = Math.round((h/8))*8 
  let widthAfterPadding=Math.round((w/8))*8 ;
  let zerosArray = create2DArrayZero(widthAfterPadding,heightAfterPadding);
  
 let ctr = 0;
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      zerosArray[i][j]=arr[ctr];
      ctr++;
    }
  }
  return {zerosArray,h,w};
};
const combineChannels = function(ch1,ch2){
  const combined = [];
  for(let i=0;i<ch1.length;i++)
  {
    combined.push(ch1[i])
    combined.push(ch2[i])
  }
  return combined;
}

// converting to run length encoding
const runLengthIntoBinary = function (array, fileName) {
  const bufferData = Buffer.from(array);

  fs.writeFile(fileName, bufferData, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File written successfully");
    }
  });
};



module.exports = { matrixConverter, runLengthIntoBinary,combineChannels };
