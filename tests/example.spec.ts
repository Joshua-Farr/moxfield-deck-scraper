import { test, expect } from "@playwright/test";
import { getCookies, getDecklistJSON } from "../main";

// ---------- Testing Zone ---------- //

test("Get cookies from Moxfield URL", async () => {
  await getCookies("https://www.moxfield.com/decks/5PzhWgSig0OtziBeSLIyJA");
});

test("Get JSON from Moxfield using cookie", async () => {
  const cookie = await getCookies(
    "https://www.moxfield.com/decks/5PzhWgSig0OtziBeSLIyJA"
  );

  const decklistJSON = await getDecklistJSON("5PzhWgSig0OtziBeSLIyJA");
  console.log("HERE IS THE TEST DECKLIST: ", decklistJSON)
});
