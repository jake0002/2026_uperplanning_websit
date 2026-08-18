const fs = require('fs');
const html = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

const regex = /data-review-slide="(\d+)"[\s\S]*?<img src="data:image\/png;base64,([^"]+)"/g;
let match;
while ((match = regex.exec(html)) !== null) {
  const slideIdx = match[1];
  const b64 = match[2];
  const buf = Buffer.from(b64, 'base64');
  if (buf.length > 24) {
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    console.log(`Slide ${slideIdx}: ${w} x ${h} (aspect ratio: ${(w/h).toFixed(2)})`);
  }
}
