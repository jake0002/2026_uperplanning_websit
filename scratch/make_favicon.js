const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\jake\\.gemini\\antigravity-ide\\brain\\00587b66-b3d5-4fc1-8a1d-a61c4a848efe\\.user_uploaded\\media_1786862511761.png';
const targetDir = path.resolve(__dirname, '..', 'implementation');
const targetImagesDir = path.join(targetDir, 'images');

if (!fs.existsSync(targetImagesDir)) {
    fs.mkdirSync(targetImagesDir, { recursive: true });
}

// Copy original file as favicon.png
fs.copyFileSync(srcPath, path.join(targetDir, 'favicon.png'));
fs.copyFileSync(srcPath, path.join(targetImagesDir, 'favicon.png'));

console.log('Original image copied to favicon.png');
