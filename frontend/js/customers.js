let customersData = [];

let editingId = null;


async function loadCustomers(){

    customersData = await fetchData(

        "customers"

    );

    renderCustomers(

        customersData

    );

}


function renderCustomers(data){

    const tbody = document.querySelector(

        "#customers-table tbody"

    );

    tbody.innerHTML = "";


    data.forEach(customer=>{

        tbody.innerHTML += `

        <tr>

            <td>${customer.name}</td>

            <td>${customer.phone}</td>

            <td>${customer.address}</td>

            <td>

                <button

                class="edit-btn"

                onclick="editCustomer(${customer.id})">

                Edit

                </button>


                <button

                class="delete-btn"

                onclick="deleteCustomer(${customer.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}


async function addCustomer(){

    const name =

        document.getElementById(

            "customer-name"

        ).value.trim();


    const phone =

        document.getElementById(

            "customer-phone"

        ).value.trim();


    const address =

        document.getElementById(

            "customer-address"

        ).value.trim();


    if(

        !name ||

        !phone ||

        !address

    ){

        alert(

            "Fill all fields"

        );

        return;

    }


    if(editingId){

        await updateData(

            "customers",

            editingId,

            {

                name,

                phone,

                address

            }

        );


        editingId = null;


        document.getElementById(

            "add-customer-btn"

        ).textContent =

        "+ Add Customer";

    }

    else{

        await createData(

            "customers",

            {

                name,

                phone,

                address

            }

        );

    }


    clearForm();

    loadCustomers();

}


function editCustomer(id){

    const customer =

        customersData.find(

            c=>c.id===id

        );


    if(!customer){

        return;

    }


    editingId = id;


    document.getElementById(

        "customer-name"

    ).value = customer.name;


    document.getElementById(

        "customer-phone"

    ).value = customer.phone;


    document.getElementById(

        "customer-address"

    ).value = customer.address;


    document.getElementById(

        "add-customer-btn"

    ).textContent =

    "Update Customer";

}


async function deleteCustomer(id){

    const confirmDelete = confirm(

        "Delete this customer?"

    );


    if(

        !confirmDelete

    ){

        return;

    }


    await deleteData(

        "customers",

        id

    );


    editingId = null;

    clearForm();

    loadCustomers();

}


function clearForm(){

    document.getElementById(

        "customer-name"

    ).value = "";


    document.getElementById(

        "customer-phone"

    ).value = "";


    document.getElementById(

        "customer-address"

    ).value = "";

}


document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        document

        .getElementById(

            "add-customer-btn"

        )

        .addEventListener(

            "click",

            addCustomer

        );


        document

        .getElementById(

            "customer-search"

        )

        .addEventListener(

            "input",

            function(){

                const keyword =

                    this.value

                    .toLowerCase();


                const filtered =

                    customersData.filter(

                        customer=>

                        customer.name

                        .toLowerCase()

                        .includes(keyword)

                    );


                renderCustomers(

                    filtered

                );

            }

        );


        loadCustomers();

    }

);