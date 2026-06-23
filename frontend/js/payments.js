function formatDate(date){

const d = new Date(date);

const day =

String(d.getDate())

.padStart(2,"0");


const month =

String(d.getMonth()+1)

.padStart(2,"0");


const year =

d.getFullYear();


return `${day}-${month}-${year}`;

}



let paymentsData = [];

let ordersData = [];

let customersData = [];

let editingId = null;



async function loadCustomers(){

customersData = await fetchData(

"customers"

);

}



async function loadOrders(){

ordersData = await fetchData(

"orders"

);

renderDropdown(

ordersData

);

}



function renderDropdown(data){

const select =

document.getElementById(

"payment-order"

);


select.innerHTML =

'<option value="">Select Order</option>';


data.forEach(order=>{


const customer =

customersData.find(

c=>c.id===order.customer

);


select.innerHTML += `

<option value="${order.id}">

${customer ? customer.name : "Unknown"}

-

${order.dress_type}

-

${formatDate(order.order_date)}

</option>

`;

});

}



async function loadPayments(){

paymentsData = await fetchData(

"payments"

);


renderPayments(

paymentsData

);

}



function renderPayments(data){

const tbody =

document.querySelector(

"#payments-table tbody"

);


tbody.innerHTML = "";


data.forEach(payment=>{


const order =

ordersData.find(

o=>o.id===payment.order

);


const customer =

order

?

customersData.find(

c=>c.id===order.customer

)

: null;


tbody.innerHTML += `

<tr>

<td>

${customer ? customer.name : "Unknown"}

-

${order ? order.dress_type : ""}

-

${order ? formatDate(order.order_date) : ""}

</td>

<td>

₹${payment.total_amount}

</td>

<td>

₹${payment.paid_amount}

</td>

<td>

₹${payment.remaining_balance}

</td>

<td>

${payment.payment_method}

</td>

<td>

${formatDate(payment.paid_on)}

</td>

<td>

<button

class="edit-btn"

onclick="editPayment(${payment.id})"

>

Edit

</button>


<button

class="delete-btn"

onclick="deletePayment(${payment.id})"

>

Delete

</button>

</td>

</tr>

`;

});

}



async function addPayment(){

const order =

document.getElementById(

"payment-order"

).value;


const total_amount =

document.getElementById(

"payment-total"

).value;


const paid_amount =

document.getElementById(

"payment-paid"

).value;


const payment_method =

document.getElementById(

"payment-method"

).value;


const paid_on =

document.getElementById(

"payment-date"

).value;


if(

!order ||

!total_amount ||

!paid_amount ||

!paid_on

){

alert(

"Fill all fields"

);

return;

}


const data = {

order,

total_amount,

paid_amount,

payment_method,

paid_on

};


if(editingId){

await updateData(

"payments",

editingId,

data

);


editingId = null;


document.getElementById(

"add-payment-btn"

).textContent =

"+ Add Payment";

}

else{

await createData(

"payments",

data

);

}


clearForm();

await loadPayments();

}



function editPayment(id){

const payment =

paymentsData.find(

p=>p.id===id

);


if(!payment){

return;

}


editingId = id;


document.getElementById(

"payment-order"

).value = payment.order;


document.getElementById(

"payment-total"

).value = payment.total_amount;


document.getElementById(

"payment-paid"

).value = payment.paid_amount;


document.getElementById(

"payment-method"

).value = payment.payment_method;


document.getElementById(

"payment-date"

).value = payment.paid_on;


document.getElementById(

"add-payment-btn"

).textContent =

"Update Payment";

}



async function deletePayment(id){

const confirmDelete = confirm(

"Delete this payment?"

);


if(!confirmDelete){

return;

}


await deleteData(

"payments",

id

);


await loadPayments();

}



function clearForm(){

document.getElementById(

"payment-order"

).value = "";


document.getElementById(

"payment-total"

).value = "";


document.getElementById(

"payment-paid"

).value = "";


document.getElementById(

"payment-date"

).value = "";

}



document.addEventListener(

"DOMContentLoaded",

async ()=>{


await loadCustomers();


await loadOrders();


await loadPayments();


document

.getElementById(

"add-payment-btn"

)

.addEventListener(

"click",

addPayment

);


document

.getElementById(

"payment-search"

)

.addEventListener(

"input",

function(){


const keyword =

this.value

.toLowerCase();


const filtered =

ordersData.filter(

order=>{


const customer =

customersData.find(

c=>c.id===order.customer

);


return(

(customer &&

customer.name

.toLowerCase()

.includes(keyword))

||

order.dress_type

.toLowerCase()

.includes(keyword)

);

}

);


renderDropdown(

filtered

);

}

);

}

);