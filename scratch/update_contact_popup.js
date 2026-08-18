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

const officeBoxIndexHtml = `          <h3 style="font-size:14px; font-weight:700; margin-bottom:8px;">📍 \${isKo ? '서비스 이해도가 높은 실무진이 직접 상담해 드립니다.' : 'Consult directly with experienced UX specialists.'}</h3>
          <div class="info-card" style="margin-bottom:8px; padding:6px; text-align:center; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #7b7b7b;">
            <img src="/images/superplanning-office.png" alt="\${isKo ? '슈퍼플래닝 미사 UX 스튜디오 전경' : 'Superplanning Studio Entrance'}" style="width:100%; height:auto; max-height:220px; object-fit:cover; border:1px solid #000; display:block; margin:0 auto 6px auto;">
            <div style="font-size:11px; color:#1a1a1a; font-weight:700;">🏢 \${isKo ? '슈퍼플래닝 미사 UX 스튜디오 입구' : 'Superplanning Misa UX Studio Entrance'}</div>
          </div>`;

const officeBoxSubpageHtml = `          <h3 style="font-size:13px; font-weight:700; margin-bottom:8px;">📍 서비스 이해도가 높은 실무진이 직접 상담해 드립니다.</h3>
          <div style="padding:6px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080; margin-bottom:8px; text-align:center;">
            <img src="/images/superplanning-office.png" alt="슈퍼플래닝 미사 UX 스튜디오 전경" style="width:100%; height:auto; max-height:200px; object-fit:cover; border:1px solid #000; display:block; margin:0 auto 6px auto;">
            <div style="font-size:11px; color:#1a1a1a; font-weight:700;">🏢 슈퍼플래닝 미사 UX 스튜디오 입구</div>
          </div>`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // 1. Update WINDOW_DEFS contact height from 520 to 680
    if (content.includes("'contact': { w: 620, h: 520")) {
        content = content.replace(
            /'contact':\s*\{\s*w:\s*620,\s*h:\s*520/g,
            "'contact': { w: 620, h: 680"
        );
        modified = true;
    }
    if (content.includes('"contact": { w: 620, h: 520')) {
        content = content.replace(
            /"contact":\s*\{\s*w:\s*620,\s*h:\s*520/g,
            '"contact": { w: 620, h: 680'
        );
        modified = true;
    }

    // 2. Add office image box below the text in index.html
    const targetIndexTitle = `<h3 style="font-size:14px; font-weight:700; margin-bottom:8px;">📍 \${isKo ? '서비스 이해도가 높은 실무진이 직접 상담해 드립니다.' : 'Consult directly with experienced UX specialists.'}</h3>`;
    if (content.includes(targetIndexTitle) && !content.includes('superplanning-office.png')) {
        content = content.replace(targetIndexTitle, officeBoxIndexHtml);
        modified = true;
    }

    // 3. Add office image box below the text in subpages
    const targetSubpageTitle = `<h3 style="font-size:13px; font-weight:700; margin-bottom:8px;">📍 서비스 이해도가 높은 실무진이 직접 상담해 드립니다.</h3>`;
    if (content.includes(targetSubpageTitle) && !content.includes('superplanning-office.png')) {
        content = content.replace(targetSubpageTitle, officeBoxSubpageHtml);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Updated contact popup in ${updatedCount} HTML files.`);
