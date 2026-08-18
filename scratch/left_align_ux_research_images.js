const fs = require('fs');
const path = require('path');

const files = [
  'ux-research/index.html',
  'ux-research.html',
  'ux_research.html'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, '..', 'implementation', f);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Update .photo-frame and .photo-frame img CSS rules for left alignment
  const oldCss = /\.photo-frame\s*\{[\s\S]*?\}\s*\.photo-frame img\s*\{[\s\S]*?\}\s*\.photo-caption\s*\{[\s\S]*?\}/;
  const newCss = `.photo-frame {
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 0;
      margin: 24px 0;
      max-width: 640px;
      text-align: left !important;
      display: flex;
      flex-direction: column;
      align-items: flex-start !important;
    }
    .photo-frame img {
      width: 100%;
      max-width: 100%;
      max-height: 380px;
      object-fit: contain;
      object-position: left center !important;
      display: block;
      margin: 0 0 0 0 !important;
      border: none;
    }
    .photo-caption {
      margin-top: 8px;
      font-size: 12.5px;
      font-weight: bold;
      color: #555555;
      text-align: left !important;
      width: 100%;
    }`;

  if (oldCss.test(content)) {
    content = content.replace(oldCss, newCss);
  }

  // 2. Add inline object-position:left center to photo-frame imgs
  content = content.replace(
    /class="photo-frame"/g,
    'class="photo-frame" style="text-align:left;"'
  );

  content = content.replace(
    /class="photo-frame patent-photo"/g,
    'class="photo-frame patent-photo" style="text-align:left;"'
  );

  content = content.replace(
    /class="photo-caption"/g,
    'class="photo-caption" style="text-align:left;"'
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Successfully updated left alignment for images in:', f);
});
