function dctBlock (block) {
  const output =[]
  for (let u = 0; u < 8; u++) {
    const row = [];
    for (let v = 0; v < 8; v++) {
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          sum +=
            block[i][j] *
            Math.cos(((2 * i + 1) * u * Math.PI) / (2 * 8)) *
            Math.cos(((2 * j + 1) * v * Math.PI) / (2 * 8));
        }
      }
      row.push(sum);
    }

    output.push(row);
  }
  return output;
}
function inverseDctBlock(block){
  const output =[]
  for (let u = 0; u < 8; u++) {
    const row = [];
    for (let v = 0; v < 8; v++) {
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          sum +=
            block[i][j] *
            Math.cos(((2 * i + 1) * u * Math.PI) / (2 * 8)) *
            Math.cos(((2 * j + 1) * v * Math.PI) / (2 * 8));
        }
      }
      sum *= ((u === 0 ? Math.sqrt(1 / 8) : Math.sqrt(2 / 8)) * (v === 0 ? Math.sqrt(1 / 8) : Math.sqrt(2 / 8)));
      sum*=0.25
      row.push(sum);
    }
    output.push(row);
  }
  return output
}
function dct2d(input) {
  // thsi array of size 8 * n
  // the loop will be done for multi times
  const M = input.length;
  const N = input[0].length;
  const output = Array(M);
  for(let i=0;i<M;i++){
    output[i]=Array(N)
  }
  //  this do the calculation for 8 * 8 only
  for(let i=0;i<M;i+=8){
    for(let j=0;j<N;j+=8){
      const arrToSend =[]
      for(let ii =0;ii<8;ii++){
        const row = []
      for(let jj =0;jj<8;jj++){
        row.push(input[ii+i][jj+j]);
      }
      arrToSend.push(row)
      }
      const afterDCT = dctBlock(arrToSend) // DCT is done here
      for(let ii =0;ii<8;ii++){
      for(let jj =0;jj<8;jj++){
        output[ii+i][jj+j]=afterDCT[ii][jj];
      }

      }
    }
  }
  return output;
}
function idct2d(input) {
  const M = input.length;
  const N = input[0].length;
  const output = Array(M);
  for(let i=0;i<M;i++){
    output[i]=Array(N)
  }
    //  this do the calculation for 8 * 8 only
    for(let i=0;i<M;i+=8){
      for(let j=0;j<N;j+=8){
        const arrToSend =[]
        for(let ii =0;ii<8;ii++){
          const row = []
        for(let jj =0;jj<8;jj++){
          row.push(input[ii+i][jj+j]);
        }
        arrToSend.push(row)
        }
        const afterInverseDCT = inverseDctBlock(arrToSend) // DCT is done here
        for(let ii =0;ii<8;ii++){
        for(let jj =0;jj<8;jj++){
          output[ii+i][jj+j]=afterInverseDCT[ii][jj];
        }
        }
      }
    }
  return output;
}


module.exports = { dct2d ,idct2d};
