import type {GetServerSideProps, InferGetServerSidePropsType} from 'next'
import {Recipe} from '@prisma/client'
import {prisma} from "../backend/prisma"
import React from "react";
import RecipeCard from "../components/recipe_card";

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleRecipes(recipes: Recipe[]) {
    for (let i = recipes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = recipes[i];
        recipes[i] = recipes[j];
        recipes[j] = temp;
    }
}

const getRecipes = async () => {
    const recipes = await prisma.recipe.findMany({});
    shuffleRecipes(recipes);
    return recipes.slice(0, 5);
}


/**
 * List of number of recipes
 */
const RecipeListing: React.FC<{ recipeList: Recipe[] }> = (props) => {
    const recipes = props.recipeList.map((r) => {
        return <RecipeCard key={r.id} recipe={r}  />
    });
    return (
        <div className='flex flex-col items-center gap-y-1 h-full w-full'>
            {recipes}
        </div>
    )
}

/// The recipe page
const RecipeListPage = ({recipes}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <h1 className="text-xl md:text-3xl lg:text-3xl font-normal leading-normal mt-0 mb-5 underline">What to eat next?</h1>
            <RecipeListing recipeList={recipes} />
        </>
    )
}

export default RecipeListPage

export const getServerSideProps: GetServerSideProps<{recipes: Recipe[]}> = async (ctx) => {
    const recipes = await getRecipes();
    return { props: { recipes: recipes } };
};
