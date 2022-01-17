import React from "react";
import RecipeCard from "../components/recipe_card";
import {SaveRecipeResult} from "./api/add_recipe";
import {scrapeCuly} from "../backend/util";
import {GetRecipeResult} from "./api/get_culy_recipe";
import {useSession, signIn, signOut} from "next-auth/react"

const btn = "mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

/// Saved react flash message with tailwind classes
const Saved = ({saved, setSaved}: { saved: boolean, setSaved: (s: boolean) => void }) => {
    // Remove after a couple of seconds
    React.useEffect(() => {
        if (saved) {
            setTimeout(() => setSaved(false), 3000);
        }
    }, [saved, setSaved]);
    return (saved ?
        <div className="bg-blue-100 border-t border-b border-green-500 text-green-700 px-4 py-3 mb-4" role="alert">
            <p className="font-bold">Recipe saved</p>
            <p className="text-sm">Recipe was saved to the database</p>
        </div> : null);
}


/// Form that allows the user to add a new Recipe to the database
const AddForm = ({setSaved}: { setSaved: (s: boolean) => void }) => {
    const labelClass = "block text-gray-700 text-sm font-bold mb-2"
    const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    const [title, setTitleState] = React.useState("");
    const [url, setUrlState] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");

    function changeEvent(setFormValue: (value: string) => void) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormValue(e.target.value);
        }
    }

    async function saveRecipe(setGlobalSaved: typeof setSaved) {
        // // Save recipe to database
        const bodyJson = JSON.stringify({
            title: title,
            url: url !== "" ? url : null,
            imageUrl: imageUrl !== "" ? imageUrl : null
        });
        // Create new recipe
        const res = await fetch('/api/add_recipe', {
            body: bodyJson,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        //
        const result = await res.json() as SaveRecipeResult;
        if (result.succes)
            setGlobalSaved(true);

        // Set form values to empty, using react state
        setTitleState("");
        setUrlState("");
        setImageUrl("");
    }

    async function setRecipeLink(e: React.ChangeEvent<HTMLInputElement>) {
        const url = e.target.value;
        if (url.includes("culy")) {
            const bodyJson = JSON.stringify({
                url: url,
            });
            // Create new recipe
            const result = await fetch('/api/get_culy_recipe', {
                body: bodyJson,
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });
            const getRecipeResult = await result.json() as GetRecipeResult;
            if (getRecipeResult.data) {
                setTitleState(getRecipeResult.data.title);
                setImageUrl(getRecipeResult.data.imageUrl || "");
            }
            setUrlState(url);
        }
    }

    return (
        <div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(async event => {
                event.preventDefault();
                await saveRecipe(setSaved);
            })}>
                <div>
                    <label className={labelClass} htmlFor="recipe_url">Recipe Link:</label>
                    <input className={inputClass} value={url} onChange={async (e) => await setRecipeLink(e)} type="url"
                           name="recipe_url"/>
                </div>
                <div>
                    <label className={labelClass} htmlFor="title">Recipe Title:</label>
                    <input required={true} className={inputClass} value={title} onChange={changeEvent(setTitleState)}
                           type="text"
                           name="title"/>
                </div>
                <div>
                    <label className={labelClass} htmlFor="recipe_url_image">Recipe Image Link:</label>
                    <input className={inputClass} type="url" value={imageUrl} onChange={changeEvent(setImageUrl)}
                           name="recipe_url_image"/>
                </div>
                <button
                    className={btn}
                >
                    Submit
                </button>
            </form>
            <RecipeCard recipe={{id: 0, title: title, url: url, imageUrl: imageUrl, content: null}}/>
        </div>
    );
}

/// Add recipe component
const AddRecipe = () => {
    const [recipeSaved, setSaved] = React.useState(false)
    const {data: session} = useSession()
    if (session) {
        return (<div>
            {recipeSaved ? <Saved saved={recipeSaved} setSaved={setSaved}/> : null}
            <h1 className="text-xl md:text-3xl lg:text-3xl text-center mb-4">Add recipe</h1>
            <AddForm setSaved={setSaved}/>
        </div>);
    }
    return <>
        <p className="mt-4 text-xl">Not signed in: </p> <br/>
        <button className={btn}
                onClick={() => signIn()}>Sign in
        </button>
    </>
}

export default AddRecipe;
