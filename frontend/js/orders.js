let ordersData = [];

async function loadOrders() {

    ordersData =

        await fetchData(

            "orders"

        );

    renderOrders(

        ordersData

    );

}


function renderOrders(data) {

    const tbody =

        document.querySelector(

            "#orders-table tbody"

        );



    tbody.innerHTML = "";


    data.forEach(order => {

        tbody.innerHTML += `

        <tr>

            <td>${order.dress_type}</td>

            <td>₹${order.amount}</td>

            <td>${order.status}</td>

        </tr>

        `;

    });

}


document.addEventListener(

    "DOMContentLoaded",

    () => {

        const searchBox =

            document.getElementById(

                "order-search"

            );


        if (searchBox) {

            searchBox.addEventListener(

                "input",

                function () {

                    const keyword =

                        this.value.toLowerCase();


                    const filtered =

                        ordersData.filter(

                            order =>

                                order.dress_type

                                    .toLowerCase()

                                    .includes(keyword)

                        );


                    renderOrders(filtered);

                }

            );

        }


        loadOrders();

    }

);