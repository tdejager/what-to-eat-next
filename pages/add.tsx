import React from "react";

/// Saved react flash message with tailwind classes
const Saved = () => {
    const [show, setShow] = React.useState(true);
    // Remove after a couple of seconds
    React.useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 3000);
    }, [show]);
    return (show ? <div className="bg-blue-100 border-t border-b border-green-500 text-green-700 px-4 py-3 mb-4" role="alert">
        <p className="font-bold">Recipe saved</p>
        <p className="text-sm">Recipe was saved to the database</p>
    </div>: null);
}


/// Form that allows the user to add a new Recipe to the database
const AddForm = ({setSaved}: {setSaved: (s: boolean) => void}) => {
    const labelClass = "block text-gray-700 text-sm font-bold mb-2"
    const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    function saveRecipe(recipe?: any) {
        // Save recipe to database
        console.log(recipe);
    }

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
                <label className={labelClass} htmlFor="title">Recipe Title:</label>
                <input className={inputClass} type="text" name="title" />
            </div>
            <div>
                <label className={labelClass} htmlFor="title">Recipe Link:</label>
                <input className={inputClass} type="url" name="recipe_url" />
            </div>
            <div>
                <label className={labelClass} htmlFor="title">Recipe Image:</label>
                <input className={inputClass} type="url" name="recipe_url_image" />
            </div>
            <button
                className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onSubmit={saveRecipe}
                type="submit">
                Submit
            </button>
        </form>);
}

/// Add recipe component
const AddRecipe = () => {
    const [recipeSaved, setSaved] = React.useState(false)

    return (<div>
        {recipeSaved ? <Saved /> : null}
        <h1 className="text-xl md:text-3xl lg:text-3xl text-center mb-4">Add recipe</h1>
        <AddForm setSaved={setSaved}/>
    </div>);
}

export default AddRecipe;
