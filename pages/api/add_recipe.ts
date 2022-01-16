// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from "../../backend/prisma";

export type SaveRecipeResult = {
    succes: boolean,
    id?: number,
    err?: any,
}

type RecipeData = {
    title: string;
    url?: string;
    imageUrl?: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<SaveRecipeResult>
) {
    const result = req.body as RecipeData;
    prisma.recipe.create({
        data: {
            title: result.title,
            url: result.url,
            imageUrl: result.imageUrl,
        },
    }).then((recipe) => {
        res.status(200).json({
            succes: true,
            id: recipe.id,
        });
    }).catch((err) => {
        res.status(500).json({
            succes: false,
            err: err,
        });
    });
}
