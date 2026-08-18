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
    // Skip main index.html as we already updated it cleanly
    if (path.resolve(file) === path.resolve(baseDir, 'index.html')) return;

    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    if (content.includes('<div style="font-size:32px;">🧵</div>')) {
        content = content.replace(
            '<div style="font-size:32px;">🧵</div>',
            '<div style="width:54px; height:54px; border-radius:50%; background:#000; border:2px solid #444; display:flex; align-items:center; justify-content:center; overflow:hidden; margin:0 auto 8px auto; box-shadow:0 2px 8px rgba(0,0,0,0.5);"><img src="/images/threads-logo.jpg" alt="Threads Logo" style="width:100%; height:100%; object-fit:cover; display:block;"></div>'
        );
        modified = true;
    }

    if (content.includes('Threads 프로필 방문하기 (@ux_superplanning) ↗</a>') && !content.includes('src="/images/threads-logo.jpg"')) {
        content = content.replace(
            'Threads 프로필 방문하기 (@ux_superplanning) ↗</a>',
            '<img src="/images/threads-logo.jpg" alt="Threads" style="width:14px; height:14px; border-radius:2px; display:inline-block; vertical-align:middle; margin-right:4px;"> Threads 프로필 방문하기 (@ux_superplanning) ↗</a>'
        );
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Updated subpage Threads popups in ${updatedCount} HTML files.`);
