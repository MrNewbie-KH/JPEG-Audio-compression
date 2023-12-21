const { readAudioFile, runLengthIntoBinary } = require("./convertAudio.js");
const { dct2d } = require("./DCT.js");
const {
  createQuantizationTable,
  coeffAfterQuantization,
  runLengthEncoding,
} = require("./utils.js");
const { zigzagLooping } = require("./zigzag.js");
const processAudioFile = async () => {
  const { channelOne2D, channelTwo2D } = await readAudioFile();
  const coeffChannel1 = dct2d(channelOne2D);
  const coeffChannel2 = dct2d(channelTwo2D);
  const quantization = createQuantizationTable();
  const quantizedChannel1 = coeffAfterQuantization(quantization, coeffChannel1);
  const quantizedChannel2 = coeffAfterQuantization(quantization, coeffChannel2);
  const arrayOfZigzag1 = zigzagLooping(quantizedChannel1);
  const arrayOfZigzag2 = zigzagLooping(quantizedChannel2);
  const runLengthChannel1 = runLengthEncoding(arrayOfZigzag1);
  const runLengthChannel2 = runLengthEncoding(arrayOfZigzag2);
  runLengthIntoBinary(runLengthChannel1, "binary channel1.bin");
  runLengthIntoBinary(runLengthChannel2, "binary channel2.bin");
};
processAudioFile(); // call player
