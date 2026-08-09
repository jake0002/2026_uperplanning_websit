const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\jake\\.gemini\\antigravity-ide\\brain\\ed04d15d-9296-4546-a9e5-053e25d6426f\\.system_generated\\logs\\transcript_full.jsonl';
const targetIndexHtml = path.join(__dirname, 'implementation', 'ux_design_cleanroom', 'index.html');
const targetAliasHtml = path.join(__dirname, 'implementation', 'ux_design_cleanroom.html');

const text = fs.readFileSync(logPath, 'utf-8');
const lines = text.split('\n');

const lineIndices = [156, 159, 164, 169, 172, 175, 178, 181, 186];
const keys = ['meaning', 'deliv1', 'deliv2', 'deliv3', 'consulting', 'diff', 'process', 'cases', 'faq'];

let extracted = {};

lineIndices.forEach((idx, i) => {
  const line = lines[idx];
  const obj = JSON.parse(line);
  let content = obj.content;

  const htmlPos = content.indexOf('```html');
  if (htmlPos !== -1) {
    let htmlContent = content.substring(htmlPos + 7);
    const closePos = htmlContent.indexOf('```');
    if (closePos !== -1) {
      htmlContent = htmlContent.substring(0, closePos);
    } else {
      const userReqPos = htmlContent.indexOf('</USER_REQUEST>');
      if (userReqPos !== -1) {
        htmlContent = htmlContent.substring(0, userReqPos);
      }
    }
    htmlContent = htmlContent.trim();
    const endTag = htmlContent.indexOf('\n[');
    if (endTag !== -1) {
      htmlContent = htmlContent.substring(0, endTag).trim();
    }
    extracted[keys[i]] = htmlContent;
  }
});

const deliverablesHtml = [extracted.deliv1, extracted.deliv2, extracted.deliv3].join('\n');

let indexContent = fs.readFileSync(targetIndexHtml, 'utf-8');

indexContent = indexContent.replace(/<section id="meaning">[\s\S]*?<\/section>/, `<section id="meaning">\n${extracted.meaning}\n</section>`);
indexContent = indexContent.replace(/<section id="deliverables">[\s\S]*?<\/section>/, `<section id="deliverables">\n${deliverablesHtml}\n</section>`);
indexContent = indexContent.replace(/<section id="consulting">[\s\S]*?<\/section>/, `<section id="consulting">\n${extracted.consulting}\n</section>`);
indexContent = indexContent.replace(/<section id="diff">[\s\S]*?<\/section>/, `<section id="diff">\n${extracted.diff}\n</section>`);
indexContent = indexContent.replace(/<section id="process">[\s\S]*?<\/section>/, `<section id="process">\n${extracted.process}\n</section>`);
indexContent = indexContent.replace(/<section id="cases">[\s\S]*?<\/section>/, `<section id="cases">\n${extracted.cases}\n</section>`);
indexContent = indexContent.replace(/<section id="faq">[\s\S]*?<\/section>/, `<section id="faq">\n${extracted.faq}\n</section>`);

fs.writeFileSync(targetIndexHtml, indexContent, 'utf-8');
fs.writeFileSync(targetAliasHtml, indexContent, 'utf-8');

const imgMatches = indexContent.match(/<img/g) || [];
const figMatches = indexContent.match(/<figure/g) || [];
const tableMatches = indexContent.match(/<table/g) || [];

console.log('--- FINAL VERIFICATION STATS ---');
console.log('Total img elements:', imgMatches.length);
console.log('Total figure elements:', figMatches.length);
console.log('Total table elements:', tableMatches.length);
