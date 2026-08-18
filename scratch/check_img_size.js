const fs = require('fs');
const html = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

const introIdx = html.indexOf('<h2 id="intro">');
const nextH2Idx = html.indexOf('<h2 id="reviews">');
const section1 = html.substring(introIdx, nextH2Idx);

// Extract base64 src attributes
const imgRegex = /<img[^>]*src="data:image\/([^;]+);base64,([^"]+)"[^>]*>/gi;
let match;
let count = 0;

function getPngDimensions(buffer) {
  if (buffer.length > 24 && buffer.toString('hex', 0, 8) === '89504e470d0a1a0a') {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  }
  return null;
}

function getJpegDimensions(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    const marker = buffer.readUInt16BE(offset);
    if (marker >= 0xFFC0 && marker <= 0xFFC3) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    offset += 2 + buffer.readUInt16BE(offset + 2);
  }
  return null;
}

while ((match = imgRegex.exec(section1)) !== null) {
  count++;
  const type = match[1];
  const b64 = match[2];
  const buf = Buffer.from(b64, 'base64');
  let dims = null;
  if (type === 'png') dims = getPngDimensions(buf);
  else if (type === 'jpeg' || type === 'jpg') dims = getJpegDimensions(buf);
  console.log(`Image ${count} (${type}):`, dims, `buffer length: ${buf.length}`);
}
