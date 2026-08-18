const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.html', '.txt', '.md', '.xml'].includes(ext)) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const filesToProcess = getAllFiles('d:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation');

let updatedCount = 0;

filesToProcess.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    const original = content;

    // Replace canonical/OG URLs with hyphens
    content = content.replaceAll('https://superplanning.blog/ux_research', 'https://superplanning.blog/ux-research');
    content = content.replaceAll('https://superplanning.blog/ux_writing', 'https://superplanning.blog/ux-writing');
    content = content.replaceAll('https://superplanning.blog/ux_design', 'https://superplanning.blog/ux-design');

    // Replace href and location.href paths
    content = content.replaceAll('/ux_research/', '/ux-research/');
    content = content.replaceAll("href='/ux_research/'", "href='/ux-research/'");
    content = content.replaceAll('href="/ux_research/"', 'href="/ux-research/"');
    content = content.replaceAll("location.href='/ux_research/'", "location.href='/ux-research/'");

    content = content.replaceAll('/ux_writing/', '/ux-writing/');
    content = content.replaceAll("href='/ux_writing/'", "href='/ux-writing/'");
    content = content.replaceAll('href="/ux_writing/"', 'href="/ux-writing/"');
    content = content.replaceAll("location.href='/ux_writing/'", "location.href='/ux-writing/'");

    content = content.replaceAll('/ux_design/', '/ux-design/');
    content = content.replaceAll("href='/ux_design/'", "href='/ux-design/'");
    content = content.replaceAll('href="/ux_design/"', 'href="/ux-design/"');
    content = content.replaceAll("location.href='/ux_design/'", "location.href='/ux-design/'");

    // Replace fallback links without trailing slash if any
    content = content.replaceAll('href="/ux_research"', 'href="/ux-research"');
    content = content.replaceAll('href="/ux_writing"', 'href="/ux-writing"');
    content = content.replaceAll('href="/ux_design"', 'href="/ux-design"');

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
        updatedCount++;
        console.log(`Updated paths in: ${filepath}`);
    }
});

console.log(`\nUpdated ${updatedCount} files with hyphenated paths!`);
