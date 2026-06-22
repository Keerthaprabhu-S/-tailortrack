const BASE_URL = "https://tailortrack-backend.onrender.com/api";


async function fetchData(endpoint){

    try{

        const response = await fetch(

            `${BASE_URL}/${endpoint}/`

        );

        return await response.json();

    }

    catch(error){

        console.log(error);

        return [];

    }

}


async function createData(endpoint,data){

    try{

        const response = await fetch(

            `${BASE_URL}/${endpoint}/`,

            {

                method:"POST",

                headers:{

                    "Content-Type":

                    "application/json"

                },

                body:JSON.stringify(data)

            }

        );

        return await response.json();

    }

    catch(error){

        console.log(error);

    }

}


async function updateData(endpoint,id,data){

    try{

        const response = await fetch(

            `${BASE_URL}/${endpoint}/${id}/`,

            {

                method:"PUT",

                headers:{

                    "Content-Type":

                    "application/json"

                },

                body:JSON.stringify(data)

            }

        );

        return await response.json();

    }

    catch(error){

        console.log(error);

    }

}


async function deleteData(endpoint,id){

    try{

        await fetch(

            `${BASE_URL}/${endpoint}/${id}/`,

            {

                method:"DELETE"

            }

        );

    }

    catch(error){

        console.log(error);

    }

}