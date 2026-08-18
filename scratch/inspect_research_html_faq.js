const fs = require('fs');

// ux_research.html / ux-research.html은 이전 텍스트가 다를 수 있으므로 확인
['implementation/ux_research.html', 'implementation/ux-research.html'].forEach(f => {
    if (fs.existsSync(f)) {
        const content = fs.readFileSync(f, 'utf8');
        const idx = content.indexOf('견적 및 진행 신청은');
        if (idx !== -1) {
            console.log(f + ':');
            console.log(content.substring(idx - 50, idx + 300));
            console.log('---');
        }
    }
});
