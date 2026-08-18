const fs = require('fs');

const files = [
    'implementation/ux_research/index.html',
    'implementation/company/index.html',
    'implementation/ux_design/index.html',
    'implementation/ux_plan/index.html'
];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        console.log(f, 'has #startMenu DOM:', content.includes('id="startMenu"'));
    }
});
