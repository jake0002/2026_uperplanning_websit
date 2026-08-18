const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\jake\\.gemini\\antigravity-ide\\brain\\00587b66-b3d5-4fc1-8a1d-a61c4a848efe\\.user_uploaded\\media_1786862995720.jpg';
const targetDir = path.resolve(__dirname, '..', 'implementation');
const targetImagesDir = path.join(targetDir, 'images');

if (!fs.existsSync(targetImagesDir)) {
    fs.mkdirSync(targetImagesDir, { recursive: true });
}

fs.copyFileSync(srcPath, path.join(targetDir, 'threads-logo.jpg'));
fs.copyFileSync(srcPath, path.join(targetImagesDir, 'threads-logo.jpg'));
fs.copyFileSync(srcPath, path.join(targetDir, 'threads-logo.png'));
fs.copyFileSync(srcPath, path.join(targetImagesDir, 'threads-logo.png'));

console.log('Copied threads-logo image successfully.');
