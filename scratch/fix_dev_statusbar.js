const fs = require('fs');

const devFiles = [
    'implementation/web-app-development/index.html',
    'implementation/web-app-development.html',
    'implementation/app_dev/index.html',
    'implementation/app_dev.html'
];

devFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        const original = content;
        content = content.replaceAll(
            '<div>C:\\SUPERPLANNING\\UX_서비스\\UX_리서치</div>',
            '<div>C:\\SUPERPLANNING\\UX_서비스\\웹_앱_개발</div>'
        );
        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated statusbar path in: ${filepath}`);
        }
    }
});
