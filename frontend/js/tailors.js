let tailorsData = [];

let editingId = null;


async function loadTailors(){

    tailorsData = await fetchData(

        "tailors"

    );

    renderTailors(

        tailorsData

    );

}


function renderTailors(data){

    const tbody = document.querySelector(

        "#tailors-table tbody"

    );

    tbody.innerHTML = "";


    data.forEach(tailor=>{

        tbody.innerHTML += `

        <tr>

            <td>${tailor.name}</td>

            <td>${tailor.phone}</td>

            <td>${tailor.specialization}</td>

            <td>

                <button

                class="edit-btn"

                onclick="editTailor(${tailor.id})">

                Edit

                </button>


                <button

                class="delete-btn"

                onclick="deleteTailor(${tailor.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}


async function addTailor(){

    const name =

        document.getElementById(

            "tailor-name"

        ).value.trim();


    const phone =

        document.getElementById(

            "tailor-phone"

        ).value.trim();


    const specialization =

        document.getElementById(

            "tailor-specialization"

        ).value.trim();


    if(

        !name ||

        !phone ||

        !specialization

    ){

        alert(

            "Fill all fields"

        );

        return;

    }


    if(editingId){

        await updateData(

            "tailors",

            editingId,

            {

                name,

                phone,

                specialization

            }

        );


        editingId = null;


        document.getElementById(

            "add-tailor-btn"

        ).textContent =

        "+ Add Tailor";

    }

    else{

        await createData(

            "tailors",

            {

                name,

                phone,

                specialization

            }

        );

    }


    clearForm();

    loadTailors();

}


function editTailor(id){

    const tailor =

        tailorsData.find(

            t=>t.id===id

        );


    if(!tailor){

        return;

    }


    editingId = id;


    document.getElementById(

        "tailor-name"

    ).value = tailor.name;


    document.getElementById(

        "tailor-phone"

    ).value = tailor.phone;


    document.getElementById(

        "tailor-specialization"

    ).value = tailor.specialization;


    document.getElementById(

        "add-tailor-btn"

    ).textContent =

    "Update Tailor";

}


async function deleteTailor(id){

    const confirmDelete = confirm(

        "Delete this tailor?"

    );


    if(!confirmDelete){

        return;

    }


    await deleteData(

        "tailors",

        id

    );


    editingId = null;

    clearForm();

    loadTailors();

}


function clearForm(){

    document.getElementById(

        "tailor-name"

    ).value = "";


    document.getElementById(

        "tailor-phone"

    ).value = "";


    document.getElementById(

        "tailor-specialization"

    ).value = "";

}


document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        document

        .getElementById(

            "add-tailor-btn"

        )

        .addEventListener(

            "click",

            addTailor

        );


        document

        .getElementById(

            "tailor-search"

        )

        .addEventListener(

            "input",

            function(){

                const keyword =

                    this.value

                    .toLowerCase();


                const filtered =

                    tailorsData.filter(

                        tailor=>

                        tailor.name

                        .toLowerCase()

                        .includes(keyword)

                    );


                renderTailors(

                    filtered

                );

            }

        );


        loadTailors();

    }

);