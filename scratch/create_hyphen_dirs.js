const fs = require('fs');
const path = require('path');

const dirsToEnsure = [
    { src: 'implementation/ux_research', target: 'implementation/ux-research' },
    { src: 'implementation/ux_writing', target: 'implementation/ux-writing' },
    { src: 'implementation/ux_design', target: 'implementation/ux-design' }
];

function copyDirRecursive(src, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const targetPath = path.join(target, entry.name);
        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, targetPath);
        } else {
            fs.copyFileSync(srcPath, targetPath);
        }
    }
}

dirsToEnsure.forEach(item => {
    if (fs.existsSync(item.src)) {
        copyDirRecursive(item.src, item.target);
        console.log(`Copied ${item.src} to ${item.target}`);
    }
});
