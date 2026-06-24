const API_URL =

"https://tailortrack-backend.onrender.com/api/auth/login/";


document

.getElementById(

"login-btn"

)

.addEventListener(

"click",

loginUser

);


async function loginUser(){


const username =

document

.getElementById(

"username"

)

.value

.trim();


const password =

document

.getElementById(

"password"

)

.value;


if(

!username ||

!password

){

alert(

"Fill all fields"

);

return;

}


try{


const response =

await fetch(

API_URL,

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:JSON.stringify({

username,

password

})

}

);


const data =

await response.json();


if(

data.success

){

localStorage.setItem(

"isLoggedIn",

"true"

);


window.location.href =

"index.html";

}

else{

alert(

"Invalid username or password"

);

}

}

catch(error){

console.log(

error

);

alert(

"Login failed"

);

}

}