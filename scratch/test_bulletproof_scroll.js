function calcScroll(scrollY, docH, winH) {
  const currentScroll = Math.max(0, scrollY);
  const maxScroll = Math.max(1, docH - winH);
  const scrolled = Math.min(100, Math.max(0, (currentScroll / maxScroll) * 100));
  return { scrollY, maxScroll, percentage: Math.round(scrolled) + '%' };
}

console.log('Top (0px):', calcScroll(0, 3000, 1000));
console.log('Quarter (500px):', calcScroll(500, 3000, 1000));
console.log('Half (1000px):', calcScroll(1000, 3000, 1000));
console.log('3/4 (1500px):', calcScroll(1500, 3000, 1000));
console.log('Bottom (2000px):', calcScroll(2000, 3000, 1000));
