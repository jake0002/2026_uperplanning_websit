const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'implementation');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allHtmlFiles = getFiles(baseDir);

allHtmlFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace onclick="location.href='https://superplanning.blog/';" or location.href='/' for 포트폴리오 보기 button
  const oldBtnRegex = /<button class="w95-btn"[^>]*onclick="location\.href='[^']+'"[^>]*>\s*<span>포트폴리오 보기<\/span>\s*<\/button>/g;

  if (oldBtnRegex.test(content)) {
    content = content.replace(
      oldBtnRegex,
      `<button class="w95-btn" style="padding:2px 8px; font-size:11px;" onclick="openWindow('brochure');">\n        <span>포트폴리오 보기</span>\n      </button>`
    );
    changed = true;
  }

  // Also replace any GNB link for 포트폴리오 보기 with openWindow('brochure')
  const gnbLinkRegex = /<a class="gnb-link"[^>]*href="[^"]*"[^>]*onclick="[^"]*"[^>]*><span>포트폴리오 보기<\/span><\/a>/g;
  if (gnbLinkRegex.test(content)) {
    content = content.replace(
      gnbLinkRegex,
      `<a class="gnb-link" href="javascript:void(0)" onclick="openWindow('brochure');"><span>포트폴리오 보기</span></a>`
    );
    changed = true;
  }

  // Ensure mobile drawer menu item opens window
  const mobileItemRegex = /<div class="start-item"[^>]*onclick="[^"]*toggleMobileMenu\(\);"[^>]*>• 포트폴리오 보기<\/div>/g;
  if (mobileItemRegex.test(content)) {
    content = content.replace(
      mobileItemRegex,
      `<div class="start-item" onclick="openWindow('brochure'); toggleMobileMenu();">• 포트폴리오 보기</div>`
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated GNB portfolio button to openWindow("brochure") in:', path.relative(baseDir, filePath));
  }
});

// Update generator script as well
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  content = content.replace(
    /onclick="location\.href='https:\/\/superplanning\.blog\/'"/g,
    'onclick="openWindow(\'brochure\')"'
  );
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Updated generate_standalone_post_pages.js GNB portfolio button');
}

console.log('ALL SUBPAGE GNB PORTFOLIO BUTTONS UPDATED TO openWindow("brochure")!');
