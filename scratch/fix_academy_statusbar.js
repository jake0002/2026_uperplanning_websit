const fs = require('fs');

const academyFiles = [
    'implementation/ux-academy/index.html',
    'implementation/ux-academy.html',
    'implementation/ux_academy/index.html',
    'implementation/ux_academy.html'
];

academyFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        const original = content;
        content = content.replaceAll(
            '<div>C:\\SUPERPLANNING\\UX_서비스\\UX_리서치</div>',
            '<div>C:\\SUPERPLANNING\\UX_서비스\\UX_강의</div>'
        );
        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated statusbar path in: ${filepath}`);
        }
    }
});
