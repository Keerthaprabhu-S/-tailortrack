async function loadCustomers(){

const customers = await fetchData("customers");

const tbody =
document.querySelector("#customers-table tbody");

tbody.innerHTML = "";

customers.forEach(customer=>{

tbody.innerHTML += `

<tr>

<td>${customer.name}</td>

<td>${customer.phone}</td>

<td>${customer.address}</td>

</tr>

`;

});

}

loadCustomers();