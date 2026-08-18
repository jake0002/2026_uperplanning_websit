const fs = require('fs');

function testScroll(winScroll, winDocHeight, winHeight, paneScroll, paneDocHeight, paneHeight) {
  const currentScroll = Math.max(winScroll, paneScroll);
  const winTotal = winDocHeight - winHeight;
  const paneTotal = paneDocHeight - paneHeight;
  const totalScrollable = Math.max(winTotal, paneTotal);

  let scrolled = 0;
  if (totalScrollable > 0) {
    scrolled = Math.min(100, Math.max(0, (currentScroll / totalScrollable) * 100));
  } else {
    scrolled = 0;
  }
  return { currentScroll, totalScrollable, scrolled: Math.round(scrolled) + '%' };
}

console.log('Test at top (0px scroll):', testScroll(0, 2000, 800, 0, 0, 0));
console.log('Test at 50% (600px scroll):', testScroll(600, 2000, 800, 0, 0, 0));
console.log('Test at bottom (1200px scroll):', testScroll(1200, 2000, 800, 0, 0, 0));
console.log('Test if totalScrollable is 0:', testScroll(0, 800, 800, 0, 0, 0));
