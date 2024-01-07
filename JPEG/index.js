const fs = require("fs");
const wavefile = require('wavefile');
const { runLengthIntoBinary,combineChannels,matrixConverter } = require("./convertAudio.js");
const { dct2d ,idct2d} = require("./DCT.js");
const {
  createQuantizationTable,
  coeffAfterQuantization,
  runLengthEncoding,
  runLengthDecoding,
  clipper
} = require("./utils.js");
const { zigzagLooping, inverseZigzagLooping } = require("./zigzag.js");
// =====================================================================
// code starting
const processAudioFile = async () => {
  // Read the input WAV file
const inputBuffer = fs.readFileSync('input_mono.wav');

const inputWave = new wavefile.WaveFile(inputBuffer);
const {sampleRate,numChannels,bitsPerSample}=inputWave.fmt;
let fSociety=[]
if(numChannels===2){
const twoChannels = inputWave.getSamples(false);
const channel1Simple = []
const channel2Simple = []
for(let i=0;i<twoChannels[0].length;i++){
  channel1Simple.push(twoChannels[0][i]);
  channel2Simple.push(twoChannels[1][i]);  
}
const {zerosArray:channelOne2D,h:ch1H,w:ch1W}=matrixConverter(channel1Simple)
const {zerosArray:channelTwo2D,h:ch2H,w:ch2W}=matrixConverter(channel2Simple)
const coeffChannel1 = dct2d(channelOne2D);
const coeffChannel2 = dct2d(channelTwo2D);
const quantization = createQuantizationTable();
const quantizedChannel1 = coeffAfterQuantization(quantization, coeffChannel1,"/");
const quantizedChannel2 = coeffAfterQuantization(quantization, coeffChannel2,"/");
const arrayOfZigzag1 = zigzagLooping(quantizedChannel1);
const arrayOfZigzag2 = zigzagLooping(quantizedChannel2);
const runLengthChannel1 = runLengthEncoding(arrayOfZigzag1);
const runLengthChannel2 = runLengthEncoding(arrayOfZigzag2);
runLengthIntoBinary(runLengthChannel1, "binary channel1.bin");
runLengthIntoBinary(runLengthChannel2, "binary channel2.bin");
// Until here encoding done
// Start decoding to go back to
const channel1FromRLEToInverseZigzag = runLengthDecoding(runLengthChannel1);
const channel2FromRLEToInverseZigzag = runLengthDecoding(runLengthChannel2);
const channel1FromInverseZizagToInvereQ = inverseZigzagLooping(
  channel1FromRLEToInverseZigzag,quantizedChannel1.length,quantizedChannel1[0].length
  );
const channel2FromInverseZizagToInvereQ = inverseZigzagLooping(
  channel2FromRLEToInverseZigzag,quantizedChannel1.length,quantizedChannel1[0].length
  );
  const coeff1=coeffAfterQuantization(quantization,channel1FromInverseZizagToInvereQ,"*")
  const coeff2=coeffAfterQuantization(quantization,channel2FromInverseZizagToInvereQ,"*")
  const channel1=idct2d(coeff1)
  const channel2=idct2d(coeff2)
  const final1 = clipper(channel1,ch1H,ch1W)
  const final2 = clipper(channel2,ch2H,ch2W)
  fSociety=combineChannels(final1,final2)
}
else{
  const twoChannels = inputWave.getSamples(false);
const channel1Simple = []
for(let i=0;i<twoChannels.length;i++){
  channel1Simple.push(twoChannels[i]);
}
const {zerosArray:channelOne2D,h:ch1H,w:ch1W}=matrixConverter(channel1Simple)
const coeffChannel1 = dct2d(channelOne2D);
const quantization = createQuantizationTable();
const quantizedChannel1 = coeffAfterQuantization(quantization, coeffChannel1,"/");
const arrayOfZigzag1 = zigzagLooping(quantizedChannel1);
const runLengthChannel1 = runLengthEncoding(arrayOfZigzag1);
runLengthIntoBinary(runLengthChannel1, "binary channel1.bin");
// // Until here encoding done
// // Start decoding to go back to
const channel1FromRLEToInverseZigzag = runLengthDecoding(runLengthChannel1);
const channel1FromInverseZizagToInvereQ = inverseZigzagLooping(
  channel1FromRLEToInverseZigzag,quantizedChannel1.length,quantizedChannel1[0].length
  );
  const coeff1=coeffAfterQuantization(quantization,channel1FromInverseZizagToInvereQ,"*")
  const channel1=idct2d(coeff1)
  const final1 = clipper(channel1,ch1H,ch1W)
  for(let i=0;i<final1.length;i++)
  {
    fSociety.push(Math.floor(final1[i]))
  } 
}
    const wavOut = new wavefile.WaveFile();
wavOut.fromScratch(numChannels, sampleRate, `${bitsPerSample}`, [fSociety]);
fs.writeFileSync('output.wav', wavOut.toBuffer());
};
processAudioFile();
