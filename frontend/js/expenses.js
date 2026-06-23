let expensesData = [];

let editingId = null;


async function loadExpenses(){

    expensesData = await fetchData(

        "expenses"

    );

    renderExpenses(

        expensesData

    );

}


function renderExpenses(data){

    const tbody = document.querySelector(

        "#expenses-table tbody"

    );

    tbody.innerHTML = "";


    data.forEach(expense=>{

        tbody.innerHTML += `

        <tr>

            <td>${expense.description}</td>

            <td>₹${expense.amount}</td>

            <td>${expense.expense_date}</td>

            <td>

                <button

                class="edit-btn"

                onclick="editExpense(${expense.id})">

                Edit

                </button>


                <button

                class="delete-btn"

                onclick="deleteExpense(${expense.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}


async function addExpense(){

    const description =

        document.getElementById(

            "expense-description"

        ).value.trim();


    const amount =

        document.getElementById(

            "expense-amount"

        ).value;


    const expense_date =

        document.getElementById(

            "expense-date"

        ).value;


    if(

        !description ||

        !amount ||

        !expense_date

    ){

        alert(

            "Fill all fields"

        );

        return;

    }


    if(editingId){

        await updateData(

            "expenses",

            editingId,

            {

                description,

                amount,

                expense_date

            }

        );


        editingId = null;


        document.getElementById(

            "add-expense-btn"

        ).textContent =

        "+ Add Expense";

    }

    else{

        await createData(

            "expenses",

            {

                description,

                amount,

                expense_date

            }

        );

    }


    clearForm();

    loadExpenses();

}


function editExpense(id){

    const expense =

        expensesData.find(

            e=>e.id===id

        );


    if(!expense){

        return;

    }


    editingId = id;


    document.getElementById(

        "expense-description"

    ).value = expense.description;


    document.getElementById(

        "expense-amount"

    ).value = expense.amount;


    document.getElementById(

        "expense-date"

    ).value = expense.expense_date;


    document.getElementById(

        "add-expense-btn"

    ).textContent =

    "Update Expense";

}


async function deleteExpense(id){

    const confirmDelete = confirm(

        "Delete this expense?"

    );


    if(!confirmDelete){

        return;

    }


    await deleteData(

        "expenses",

        id

    );


    editingId = null;

    clearForm();

    loadExpenses();

}


function clearForm(){

    document.getElementById(

        "expense-description"

    ).value = "";


    document.getElementById(

        "expense-amount"

    ).value = "";


    document.getElementById(

        "expense-date"

    ).value = "";

}


document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        document

        .getElementById(

            "add-expense-btn"

        )

        .addEventListener(

            "click",

            addExpense

        );


        document

        .getElementById(

            "expense-search"

        )

        .addEventListener(

            "input",

            function(){

                const keyword =

                    this.value

                    .toLowerCase();


                const filtered =

                    expensesData.filter(

                        expense=>

                        expense.description

                        .toLowerCase()

                        .includes(keyword)

                    );


                renderExpenses(

                    filtered

                );

            }

        );


        loadExpenses();

    }

);