let customersData = [];


async function loadCustomers() {

    customersData = await fetchData("customers");

    renderCustomers(customersData);

}


function renderCustomers(data) {

    const tbody = document.querySelector(

        "#customers-table tbody"

    );

    tbody.innerHTML = "";


    data.forEach(customer => {

        tbody.innerHTML += `

        <tr>

            <td>${customer.name}</td>

            <td>${customer.phone}</td>

            <td>${customer.address}</td>

            <td>

                <button

                onclick="deleteCustomer(${customer.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}


async function addCustomer() {

    const name =

        document.getElementById(

            "customer-name"

        ).value;


    const phone =

        document.getElementById(

            "customer-phone"

        ).value;


    const address =

        document.getElementById(

            "customer-address"

        ).value;


    if (

        !name ||

        !phone ||

        !address

    ) {

        alert(

            "Fill all fields"

        );

        return;

    }


    await createData(

        "customers",

        {

            name,

            phone,

            address

        }

    );


    document.getElementById(

        "customer-name"

    ).value = "";


    document.getElementById(

        "customer-phone"

    ).value = "";


    document.getElementById(

        "customer-address"

    ).value = "";


    loadCustomers();

}


async function deleteCustomer(id) {

    const confirmDelete = confirm(

        "Delete this customer?"

    );


    if (!confirmDelete) {

        return;

    }


    await deleteData(

        "customers",

        id

    );


    loadCustomers();

}


document.addEventListener(

    "DOMContentLoaded",

    () => {

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

            function () {

                const keyword =

                    this.value

                    .toLowerCase();


                const filtered =

                    customersData.filter(

                        customer =>

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