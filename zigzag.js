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
const zigzagLooping = function (arr) {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      newArray.push(zigzagScan(arr[i][j]));
    }
  }
  return newArray;
};
module.exports = { zigzagScan, zigzagLooping };
// Rest of your code remains unchanged
