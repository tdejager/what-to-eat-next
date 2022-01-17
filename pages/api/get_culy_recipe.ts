import type { NextApiRequest, NextApiResponse } from 'next'
import {RecipeData, scrapeCuly} from "../../backend/util";

export type GetRecipeResult = {
    succes: boolean,
    data?: RecipeData,
    err?: any,
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetRecipeResult>
) {
    const  { url: string } = req.body;
    const recipeData = await scrapeCuly(string);
    res.status(200).json({
        succes: true,
        data: recipeData,
    })
}
