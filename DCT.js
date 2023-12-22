function dct2d(input) {
  const M = input.length;
  const N = input[0].length;
  const output = [];

  for (let u = 0; u < M; u++) {
    const row = [];
    for (let v = 0; v < N; v++) {
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          sum +=
            input[i][j] *
            Math.cos(((2 * i + 1) * u * Math.PI) / (2 * M)) *
            Math.cos(((2 * j + 1) * v * Math.PI) / (2 * N));
        }
      }
      row.push(sum);
    }
    output.push(row);
  }

  return output;
}
function idct2d(input) {
  const M = input.length;
  const N = input[0].length;
  const output = [];

  for (let u = 0; u < M; u++) {
    const row = [];
    for (let v = 0; v < N; v++) {
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          sum +=
            input[i][j] *
            Math.cos(((2 * i + 1) * u * Math.PI) / (2 * M)) *
            Math.cos(((2 * j + 1) * v * Math.PI) / (2 * N));
        }
      }
      sum *= ((u === 0 ? Math.sqrt(1 / M) : Math.sqrt(2 / M)) * (v === 0 ? Math.sqrt(1 / N) : Math.sqrt(2 / N)));
      sum = Math.floor(sum)
      sum+=50
      row.push(sum);
    }
    output.push(row);
  }

  return output;
}


module.exports = { dct2d ,idct2d};
