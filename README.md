# JPEG-Audio-compression
This project is built Using javascript programming language and Nodejs as a javascripy runtime environment to read a wav file and compress it using jpeg.


### Prerequisites
1. Make sure you have nodejs installed in your computer

 - you can download it from [nodejs.org](https://nodejs.org/en) then click on the **LTS** option
 - Or just click [here](https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi) and it will be downloaded.

### Packages
- I'm using one package called **wavefile** just for reading the wav file and extracting audio data from meta data and headers
run this command in vscode terminal 
```bash
npm install wavefile
```  
### How to run
- once you've installed the package run the command
```bash
node index.js
```

- as **index.js** is the entry point for the code and where the calling for functions that do compression and decompression occures.
---
### File structure

**1. index.js**
- Entry point for the project
here I'm importing and calling other scripts and files in order to use functions in one place

**2. convertAudio.js**
- Here I've  different functionality
  - create2DArrayZero
  - matrixConverter
  - combineChannels
  - runLengthIntoBinary

**3. DCT.js**
- dct2d
- idct2d

**4. utils.js**
- createQuantizationTable
- coeffAfterQuantization
- runLengthEncoding
- runLengthDecoding
- clipper

**5. zigzag.js**
- zigzagLooping
- inverseZigzagLooping

---
## Compression process
At this phase I read an audio file of type wav, I've choosed wav is it's not compressed by nature.
1. Read audio file and check for the audio whether it is whether it is mono or stereo.
3. if mono extract the data from the wave file and if it is stereo extract the two channels in order to be manipulated separately.
4. Apply **matrixConverter** on the new arrays in order to make it 2d array with width and height divisible by 8.
5. **DCT** Apply **dct2d** on the array inorder to have dct coeff
6. **Quantization** change values of the new coeff by using quantization table.
7. **Zigzag** Apply zigzag ordering in the array after quantization.
8. **RLE** apply run lenth encoding on the data in order to have smaller files and here we can see the compression is very efficient.
9. **Check compressed** here writing into binary files and this shows to us there is huge difference in size between sizes.

## Decompression process
1. **Run length decoding** Apply runlength decoding to have the data again in row not run length state.
2. **inverse zigzag** on the data in order to return it to 2d state again. 
3. **De-quantization** here inverse the quantization by multiplying notdivising by the quantization elements.
4. **Inverse DCT** calculate the inverse dct from dct coeffs.
5. **Clipping** apply clipping on data to remova extra places that was added in first place 
6. if stereo compine the channels again into one single array.
7. create new wave file with data of arrays after decompression
8. Check the new audio file sound and listen to it.

### Test
- You can test with the audio file that i've provided,
i've provided both stereo and mono files for the same song
- You can test it with another audio **WAV** file and change the output file name by changing it in **index.js** file and take into consideration the file path.
```js
// =====================================================================
const inputFileName = "input_stereo.wav"
const outputFileName= "output.wav"
// =====================================================================
```