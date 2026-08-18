const fs = require('fs');

['implementation/contact/index.html', 'implementation/contact.html'].forEach(f => {
    if (fs.existsSync(f)) {
        const content = fs.readFileSync(f, 'utf8');
        const s = content.indexOf('<div class="statusbar">');
        const e = content.indexOf('</div>', s + 100);
        console.log(`=== ${f} ===`);
        console.log(content.substring(s, e + 6));
    }
});
