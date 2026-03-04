import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/Vitaly/AppData/Roaming/npm/node_modules/playwright');

const carouselUrl = 'http://localhost:3000/assets/lead-flow-carousel.html';
const singleUrl = 'http://localhost:3000/assets/lead-flow.html';
const outDir = 'public/assets';

async function main() {
  const browser = await chromium.launch({ headless: true });

  // ═══ CAROUSEL SLIDES (1080x1350 each) ═══
  console.log('Capturing 9 carousel slides at 1080x1350...');
  const igPage = await browser.newPage();
  await igPage.setViewportSize({ width: 1080, height: 1350 });
  await igPage.goto(carouselUrl, { waitUntil: 'networkidle' });
  await igPage.waitForTimeout(1500);

  for (let i = 1; i <= 9; i++) {
    const slide = await igPage.$(`#slide-${i}`);
    if (slide) {
      await slide.screenshot({ path: `${outDir}/lead-flow-slide-${String(i).padStart(2, '0')}.png` });
      console.log(`  Slide ${i}/9 saved.`);
    }
  }
  await igPage.close();

  // ═══ DESKTOP PANORAMIC (1920 wide, full page) ═══
  console.log('Capturing desktop panoramic at 1920px wide...');
  const deskPage = await browser.newPage();
  await deskPage.setViewportSize({ width: 1920, height: 1080 });
  await deskPage.goto(singleUrl, { waitUntil: 'networkidle' });
  await deskPage.waitForTimeout(1000);
  // Add desktop class
  await deskPage.evaluate(() => {
    const container = document.querySelector('.flow-container');
    if (container) container.classList.add('desktop');
  });
  await deskPage.waitForTimeout(500);
  await deskPage.screenshot({
    path: `${outDir}/lead-flow-desktop.png`,
    fullPage: true
  });
  console.log('  Desktop panoramic saved.');
  await deskPage.close();

  await browser.close();
  console.log('\nDone! Files:');
  for (let i = 1; i <= 9; i++) {
    console.log(`  ${outDir}/lead-flow-slide-${String(i).padStart(2, '0')}.png (1080x1350)`);
  }
  console.log(`  ${outDir}/lead-flow-desktop.png (1920px wide panoramic)`);
}

main().catch(e => { console.error(e); process.exit(1); });
