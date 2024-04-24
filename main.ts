import { test, expect, chromium } from "@playwright/test";

export const getCookies = async (url: string) => {
  // Create a new incognito browser context
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Create a new page inside context.
  const page = await context.newPage();
  await page.goto(url);

  // Get cookies from the page
  const cookies = await (page as any).cookies(); // Casting 'page' to 'any' to bypass TypeScript error
  console.log("Cookies:", cookies);

  // Dispose context once it's no longer needed.
  await context.close();
  await browser.close();
};

test("Get cookies from Moxfield URL", async () => {
  await getCookies("https://www.moxfield.com/decks/5PzhWgSig0OtziBeSLIyJA");
});
