const fs = require('fs');

console.log("Original img1 size:", fs.statSync('scratch/img1.jpg').size);
console.log("Original img2 size:", fs.statSync('scratch/img2.jpg').size);

console.log("Current ux_consulting_1 size:", fs.statSync('implementation/images/ux_consulting_1.jpg').size);
console.log("Current ux_consulting_2 size:", fs.statSync('implementation/images/ux_consulting_2.jpg').size);
