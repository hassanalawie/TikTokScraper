const { chromium } = require("playwright");

async function autoScroll(page, scrollCount = 10) {
  for (let i = 0; i < scrollCount; i++) {
    await page.mouse.wheel(0, 2000); // Scroll down
    await page.waitForTimeout(3000); // Wait for videos to load
    console.log(`Scrolled ${i + 1}/${scrollCount}`);
  }
}

async function scrapeTikTokSearch(query) {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });

  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  });

  const page = await context.newPage();
  const searchUrl = `https://www.tiktok.com/search?q=${encodeURIComponent(
    query
  )}`;

  console.log(`Navigating to: ${searchUrl}`);
  await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

  // TikTok might load content lazily, wait for some videos
  await page.waitForTimeout(5000); // Increase if needed

  await autoScroll(page, 8);

  const videos = await page.$$eval(
    'div[id^="column-item-video-container"]',
    (nodes) =>
      nodes.map((node) => {
        const anchor = node.querySelector('a[href*="/video/"]');
        const captionSpans = node.querySelectorAll(
          'span[data-e2e="new-desc-span"]'
        );
        const caption = Array.from(captionSpans)
          .map((el) => el.textContent)
          .join(" ")
          .trim();
        const username =
          node.querySelector('p[data-e2e="search-card-user-unique-id"]')
            ?.textContent || null;

        return {
          videoUrl: anchor?.href || null,
          caption: caption || null,
          username: username,
        };
      })
  );

  await browser.close();

  console.log(`Found ${videos.length} results for "${query}"`);
  console.log(JSON.stringify(videos, null, 2));
  return videos;
}

// Test it
scrapeTikTokSearch("Search Term");
