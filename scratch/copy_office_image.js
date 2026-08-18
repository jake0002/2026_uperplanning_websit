const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\jake\\.gemini\\antigravity-ide\\brain\\00587b66-b3d5-4fc1-8a1d-a61c4a848efe\\.user_uploaded\\media_1786863828831.png';
const targetDir = path.resolve(__dirname, '..', 'implementation');
const targetImagesDir = path.join(targetDir, 'images');

if (!fs.existsSync(targetImagesDir)) {
    fs.mkdirSync(targetImagesDir, { recursive: true });
}

fs.copyFileSync(srcPath, path.join(targetDir, 'superplanning-office.png'));
fs.copyFileSync(srcPath, path.join(targetImagesDir, 'superplanning-office.png'));

console.log('Copied superplanning-office.png successfully.');
