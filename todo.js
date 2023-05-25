function compress(string, encoding) {
  const byteArray = new TextEncoder().encode(string);
  const cs = new CompressionStream(encoding);
  const writer = cs.writable.getWriter();
  writer.write(byteArray);
  writer.close();
  return new Response(cs.readable).arrayBuffer();
}

function decompress(byteArray, encoding) {
  const cs = new DecompressionStream(encoding);
  const writer = cs.writable.getWriter();
  writer.write(byteArray);
  writer.close();
  return new Response(cs.readable).arrayBuffer().then(function (arrayBuffer) {
    return new TextDecoder().decode(arrayBuffer);
  });
}

async function testCompression(text, encoding = 'deflate') {
  console.log(encoding + ':');
  console.time('compress');
  const compressedData = await compress(text, encoding);
  console.timeEnd('compress');
  console.log('compressed length:', compressedData.byteLength, 'bytes');
  console.time('decompress');
  const decompressedText = await decompress(compressedData, encoding);
  console.timeEnd('decompress');
  console.log('decompressed length:', decompressedText.length, 'characters');
  console.assert(text === decompressedText);
}

function arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}



function base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
