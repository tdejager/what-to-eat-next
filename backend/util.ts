import axios from "axios";
import * as cheerio from "cheerio";


export type RecipeData = {
    title: string;
    url?: string;
    imageUrl?: string;
}

export async function scrapeCuly(url: string): Promise<RecipeData> {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let title = $(".article__title").text();
    title = title.replace("Culy Homemade: ", "")
    const imageUrl = $(".featured-image__image").attr("src");
    return {title: title, url: url, imageUrl: imageUrl};
}

