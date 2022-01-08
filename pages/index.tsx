import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { PrismaClient, Recipe } from '@prisma/client'

type RecipeProps = {
    text: string,
    url: string | null,
}

const getRecipes = async () => {
    const prisma = new PrismaClient();
    const results = await prisma.recipe.findMany({ take: 10 });
    return results.map(function(r) { return { text: r.title, url: r.url } });
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
        <Image src="/pie.jpg" width={200} height={200} alt={"Picture of the recipe"} />
        <p className='text-xl text-center'>{text}</p>
        {urlRendered}
    </div>
}

/**
 * List of number of recipes
 */
const RecipeListing: React.FC<{ recipeList: Recipe[] }> = (props) => {
    const recipes = props.recipeList.map((r) => {
        <Recipe url={r.url} text={r.title} />
    });
    return (
        <div className='flex flex-col items-center gap-y-1 h-full'>
            <Recipe text="First recipe" />
            <Recipe text="Recipe 2" url={"https://www.culy.nl/recepten/vegan-bibimbap/"} />
        </div>
    )
}

/// The recipe page
const RecipeListPage = (recipes: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div className='flex flex-col items-center h-screen w-screen'>
            <h1 className="text-xl md:text-3xl lg:text-6xl font-normal leading-normal mt-0 mb-5">What to eat next?</h1>
            <RecipeListing recipeList={recipes.recipes} />
        </div>
    )
}

export default RecipeListPage

export const getServerSideProps: GetServerSideProps<{ recipes: Recipe[] }> = async (ctx) => {
    const recipes = await getRecipes();
    return { props: { recipes: recipes } };
};
