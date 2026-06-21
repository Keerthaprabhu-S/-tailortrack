let customersData = [];

async function loadCustomers() {

    customersData = await fetchData("customers");

    renderCustomers(customersData);

}


function renderCustomers(data) {

    const tbody =
        document.querySelector(
            "#customers-table tbody"
        );

    tbody.innerHTML = "";


    data.forEach(customer => {

        tbody.innerHTML += `

        <tr>

            <td>${customer.name}</td>

            <td>${customer.phone}</td>

            <td>${customer.address}</td>

        </tr>

        `;

    });

}


document.addEventListener(

    "DOMContentLoaded",

    () => {

        const searchBox =

            document.getElementById(

                "customer-search"

            );


        if (searchBox) {

            searchBox.addEventListener(

                "input",

                function () {

                    const keyword =

                        this.value.toLowerCase();


                    const filtered =

                        customersData.filter(

                            customer =>

                                customer.name

                                    .toLowerCase()

                                    .includes(keyword)

                        );


                    renderCustomers(filtered);

                }

            );

        }


        loadCustomers();

    }

);