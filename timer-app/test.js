const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/wangz/Desktop/project/opencode_app/timer-app/index.html');
  
  // Wait for the page to load
  await page.waitForSelector('#display');
  
  // Get initial time
  const initialTime = await page.textContent('#display');
  console.log(`Initial time: ${initialTime}`);
  
  // Click start
  await page.click('#startBtn');
  
  // Wait 2 seconds
  await page.waitForTimeout(2000);
  
  // Click pause
  await page.click('#pauseBtn');
  
  // Get time after 2 seconds
  const pausedTime = await page.textContent('#display');
  console.log(`Time after 2 seconds: ${pausedTime}`);
  
  // Click reset
  await page.click('#resetBtn');
  
  // Get time after reset
  const resetTime = await page.textContent('#display');
  console.log(`Time after reset: ${resetTime}`);
  
  // Take a screenshot
  await page.screenshot({ path: 'timer-demo.png' });
  
  await browser.close();
  console.log('Test completed. Screenshot saved as timer-demo.png');
})();