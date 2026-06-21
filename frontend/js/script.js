async function loadDashboard() {

    const customers = await fetchData("customers");

    const orders = await fetchData("orders");

    const payments = await fetchData("payments");

    const expenses = await fetchData("expenses");


    document.getElementById("customer-count").innerText =
        customers.length;

    document.getElementById("order-count").innerText =
        orders.length;


    let totalRevenue = 0;

    payments.forEach(payment => {

        totalRevenue += Number(payment.amount_paid || 0);

    });


    document.getElementById("revenue-count").innerText =
        `₹${totalRevenue}`;




    let totalExpense = 0;

    expenses.forEach(expense => {

        totalExpense += Number(expense.amount || 0);

    });


    document.getElementById("expense-count").innerText =
        `₹${totalExpense}`;



    const recentOrders =
        document.getElementById("recent-orders");

    recentOrders.innerHTML = "";


    orders.slice(0,5).forEach(order=>{

        const li =
            document.createElement("li");

        li.innerText =
            `${order.dress_type} - ${order.status}`;

        recentOrders.appendChild(li);

    });



    const pendingOrders =
        document.getElementById("pending-orders");

    pendingOrders.innerHTML = "";


    orders
    .filter(order => order.status.toLowerCase() === "pending")
    .forEach(order => {

        const li =
            document.createElement("li");

        li.innerText =
            order.dress_type;

        pendingOrders.appendChild(li);

    });


}


loadDashboard();