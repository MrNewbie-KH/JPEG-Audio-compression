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
const combineChannels = function(ch1,ch2){
  ch1=ch1.flat(Infinity);
  ch2=ch2.flat(Infinity);
  const combined = [];
  for(let i=0;i<ch1.length;i++)
  {
    combined.push(ch1[i])
    combined.push(ch2[i])
  }
  return combined;
}
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

function writeWavFileAsync(combined, filePath) {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(combined);
    const writer = new wav.Writer({
      channels: 2,
      sampleRate: 48000,
      bitDepth: 16,
      floatingPoint: false,
    });

    const outputStream = fs.createWriteStream(filePath);
    outputStream.on('finish', () => {
      resolve();
    });
    outputStream.on('error', (err) => {
      reject(err);
    });

    writer.pipe(outputStream);
    writer.end(buffer);
  });
}


module.exports = { readAudioFile, runLengthIntoBinary,combineChannels,writeWavFileAsync };
