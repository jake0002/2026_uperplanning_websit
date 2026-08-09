const fs = require('fs');

const transcriptPath = 'C:\\Users\\jake\\.gemini\\antigravity-ide\\brain\\49e0cae8-390b-4ded-9e44-5d5be6707522\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf-8').split('\n');

for (const line of lines) {
    if (!line.trim()) continue;
    try {
        const data = JSON.parse(line);
        if (data.type === 'USER_INPUT' && data.content && data.content.includes('UX기획 페이퍼보드 협업 장면')) {
            fs.writeFileSync('d:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\extracted_prompt.txt', data.content, 'utf-8');
            console.log('Extracted prompt successfully.');
        }
    } catch (e) {
        // ignore parse error for incomplete lines
    }
}
