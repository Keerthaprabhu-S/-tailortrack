async function loadDashboard() {

try {

const customers =
await fetchData("customers");

const orders =
await fetchData("orders");

const payments =
await fetchData("payments");

const expenses =
await fetchData("expenses");


document.getElementById(
"customer-count"
).innerText = customers.length;


document.getElementById(
"order-count"
).innerText = orders.length;



let revenue = 0;

payments.forEach(payment=>{

revenue += Number(
payment.amount_paid || 0
);

});


document.getElementById(
"revenue-count"
).innerText = `₹${revenue}`;



let totalExpense = 0;

expenses.forEach(expense=>{

totalExpense += Number(
expense.amount || 0
);

});


document.getElementById(
"expense-count"
).innerText = `₹${totalExpense}`;



/* Status cards */

const pending =

orders.filter(order=>

order.status === "pending"

).length;


const stitching =

orders.filter(order=>

order.status === "stitching"

).length;


const ready =

orders.filter(order=>

order.status === "ready"

).length;


const delivered =

orders.filter(order=>

order.status === "delivered"

).length;



document.getElementById(

"pending-count"

).innerText = pending;


document.getElementById(

"stitching-count"

).innerText = stitching;


document.getElementById(

"ready-count"

).innerText = ready;


document.getElementById(

"delivered-count"

).innerText = delivered;



/* Recent Orders */

const recentOrders =

document.getElementById(

"recent-orders"

);

recentOrders.innerHTML = "";


orders.slice(0,5)

.forEach(order=>{

recentOrders.innerHTML += `

<li>

${order.dress_type}

-

${order.status}

</li>

`;

});



/* Pending Orders */

const pendingOrders =

document.getElementById(

"pending-orders"

);

pendingOrders.innerHTML = "";


orders

.filter(order=>

order.status ===

"pending"

)

.forEach(order=>{

pendingOrders.innerHTML += `

<li>

${order.dress_type}

</li>

`;

});



/* Today's Deliveries */

const todayDeliveries =

document.getElementById(

"today-deliveries"

);

todayDeliveries.innerHTML = "";


const today =

new Date()

.toISOString()

.split("T")[0];


const deliveries =

orders.filter(order=>

order.delivery_date

=== today

);



if(deliveries.length===0){

todayDeliveries.innerHTML =

"<li>No deliveries today</li>";

}

else{

deliveries.forEach(order=>{

todayDeliveries.innerHTML += `

<li>

${order.dress_type}

</li>

`;

});

}

}

catch(error){

console.log(error);

}

}

loadDashboard();