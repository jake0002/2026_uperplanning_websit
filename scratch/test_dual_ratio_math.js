function testDualRatio(winScroll, winDocH, winVp, paneScroll, paneH, paneVp) {
  const winMax = Math.max(0, winDocH - winVp);
  const winRatio = winMax > 5 ? (winScroll / winMax) : 0;

  const paneMax = Math.max(0, paneH - paneVp);
  const paneRatio = paneMax > 5 ? (paneScroll / paneMax) : 0;

  const activeRatio = Math.max(winRatio, paneRatio);
  const scrolled = Math.min(100, Math.max(0, activeRatio * 100));

  return { winRatio: winRatio.toFixed(2), paneRatio: paneRatio.toFixed(2), scrolled: Math.round(scrolled) + '%' };
}

console.log('Case 1: Window scrolling (0px of 2000px):', testDualRatio(0, 3000, 1000, 0, 0, 0));
console.log('Case 2: Window scrolling (1000px of 2000px):', testDualRatio(1000, 3000, 1000, 0, 0, 0));
console.log('Case 3: Pane scrolling (500px of 1000px):', testDualRatio(0, 0, 0, 500, 1500, 500));
console.log('Case 4: Both scrolling (window 25%, pane 75%):', testDualRatio(500, 3000, 1000, 750, 1500, 500));
