const BASE_URL = "https://tailortrack-backend.onrender.com/api";

async function fetchData(endpoint){

    try{

        const response = await fetch(`${BASE_URL}/${endpoint}/`);

        return await response.json();

    }

    catch(error){

        console.log(error);

        return [];

    }

}