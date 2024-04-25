import { test, chromium, Cookie } from "@playwright/test";

const getCookies = async (moxfieldURL: string) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();


  const page = await context.newPage();
  await page.goto(moxfieldURL);

  const cookies = await page.context().cookies();
  console.log("Here are the cookies:", cookies);

  await context.close();
  await browser.close();

  return cookies;
};

export const getDecklistJSON = (deckNumber: string) => {
  console.log("Making GET request to Moxfield!")

  const sessionCookie = getCookies(`https://www.moxfield.com/decks/${deckNumber}`)

  return new Promise((resolve, reject) => {
    
    let request = require("request");
    const options = {
      method: "GET",
      url: `https://api2.moxfield.com/v3/decks/all/${deckNumber}`,
      headers: {
        cookie: `${sessionCookie}`,
      },
    };
    
      request(options, function (error, response) {
        if (error) {
          console.log(error, " was thrown!");
          reject(error);
        }
        console.log("Here is the JSON response: ", response.body);
        resolve(response.body);
      });
    })
};
  

module.exports = {getCookies, getDecklistJSON}