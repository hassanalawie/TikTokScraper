# TikTok Search Scraper using Playwright

This script automates a TikTok search and scrapes video URLs, captions, and usernames from the search results using [Playwright](https://playwright.dev/).

## Features

- Automates a TikTok search for any query
- Scrolls the search results to load more content
- Extracts:
  - Video URL
  - Caption
  - Username
- Uses a custom user agent for improved site compatibility
- Outputs the scraped data as a JSON array

## Requirements

- Node.js (v16 or later recommended)
- [Playwright](https://playwright.dev/)

## Installation

```bash
npm install playwright
```

````

## Usage

1. Save the script to a file, e.g., `scrape.js`.
2. Run the script with Node.js:

```bash
node scrape.js
```

The script is currently set to search for:

```js
scrapeTikTokSearch("Chachee's Chai Cafe (Scarborough)");
```

To search for something else, modify the query string in the last line.

## Example Output

```json
[
  {
    "videoUrl": "https://www.tiktok.com/@exampleuser/video/1234567890",
    "caption": "Amazing spot for chai and vibes ☕",
    "username": "@exampleuser"
  },
  ...
]
```

## Notes

- TikTok may change its site layout; this scraper may require updates to keep working.
- The browser runs in non-headless mode by default so you can observe what it’s doing.
- This tool is for educational purposes. Always respect TikTok’s Terms of Service.

## License

MIT

````
