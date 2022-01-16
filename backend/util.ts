import axios from "axios";

export async function scrapeCuly(url: string) {
    // TODO implement this later
    const response = await axios.get(url);
    console.log(response.data);
    // axios.get(url)
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
}

