const fs = require("fs");
const wav = require("wav");
const filePath = "before.wav";
const outputFile = "output.bin";
const reader = new wav.Reader();

// paddzeros to the arrayand apply shifting
const paddZeros = function (array) {
  const toAdd = Math.floor(Math.sqrt(array.length)) + 8;
  while (array.length < toAdd * toAdd) {
    array.push(0);
  }
  for (let i = 0; i < array.length; i++) array[i] -= 128;
  return array;
};
// create 2D array
const matrixConverter = function (width, height, arr) {
  const matrix = [];
  for (let i = 0; i < width; i++) {
    const innerArray = [];
    for (let j = 0; j < height; j++) {
      innerArray.push(arr[i * width + j]);
    }
    matrix.push(innerArray);
  }
  return matrix;
};
// split into two 2d channels
const splitChannels = function (arr) {
  const channels = 2;
  const samplesPerChannel = arr.length / 2;
  const leftChannel = new Array(samplesPerChannel); // channel 0
  const rightChannel = new Array(samplesPerChannel); // channel 1
  for (let i = 0; i < samplesPerChannel; i++) {
    const leftIndex = i * channels;
    const rightIndex = leftIndex + 1;
    leftChannel[i] = arr[leftIndex];
    rightChannel[i] = arr[rightIndex];
  }
  return { leftChannel, rightChannel };
};
// Read audio file
const readAudioFile = async function () {
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(outputFile);

    reader.on("format", (format) => {
      console.log("WAV format:", format);
    });

    reader.on("data", (data) => {
      writer.write(data);
    });

    reader.on("end", () => {
      writer.end();

      // Read the binary file
      fs.readFile(outputFile, (err, data) => {
        if (err) {
          console.error("Error reading the binary file:", err);
          reject(err);
          return;
        }
        // Split channels
        const { leftChannel, rightChannel } = splitChannels(Array.from(data));

        // Pad and convert to 2D arrays
        const channelOne2D = matrixConverter(
          2368,
          2368,
          paddZeros(leftChannel)
        );
        const channelTwo2D = matrixConverter(
          2368,
          2368,
          paddZeros(rightChannel)
        );

        // Resolve with the 2D arrays
        resolve({ channelOne2D, channelTwo2D });
      });
    });

    // Pipe the file stream to the wav reader
    fs.createReadStream(filePath).pipe(reader);
  });
};
module.exports = { readAudioFile };