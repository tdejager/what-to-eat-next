import type {GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Image from 'next/image'
import {Recipe} from '@prisma/client'
import {prisma} from "../backend/prisma"
import React from "react";

/// Props for recipe rendering
type RecipeProps = {
    text: string,
    url: string | null,
}

const getRecipes = async () => {
    return await prisma.recipe.findMany({take: 10});
}

/**
 * A recipe in the listing
 * @param param
 * @returns
 */
const Recipe = ({ text, url }: RecipeProps) => {
    const urlRendered = url ? <a className={"text-center underline"} href={url}>Click for recipe</a> : null;
    return <div
        className='border-gray-700 border flex flex-col justify-items-center gap-y-3 rounded-xl p-5 bg-gradient-to-b from-gray-100 to-transparent'>
        <div className="relative h-32 w-64 lg:h-64 lg:w-96">
            <Image className="w-full" src="/pie.jpg" layout="fill" objectFit="cover" alt={"Picture of the recipe"} />
        </div>
        <p className='text-gray-700 text-center text-xl'>{text}</p>
        {urlRendered}
    </div>
}

/**
 * List of number of recipes
 */
const RecipeListing: React.FC<{ recipeList: Recipe[] }> = (props) => {
    const recipes = props.recipeList.map((r) => {
        return <Recipe key={r.id} url={r.url} text={r.title} />
    });
    return (
        <div className='flex flex-col items-center gap-y-1 h-full'>
            {recipes}
        </div>
    )
}

/// The recipe page
const RecipeListPage = ({recipes}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <h1 className="text-xl md:text-3xl lg:text-3xl font-normal leading-normal mt-0 mb-5">What to eat next?</h1>
            <RecipeListing recipeList={recipes} />
        </>
    )
}

export default RecipeListPage

export const getServerSideProps: GetServerSideProps<{recipes: Recipe[]}> = async (ctx) => {
    const recipes = await getRecipes();
    return { props: { recipes: recipes } };
};
