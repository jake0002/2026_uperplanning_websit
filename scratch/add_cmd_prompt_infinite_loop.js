const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'implementation', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Update HTML in cmd-prompt to wrap HELLO in <span id="cmdDynamicText">HELLO</span>
const oldCmdHtml = `<span>C:\\\\SUPERPLANNING&gt; HELLO</span><span class="blink-cursor" style="height:13px; width:6px; background:#ffffff; display:inline-block;"></span>`;
const newCmdHtml = `<span>C:\\\\SUPERPLANNING&gt; <span id="cmdDynamicText">HELLO</span></span><span class="blink-cursor" style="height:13px; width:6px; background:#ffffff; display:inline-block;"></span>`;

if (content.includes(oldCmdHtml)) {
  content = content.replace(oldCmdHtml, newCmdHtml);
  console.log('Successfully updated cmd-prompt HTML with span id="cmdDynamicText"');
} else {
  console.error('Could not find oldCmdHtml in index.html');
}

// 2. Add startCmdPromptLoop function and call it inside typeWriterHero
const cmdLoopFunction = `
    let cmdLoopTimer = null;
    function startCmdPromptLoop() {
      const el = document.getElementById('cmdDynamicText');
      if (!el) return;

      if (cmdLoopTimer) clearTimeout(cmdLoopTimer);

      const phases = ['HELLO', 'AI & UI/UX'];
      let phaseIndex = 0;
      el.textContent = phases[0];

      function doLoop() {
        if (!document.getElementById('cmdDynamicText')) return;

        cmdLoopTimer = setTimeout(() => {
          if (!document.getElementById('cmdDynamicText')) return;
          deleteText(() => {
            if (!document.getElementById('cmdDynamicText')) return;
            phaseIndex = (phaseIndex + 1) % phases.length;
            const targetText = phases[phaseIndex];

            cmdLoopTimer = setTimeout(() => {
              if (!document.getElementById('cmdDynamicText')) return;
              typeText(targetText, () => {
                doLoop();
              });
            }, 350);
          });
        }, 1600);
      }

      function deleteText(onComplete) {
        if (!document.getElementById('cmdDynamicText')) return;
        const curEl = document.getElementById('cmdDynamicText');
        if (curEl && curEl.textContent.length > 0) {
          curEl.textContent = curEl.textContent.slice(0, -1);
          blip(750, 0.012, 'square');
          cmdLoopTimer = setTimeout(() => deleteText(onComplete), 65);
        } else {
          if (onComplete) onComplete();
        }
      }

      function typeText(target, onComplete) {
        if (!document.getElementById('cmdDynamicText')) return;
        const curEl = document.getElementById('cmdDynamicText');
        if (curEl) {
          const len = curEl.textContent.length;
          if (len < target.length) {
            curEl.textContent = target.slice(0, len + 1);
            blip(820 + len * 25, 0.015, 'sine');
            cmdLoopTimer = setTimeout(() => typeText(target, onComplete), 75);
          } else {
            if (onComplete) onComplete();
          }
        }
      }

      doLoop();
    }
`;

// Insert startCmdPromptLoop above typeWriterHero
const typeWriterHeroTarget = `function typeWriterHero() {`;
if (content.includes(typeWriterHeroTarget)) {
  content = content.replace(
    typeWriterHeroTarget,
    cmdLoopFunction + '\n    function typeWriterHero() {\n      startCmdPromptLoop();'
  );
  console.log('Successfully added startCmdPromptLoop function and call inside typeWriterHero');
} else {
  console.error('Could not find typeWriterHeroTarget in index.html');
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully updated index.html with infinite loop text motion!');
