const BASE_URL = "http://127.0.0.1:8000/api";

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