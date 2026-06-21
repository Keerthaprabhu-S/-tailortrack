async function loadOrders(){

const orders = await fetchData("orders");

const tbody =
document.querySelector("#orders-table tbody");

tbody.innerHTML = "";

orders.forEach(order=>{

tbody.innerHTML += `

<tr>

<td>${order.dress_type}</td>

<td>₹${order.amount}</td>

<td>${order.status}</td>

</tr>

`;

});

}

loadOrders();