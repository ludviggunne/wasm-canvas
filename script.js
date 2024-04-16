document.addEventListener('DOMContentLoaded', () => {
  WebAssembly.instantiateStreaming(fetch("./image.wasm")).then((result) => {
    const wasmInstance = result.instance;
    const wasmMemoryArray = new Uint8Array(wasmInstance.exports.memory.buffer);

    const canvas = document.getElementById("canvas");
    canvas.width = wasmInstance.exports.getImageWidth();
    canvas.height = wasmInstance.exports.getImageHeight();

    wasmInstance.exports.drawImage();
    const imageOffset = wasmInstance.exports.getImage();
    const imageArray = wasmMemoryArray.slice(imageOffset, imageOffset + canvas.width * canvas.height * 4);

    const context = canvas.getContext("2d");
    const imageData = context.createImageData(canvas.width, canvas.height);
    imageData.data.set(imageArray);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(imageData, 0, 0);
  });
});
