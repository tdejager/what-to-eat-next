/**
 * @jest-environment node
 */
import { scrapeCuly } from "../backend/util";

describe("Scrape culy", () => {
    it("Scrape culy", async () => {
        const data = await scrapeCuly("https://www.culy.nl/recepten/pasta-met-aubergine/");
        console.log(data);
    });
});

