const https = require('https');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', (err) => reject(err));
  });
}

async function run() {
  const urls = [
    'https://superplanning.blog/ux-research/',
    'https://superplanning.blog/company/',
    'https://superplanning.blog/ux-writing/',
    'https://superplanning.blog/web-app-development/'
  ];

  for (const url of urls) {
    try {
      const res = await fetchPage(url);
      console.log('====================================');
      console.log('URL:', url, 'Status:', res.status, 'Length:', res.data.length);
      console.log('  Includes updateGnbScrollProgress:', res.data.includes('updateGnbScrollProgress'));
      console.log('  Includes gnbProgressBar:', res.data.includes('gnbProgressBar'));
      console.log('  Includes gnbProgressBadge:', res.data.includes('gnbProgressBadge'));

      // Check JS implementation snippet
      const jsMatch = res.data.match(/\/\/ GNB Scroll Progress Gauge Handler[\s\S]*?updateGnbScrollProgress\(\);/);
      if (jsMatch) {
        console.log('  JS snippet in live HTML:\n   ', jsMatch[0].replace(/\s+/g, ' ').substring(0, 200));
      } else {
        console.log('  JS snippet NOT FOUND');
      }
    } catch (e) {
      console.error('Error fetching', url, e.message);
    }
  }
}

run();
