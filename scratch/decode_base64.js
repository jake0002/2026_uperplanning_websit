const fs = require('fs');

const filepath = 'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html';
const content = fs.readFileSync(filepath, 'utf8');

const idx = content.indexOf('<h2 id="consulting">3. UX컨설팅</h2>');
if (idx !== -1) {
    const section = content.substring(idx, idx + 15000);
    const regex = /src=["']data:image\/[^;]+;base64,([\s\S]+?)["']/g;
    let match;
    let count = 0;
    while ((match = regex.exec(section)) !== null) {
        count++;
        let b64 = match[1].replace(/\s+/g, '');
        const buffer = Buffer.from(b64, 'base64');
        const filename = `scratch/consulting_img_${count}.jpg`;
        fs.writeFileSync(filename, buffer);
        console.log(`Saved ${filename} (${buffer.length} bytes)`);
    }
    console.log(`Total extracted: ${count}`);
}
