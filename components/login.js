async function fetchData() {
    let res = await fetch(`https://tesla-techies-038-3.onrender.com/users`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });
    let data = await res.json();
    
}

let signInStatus=JSON.parse(localStorage.getItem("signInStatus"));
let signUpStatus=JSON.parse(localStorage.getItem("signUpStatus"));
console.log(signInStatus);
console.log(signUpStatus);

let naame = document.getElementById("name");
let signupUsername = document.getElementById("signupUsername");
let email = document.getElementById("email");
let contact = document.getElementById("contact");
let signupPassword = document.getElementById("signupPassword");
let signupButton = document.getElementById("signupButton");
let signupForm = document.getElementById("signupForm");

let loginFormContainer = document.getElementById("loginFormContainer");
let signupFormContainer = document.getElementById("signupFormContainer");

let showLoginFormLink = document.getElementById("showLoginForm");
let showSignupFormLink = document.getElementById("showSignupForm");

let loginUsername=document.getElementById("loginUsername");
let loginPassword=document.getElementById("loginPassword");
let loginButton=document.getElementById("loginButton");

signupButton.addEventListener("click", async (e) => {
    

    if(naame.value===""||signupUsername.value===""||email.value===""||contact.value===""||signupPassword.value===""){
        window.alert("All The Fields Are Required!");
    }
    else{
        let user = {
            name: naame.value,
            username: signupUsername.value,
            email: email.value,
            contact: contact.value,
            password: signupPassword.value
        };
        await addNewUser(user);
        fetchData();
        signupForm.reset();
        toggleForms();
    }
});

async function addNewUser(user) {
    let isSameUser=await checkAlreadyHaveAccountOrNot(user.username);
    
    if(isSameUser===true){
        window.alert("User Already Exist. Go to signIn");
    }
    else{
    
        let res = await fetch(`https://tesla-techies-038-3.onrender.com/users`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        });
        let data = await res.json();
    
    }
}

// Toggle visibility between signup and login forms
function toggleForms() {
    if (signupFormContainer.style.display === "none") {
        signupFormContainer.style.display = "block";
        loginFormContainer.style.display = "none";
    } else {
        signupFormContainer.style.display = "none";
        loginFormContainer.style.display = "block";
    }
}

// Event listeners for switching between forms
showLoginFormLink.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default link behavior
    signupFormContainer.style.display = "none";
    loginFormContainer.style.display = "block";
});

showSignupFormLink.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default link behavior
    loginFormContainer.style.display = "none";
    signupFormContainer.style.display = "block";
});

loginButton.addEventListener("click",()=>{
    if(loginUsername.value===""||loginPassword.value===""){
        window.alert("All fields are required");
    }
    else{
        let userCredentials={
            username:loginUsername.value,
            password:loginPassword.value
        }
        let logedUser=JSON.parse(localStorage.getItem("logedUser"))||{};
        logedUser={...userCredentials};
        console.log(logedUser);
        localStorage.setItem(JSON.stringify("logedUser",JSON.stringify(userCredentials)));
        checkUserExistance(userCredentials);
        // let isSignedUpUser=alreadySignedUpOrNot(userCredentials);
    }
})

async function checkAlreadyHaveAccountOrNot(username){
    let res=await fetch(`https://tesla-techies-038-3.onrender.com/users`,{
        method: "GET",
        headers:{
            "Content-type":"application/json"
        }
    })
    let data=await res.json();

    let sameUser=false;
    data.forEach((e)=>{
        if(e.username===username){
            sameUser=true;
        }
    })
    return sameUser;
}

async function checkUserExistance(userCredentials){
    let res=await fetch(`https://tesla-techies-038-3.onrender.com/users`,{
        method: "GET",
        headers:{
            "Content-type":"application/json"
        }
    })
    let data=await res.json();

    let userFound = false;
    let passwordCorrect = false;
    data.forEach((user) => {
        if (userCredentials.username === user.username) {
            userFound = true;
            if (userCredentials.password === user.password) {
                passwordCorrect = true;
            }
        }
    });

    // Handle the alerts based on the flags
    if (userFound && passwordCorrect) {
        window.alert("Login successful!");
        // Redirect to another page or perform any other actions needed after successful login
        window.location.href = "landingPage.html";
    } else if (userFound && !passwordCorrect) {
        window.alert("Incorrect Password");
    } else if (!userFound) {
        window.alert("Incorrect Username");
    }
}

// async function alreadySignedUpOrNot(userCredentials){
//     let res=await fetch(`https://tesla-techies-038-3.onrender.com/users`,{
//         method:"GET",
//         headers:{
//             "Content-type":"application/json"
//         }
//     })
//     let data=await res.json();
//     
//     isSignUpUser=false;
//     data.forEach((e)=>{
//         if(e.username===userCredentials.username){
//             isSignUpUser=true;
//         }
//     })
//     
//     return isSignUpUser;
// }



// let removeUser=document.getElementById("removeUser");

// async function deleteUser(id){
//     let res=await fetch(`https://tesla-techies-038-3.onrender.com/users/${id}`,{
//         method:"DELETE"
//     })
//     let data=await res.json();
//     
//     fetchData();
// }

// removeUser.addEventListener("click",()=>{
//     deleteUser(3);
// })