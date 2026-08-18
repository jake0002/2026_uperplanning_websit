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

    // 1. Update WINDOW_DEFS intro-video dimensions
    if (content.includes("'intro-video': { w: 580, h: 400")) {
        content = content.replace(
            /'intro-video':\s*\{\s*w:\s*580,\s*h:\s*400/g,
            "'intro-video': { w: 640, h: 430"
        );
        modified = true;
    }
    if (content.includes('"intro-video": { w: 580, h: 400')) {
        content = content.replace(
            /"intro-video":\s*\{\s*w:\s*580,\s*h:\s*400/g,
            '"intro-video": { w: 640, h: 430'
        );
        modified = true;
    }

    // 2. Update intro-video iframe height inside getWindowBody or inline template
    // Replace height: 235px or height: 260px for intro video iframe with height: 345px
    const iframeOldRegex = /(<iframe\s+[^>]*src=["']https:\/\/www\.youtube-nocookie\.com\/embed\/dHwu6Zdt1Pw[^>]*style=["'][^"']*height:\s*)(?:235|260)px/gi;
    if (iframeOldRegex.test(content)) {
        content = content.replace(iframeOldRegex, '$1345px');
        modified = true;
    }

    // Also check if style contains flex:1 or min-height:345px
    if (content.includes('style="width:100%; height:345px;')) {
        content = content.replace(
            'style="width:100%; height:345px;',
            'style="width:100%; flex:1; min-height:345px; height:345px;'
        );
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Updated ${updatedCount} HTML files for YouTube video popup height increase.`);
