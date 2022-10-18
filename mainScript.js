
function validate(){
var username = document.getElementById("Username").value;
var password = document.getElementById("Password").value;
if ( username == "James" && password == "James"){
window.location = "MainPage.html"; // Redirecting to other page.
}
else{
document.getElementById("wrong-password").innerHTML=`<span class="wrong-password"> Invalid Username and Password </span>`;
}
}

function alertNumber(){
    return alert('Contact:  s.vijaikumara@gmail.com or Number: 7550341971')
}
