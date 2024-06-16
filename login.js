// Asynchronous function to fetch data from the API
async function fetchData() {
    let res = await fetch(`https://tesla-techies-038-3.onrender.com/users`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });
    let data = await res.json();
}

// Elements from the DOM
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

let loginUsername = document.getElementById("loginUsername");
let loginPassword = document.getElementById("loginPassword");
let loginButton = document.getElementById("loginButton");

// Function to parse URL parameters
function getQueryParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams;
}

// Show the correct form based on the query parameter
window.onload = () => {
    const params = getQueryParams();
    const formType = params.get("form");
    
    if (formType === "signup") {
        signupFormContainer.style.display = "block";
        loginFormContainer.style.display = "none";
    } else if (formType === "login") {
        loginFormContainer.style.display = "block";
        signupFormContainer.style.display = "none";
    } else {
        // Default view if no parameter or unknown parameter
        signupFormContainer.style.display = "block";
        loginFormContainer.style.display = "none";
    }
};

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

// Sign-up functionality
signupButton.addEventListener("click", async (e) => {
    let password=signupPassword.value;
    if(password.length>=4){
        
    }
    else{
        window.alert("Password length must be between 4 and 8 characters.");
        return;
    }
    if (naame.value === "" || signupUsername.value === "" || email.value === "" || contact.value === "" || signupPassword.value === "") {
        window.alert("All The Fields Are Required!");
    } else {
        let user = {
            name: naame.value,
            username: signupUsername.value,
            email: email.value,
            contact: contact.value,
            password: signupPassword.value
        };
        
        // Add new user and handle the response
        let isUserAdded = await addNewUser(user);
        
        // If user is successfully added, reset the signup form and switch to login form
        if (isUserAdded) {
            signupForm.reset();
            showLoginForm();
        }
    }
});

// Function to add a new user to the database
async function addNewUser(user) {
    let isSameUser = await checkAlreadyHaveAccountOrNot(user.username);
    
    if (isSameUser) {
        window.alert("User Already Exists. Go to Sign In");
        return false;
    } else {
        let res = await fetch(`https://tesla-techies-038-3.onrender.com/users`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        });
        let data = await res.json();
        return true;
    }
}

// Function to check if a user with the same username already exists
async function checkAlreadyHaveAccountOrNot(username) {
    let res = await fetch(`https://tesla-techies-038-3.onrender.com/users`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });
    let data = await res.json();

    return data.some(e => e.username === username);
}

// Function to show the login form
function showLoginForm() {
    signupFormContainer.style.display = "none";
    loginFormContainer.style.display = "block";
}

// Login functionality
loginButton.addEventListener("click", () => {
    if (loginUsername.value === "" || loginPassword.value === "") {
        window.alert("All fields are required");
    } else {
        let userCredentials = {
            username: loginUsername.value,
            password: loginPassword.value
        };
        checkUserExistance(userCredentials);
    }
});

// Function to check user existence and validate login
async function checkUserExistance(userCredentials) {
    let res = await fetch(`https://tesla-techies-038-3.onrender.com/users`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });
    let data = await res.json();

    let userFound = false;
    let passwordCorrect = false;
    let loggedUserId = 0;
    data.forEach((user) => {
        if (userCredentials.username === user.username) {
            userFound = true;
            if (userCredentials.password === user.password) {
                passwordCorrect = true;
                loggedUserId = user.id;
            }
        }
    });

    if (userFound && passwordCorrect) {
        localStorage.setItem("loggedUser", JSON.stringify(userCredentials));
        localStorage.setItem("loggedUserId", JSON.stringify(loggedUserId));
        function skipToLandingPage() {
            // Navigate to Page 3 and replace the current history entry for Page 2 with Page 1
            window.location.href = 'index2.html';
            history.replaceState(null, '', 'welcome.html'); // Replace Page 2 with Page 1 in history
        }
        skipToLandingPage();
        // window.location.href = "landingPage.html";
    } else if (userFound && !passwordCorrect) {
        window.alert("Incorrect Password");
    } else {
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