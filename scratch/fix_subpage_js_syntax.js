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
let fixedCount = 0;

const targetEndSnippet = `          <hr style="margin:10px 0;">
          <button class="w95-btn" style="background:#cc0000; color:#fff;" onclick="if(typeof triggerBSOD==='function') triggerBSOD();">갑자기 PC가 이상해요 (블루스크린 호출)</button>
        \`;`;

const fixedEndSnippet = `          <hr style="margin:10px 0;">
          <button class="w95-btn" style="background:#cc0000; color:#fff;" onclick="if(typeof triggerBSOD==='function') triggerBSOD();">갑자기 PC가 이상해요 (블루스크린 호출)</button>
        \`;
      }
      return '<div>내용을 불러올 수 없습니다.</div>';
    }`;

htmlFiles.forEach(file => {
    if (file.endsWith('implementation\\index.html') || file.endsWith('implementation/index.html')) {
        return;
    }

    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('getSubpageWindowBody')) return;

    if (content.includes(targetEndSnippet)) {
        // Replace the unclosed tweaks block end with properly closed function end
        content = content.replace(targetEndSnippet, fixedEndSnippet);
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
    }
});

console.log(`Fixed JS syntax and function closure in ${fixedCount} subpage HTML files.`);
