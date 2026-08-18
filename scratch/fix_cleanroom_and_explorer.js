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

htmlFiles.forEach(file => {
    if (file.endsWith('implementation\\index.html') || file.endsWith('implementation/index.html')) {
        return;
    }

    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('getSubpageWindowBody')) return;

    // Check if return fallback exists before end of getSubpageWindowBody
    if (!content.includes("return '<div>내용을 불러올 수 없습니다.</div>';")) {
        const introEnd = `            <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px;">
              <a href="https://youtu.be/dHwu6Zdt1Pw" target="_blank" class="w95-btn" style="padding:2px 8px; font-size:11px; text-decoration:none; color:#000;">유튜브에서 크게 보기 ↗</a>
            </div>
          </div>
        \`;
    }`;

        const fixedIntroEnd = `            <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px;">
              <a href="https://youtu.be/dHwu6Zdt1Pw" target="_blank" class="w95-btn" style="padding:2px 8px; font-size:11px; text-decoration:none; color:#000;">유튜브에서 크게 보기 ↗</a>
            </div>
          </div>
        \`;
      }
      return '<div>내용을 불러올 수 없습니다.</div>';
    }`;

        if (content.includes(introEnd)) {
            content = content.replace(introEnd, fixedIntroEnd);
            fs.writeFileSync(file, content, 'utf8');
            console.log('Fixed fallback return in:', file);
        }
    }
});
