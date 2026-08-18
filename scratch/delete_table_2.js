const fs = require('fs');

const files = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux-design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_plan\\index.html',
];

files.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let original = content;

        // Match table 2 container block with overflow wrapper or stand-alone
        content = content.replace(/\s*<div style="width:100%; overflow-x:auto;">\s*<table class="compare-table">\s*<caption>표 2[\s\S]*?<\/table>\s*<\/div>/g, '');
        content = content.replace(/\s*<table class="compare-table">\s*<caption>표 2[\s\S]*?<\/table>/g, '');

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Deleted Table 2 in: ${filepath}`);
        } else {
            console.log(`Could not find Table 2 in: ${filepath}`);
        }
    }
});
