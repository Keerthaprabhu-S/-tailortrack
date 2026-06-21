async function loadTailors(){

const tailors = await fetchData("tailors");

const tbody =
document.querySelector("#tailors-table tbody");

tbody.innerHTML = "";

tailors.forEach(tailor=>{

tbody.innerHTML += `

<tr>

<td>${tailor.name}</td>

<td>${tailor.phone}</td>

<td>${tailor.specialization}</td>

</tr>

`;

});

}

loadTailors();