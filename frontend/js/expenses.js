async function loadExpenses(){

const expenses = await fetchData("expenses");

const tbody =
document.querySelector("#expenses-table tbody");

tbody.innerHTML = "";

expenses.forEach(expense=>{

tbody.innerHTML += `

<tr>

<td>${expense.category}</td>

<td>${expense.description}</td>

<td>₹${expense.amount}</td>

</tr>

`;

});

}

loadExpenses();