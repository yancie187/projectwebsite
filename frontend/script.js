function login(){

let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

let fixedUser = "noeladianes";
let fixedPass = "jepoyduday111";

if(user === fixedUser && pass === fixedPass){

alert("Login Successful!");

// redirect to landing page
window.location.href = "landing.html";

}
else{

document.getElementById("error").innerText =
"Invalid Username or Password";

}

}