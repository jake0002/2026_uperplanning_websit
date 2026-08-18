const fs = require('fs');

const companyFiles = [
    'implementation/ux-company/index.html',
    'implementation/ux-company.html',
    'implementation/company/index.html',
    'implementation/company.html',
    'implementation/ux_company/index.html',
    'implementation/ux_company.html'
];

companyFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        const original = content;
        content = content.replaceAll(
            '<div>C:\\SUPERPLANNING\\UX_서비스\\UX_리서치</div>',
            '<div>C:\\SUPERPLANNING\\회사소개</div>'
        );
        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated statusbar path in: ${filepath}`);
        }
    }
});
