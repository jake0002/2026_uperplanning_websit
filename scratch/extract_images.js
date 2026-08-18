const fs = require('fs');

const filepath = 'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html';
const content = fs.readFileSync(filepath, 'utf8');

const idx = content.indexOf('<h2 id="consulting">3. UX컨설팅</h2>');
if (idx !== -1) {
    const section = content.substring(idx, idx + 4000);
    const matches = section.match(/src="data:image\/jpeg;base64,([^"]+)"/g);
    if (matches) {
        console.log(`Found ${matches.length} base64 images in Section 3.`);
        matches.forEach((m, i) => {
            const b64 = m.replace('src="data:image/jpeg;base64,', '').slice(0, -1);
            const buffer = Buffer.from(b64, 'base64');
            fs.writeFileSync(`scratch/consulting_img_${i+1}.jpg`, buffer);
            console.log(`Saved scratch/consulting_img_${i+1}.jpg (${buffer.length} bytes)`);
        });
    } else {
        console.log("No base64 images found in section 3 match.");
    }
} else {
    console.log("Section 3 not found.");
}
