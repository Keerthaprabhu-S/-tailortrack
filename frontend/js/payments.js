async function loadPayments(){

const payments = await fetchData(

"payments"

);

const tbody =

document.querySelector(

"#payments-table tbody"

);

tbody.innerHTML = "";


payments.forEach(payment=>{

tbody.innerHTML += `

<tr>

<td>

${payment.customer_name}

</td>

<td>

${payment.dress_type}

</td>

<td>

₹${payment.amount_paid}

</td>

<td>

${payment.payment_method}

</td>

<td>

${payment.paid_on}

</td>

</tr>

`;

});

}

loadPayments();