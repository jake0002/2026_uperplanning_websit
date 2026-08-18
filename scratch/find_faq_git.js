const { execSync } = require('child_process');
const fs = require('fs');

try {
    const gitLog = execSync('git log --oneline -n 20', { cwd: 'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website' }).toString();
    console.log('Recent commits:\n', gitLog);

    // Get commit before section 6 changes, e.g. 50beaef or earlier
    const commits = gitLog.split('\n').map(line => line.split(' ')[0]).filter(Boolean);

    for (let commit of commits) {
        try {
            let content = execSync(`git show ${commit}:implementation/ux_design/index.html`, {
                cwd: 'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website',
                maxBuffer: 10 * 1024 * 1024
            }).toString();

            let idx = content.indexOf('id="faq"');
            if (idx !== -1) {
                let faqBlock = content.substring(content.lastIndexOf('<h2', idx), content.indexOf('</main>', idx));
                console.log(`Found FAQ in commit ${commit}! Length: ${faqBlock.length}`);
                fs.writeFileSync('scratch/faq_recovered.html', faqBlock, 'utf8');
                console.log('Saved to scratch/faq_recovered.html');
                break;
            }
        } catch (e) {
            // continue
        }
    }
} catch (err) {
    console.error(err);
}
