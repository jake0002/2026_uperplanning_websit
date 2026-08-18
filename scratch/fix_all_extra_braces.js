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

const badBlock = `      }
      return '<div>내용을 불러올 수 없습니다.</div>';
    }
    }`;

const goodBlock = `      }
      return '<div>내용을 불러올 수 없습니다.</div>';
    }`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(badBlock)) {
        content = content.replace(badBlock, goodBlock);
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
    }
});

console.log(`Fixed extra closing brace in ${fixedCount} HTML files.`);
