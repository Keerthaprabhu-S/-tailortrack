function formatDate(date){

const d = new Date(date);

const day = String(d.getDate()).padStart(2,"0");

const month = String(d.getMonth()+1).padStart(2,"0");

const year = d.getFullYear();

return `${day}-${month}-${year}`;

}
let ordersData = [];

let customersData = [];

let editingId = null;



async function loadCustomers() {

customersData = await fetchData(

"customers"

);


const select =

document.getElementById(

"order-customer"

);


select.innerHTML =

'<option value="">Select Customer</option>';


customersData.forEach(customer => {

select.innerHTML += `

<option value="${customer.id}">

${customer.name}

</option>

`;

});

}



async function loadOrders() {

ordersData = await fetchData(
"orders"
);

const statusOrder = {

pending:1,

stitching:2,

ready:3,

delivered:4

};


ordersData.sort(

(a,b)=>{

if(

statusOrder[a.status]

!==

statusOrder[b.status]

){

return (

statusOrder[a.status]

-

statusOrder[b.status]

);

}


return (

new Date(a.delivery_date)

-

new Date(b.delivery_date)

);

}

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


const customer =

customersData.find(

c => c.id === order.customer

);


tbody.innerHTML += `

<tr>

<td>

${customer ? customer.name : "Unknown"}

</td>

<td>

${order.dress_type}

</td>

<td>

${formatDate(order.order_date)}

</td>

<td>

${formatDate(order.delivery_date)}

</td>

<td>

<select

class="status-select"

onchange="changeStatus(${order.id},this.value)"

>

<option

value="pending"

${order.status==="pending" ? "selected" : ""}

>

Pending

</option>

<option

value="stitching"

${order.status==="stitching" ? "selected" : ""}

>

Stitching

</option>

<option

value="ready"

${order.status==="ready" ? "selected" : ""}

>

Ready

</option>

<option

value="delivered"

${order.status==="delivered" ? "selected" : ""}

>

Delivered

</option>

</select>

</td>

<td>

<button

class="edit-btn"

onclick="editOrder(${order.id})"

>

Edit

</button>


<button

class="delete-btn"

onclick="deleteOrder(${order.id})"

>

Delete

</button>

</td>

</tr>

`;

});

}



async function addOrder() {

const customer =

document.getElementById(

"order-customer"

).value;


const dress_type =

document.getElementById(

"order-dress"

).value.trim();


const order_date =

document.getElementById(

"order-date"

).value;


const delivery_date =

document.getElementById(

"delivery-date"

).value;


const notes =

document.getElementById(

"order-notes"

).value.trim();


if(

!customer ||

!dress_type ||

!order_date ||

!delivery_date

){

alert(

"Fill all fields"

);

return;

}


const data = {

customer,

dress_type,

order_date,

delivery_date,

notes,

status:"pending"

};


if(editingId){

await updateData(

"orders",

editingId,

data

);


editingId = null;


document.getElementById(

"add-order-btn"

).textContent =

"+ Add Order";

}

else{

await createData(

"orders",

data

);

}


clearForm();

await loadOrders();

}



function editOrder(id){

const order =

ordersData.find(

o => o.id === id

);


if(!order){

return;

}


editingId = id;


document.getElementById(

"order-customer"

).value = order.customer;


document.getElementById(

"order-dress"

).value = order.dress_type;


document.getElementById(

"order-date"

).value = order.order_date;


document.getElementById(

"delivery-date"

).value = order.delivery_date;


document.getElementById(

"order-notes"

).value = order.notes;


document.getElementById(

"add-order-btn"

).textContent =

"Update Order";

}



async function deleteOrder(id){

const confirmDelete = confirm(

"Delete this order?"

);


if(!confirmDelete){

return;

}


await deleteData(

"orders",

id

);


await loadOrders();

}



async function changeStatus(id,status){

const order =

ordersData.find(

o => o.id === id

);


if(!order){

return;

}


await updateData(

"orders",

id,

{

customer:order.customer,

dress_type:order.dress_type,

order_date:order.order_date,

delivery_date:order.delivery_date,

notes:order.notes,

status:status

}

);


await loadOrders();

}



function clearForm(){

document.getElementById(

"order-customer"

).value = "";


document.getElementById(

"order-dress"

).value = "";


document.getElementById(

"order-date"

).value = "";


document.getElementById(

"delivery-date"

).value = "";


document.getElementById(

"order-notes"

).value = "";

}



document.addEventListener(

"DOMContentLoaded",

async ()=>{


await loadCustomers();


await loadOrders();


document

.getElementById(

"add-order-btn"

)

.addEventListener(

"click",

addOrder

);


document

.getElementById(

"order-search"

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

order.dress_type

.toLowerCase()

.includes(keyword)

||

(customer &&

customer.name

.toLowerCase()

.includes(keyword))

);

}

);


renderOrders(

filtered

);

}

);

}

);