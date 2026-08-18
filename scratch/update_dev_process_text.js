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
            '<span>4. 개발 진행 프로세스: 기획부터 운영까지</span>',
            '<span>4. 개발 진행 프로세스</span>'
        );

        content = content.replaceAll(
            '<h2 id="process">4. 개발 진행 프로세스: 기획부터 운영까지</h2>',
            '<h2 id="process">4. 개발 진행 프로세스</h2>'
        );

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated section 4 text in: ${filepath}`);
        }
    }
});
