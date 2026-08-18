const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..', 'implementation');

function getAllHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllHtmlFiles(filePath));
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

const htmlFiles = getAllHtmlFiles(baseDir);
let updatedCount = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // 1. Remove text in index.html
    const oldIndexBlock = `<div class="info-card" style="margin-bottom:8px; padding:6px; text-align:center; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #7b7b7b;">
            <img src="/images/superplanning-office.png" alt="\${isKo ? '슈퍼플래닝 미사 UX 스튜디오 전경' : 'Superplanning Studio Entrance'}" style="width:100%; height:auto; max-height:220px; object-fit:cover; border:1px solid #000; display:block; margin:0 auto 6px auto;">
            <div style="font-size:11px; color:#1a1a1a; font-weight:700;">🏢 \${isKo ? '슈퍼플래닝 미사 UX 스튜디오 입구' : 'Superplanning Misa UX Studio Entrance'}</div>
          </div>`;

    const newIndexBlock = `<div class="info-card" style="margin-bottom:8px; padding:6px; text-align:center; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #7b7b7b;">
            <img src="/images/superplanning-office.png" alt="\${isKo ? '슈퍼플래닝 미사 UX 스튜디오 전경' : 'Superplanning Studio Entrance'}" style="width:100%; height:auto; max-height:220px; object-fit:cover; border:1px solid #000; display:block;">
          </div>`;

    if (content.includes(oldIndexBlock)) {
        content = content.replace(oldIndexBlock, newIndexBlock);
        modified = true;
    }

    // 2. Remove text in subpages
    const oldSubpageBlock = `<div style="padding:6px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080; margin-bottom:8px; text-align:center;">
            <img src="/images/superplanning-office.png" alt="슈퍼플래닝 미사 UX 스튜디오 전경" style="width:100%; height:auto; max-height:200px; object-fit:cover; border:1px solid #000; display:block; margin:0 auto 6px auto;">
            <div style="font-size:11px; color:#1a1a1a; font-weight:700;">🏢 슈퍼플래닝 미사 UX 스튜디오 입구</div>
          </div>`;

    const newSubpageBlock = `<div style="padding:6px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080; margin-bottom:8px; text-align:center;">
            <img src="/images/superplanning-office.png" alt="슈퍼플래닝 미사 UX 스튜디오 전경" style="width:100%; height:auto; max-height:200px; object-fit:cover; border:1px solid #000; display:block;">
          </div>`;

    if (content.includes(oldSubpageBlock)) {
        content = content.replace(oldSubpageBlock, newSubpageBlock);
        modified = true;
    }

    // Generic fallback for any remaining div containing text
    if (content.includes('🏢 슈퍼플래닝 미사 UX 스튜디오 입구')) {
        content = content.replace(/<div[^>]*>🏢 [^<]*<\/div>/g, '');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Updated caption text removal in ${updatedCount} HTML files.`);
