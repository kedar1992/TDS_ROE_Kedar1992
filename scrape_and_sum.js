const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 56 + i);
const baseUrl = 'https://sanand0.github.io/tdsdata/js_table/?seed=';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `${baseUrl}${seed}`;
    await page.goto(url);
    const numbers = await page.$$eval('table td', cells =>
      cells.map(cell => parseFloat(cell.textContent)).filter(n => !isNaN(n))
    );
    const pageTotal = numbers.reduce((sum, n) => sum + n, 0);
    console.log(`Seed ${seed} total: ${pageTotal}`);
    grandTotal += pageTotal;
  }

  console.log(`Grand Total: ${grandTotal}`);
  await browser.close();
})();
