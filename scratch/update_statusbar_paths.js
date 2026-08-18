const fs = require('fs');

// UX Writing files
const writingFiles = [
    'implementation/ux_writing/index.html',
    'implementation/ux_writing.html',
    'implementation/ux-writing.html',
    'implementation/UX_Writing/index.html'
];

writingFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        const original = content;
        content = content.replaceAll(
            '<div>C:\\SUPERPLANNING\\UX_서비스\\UX_리서치</div>',
            '<div>C:\\SUPERPLANNING\\UX_서비스\\UX_라이팅</div>'
        );
        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated statusbar path in UX Writing: ${filepath}`);
        }
    }
});

// Contact files
const contactFiles = [
    'implementation/contact/index.html',
    'implementation/contact.html'
];

contactFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        const original = content;
        content = content.replaceAll(
            '<div>C:\\SUPERPLANNING\\UX_서비스\\UX_리서치</div>',
            '<div>C:\\SUPERPLANNING\\문의하기</div>'
        );
        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated statusbar path in Contact: ${filepath}`);
        }
    }
});
