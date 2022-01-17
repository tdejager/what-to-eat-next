import React from "react";
import {Recipe} from "@prisma/client";

/**
 * A recipe in the listing
 * @param props the react properties
 * @returns
 */
const RecipeCard: React.FC<{ recipe: Recipe }> = (props) => {
    let {title, url, imageUrl} = props.recipe;
    imageUrl = imageUrl || "https://via.placeholder.com/300x200";
    const urlRendered = url ? <a className={"text-center underline"} href={url}>Click for recipe</a> : null;
    return <div
        className='border-gray-700 w-full border flex flex-col items-center gap-y-3 rounded p-3 shadow-lg bg-gradient-to-b bg-gray-100'>
        {/*<div className="relative h-32 w-full lg:h-64 lg:w-96">*/}
        <img className="h-32 w-72 lg:h-64 lg:w-2/3" src={imageUrl} alt={"Picture of the recipe"}/>
        {/*</div>*/}
        <p className='text-gray-700 text-center text-xl'>{title}</p>
        {urlRendered}
    </div>
}

export default RecipeCard;
