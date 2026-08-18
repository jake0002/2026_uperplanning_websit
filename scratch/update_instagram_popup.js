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

    // 1. Update WINDOW_DEFS instagram height from 460 to 520 to eliminate scrollbars
    if (content.includes("'instagram': { w: 600, h: 460")) {
        content = content.replace(
            /'instagram':\s*\{\s*w:\s*600,\s*h:\s*460/g,
            "'instagram': { w: 600, h: 520"
        );
        modified = true;
    }
    if (content.includes('"instagram": { w: 600, h: 460')) {
        content = content.replace(
            /"instagram":\s*\{\s*w:\s*600,\s*h:\s*460/g,
            '"instagram": { w: 600, h: 520'
        );
        modified = true;
    }

    // 2. Remove camera emoji and change pink color to black in index.html
    if (content.includes('<span style="font-weight:bold; color:#d6249f;">📸 @ux_superplanning</span>')) {
        content = content.replace(
            '<span style="font-weight:bold; color:#d6249f;">📸 @ux_superplanning</span>',
            '<span style="font-weight:bold; color:#000000;">@ux_superplanning</span>'
        );
        modified = true;
    }

    // 3. Remove camera emoji on subpages
    if (content.includes('📸 Instagram @ux_superplanning')) {
        content = content.replace(
            '📸 Instagram @ux_superplanning',
            'Instagram @ux_superplanning'
        );
        modified = true;
    }

    // 4. Update iframe container min-height in index.html if present
    if (content.includes('min-height:350px; border:2px solid #000; box-shadow:inset 1px 1px 0 #7b7b7b; background:#fafafa; position:relative; overflow:hidden;')) {
        content = content.replace(
            'min-height:350px; border:2px solid #000; box-shadow:inset 1px 1px 0 #7b7b7b; background:#fafafa; position:relative; overflow:hidden;',
            'flex:1; min-height:400px; border:2px solid #000; box-shadow:inset 1px 1px 0 #7b7b7b; background:#fafafa; position:relative; overflow:hidden;'
        );
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Updated Instagram popup in ${updatedCount} HTML files.`);
