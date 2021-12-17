// import functions and grab DOM elements
import { signUpUser, signInUser, redirectToPolls } from './fetch-utils.js';

const signInForm = document.getElementById('sign-in');
const signInEmail = document.getElementById('sign-in-email');
const signInPassword = document.getElementById('sign-in-password');

const signUpForm = document.getElementById('sign-up');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');

//if signed in redirect to polls
// redirectToPolls();

signUpForm.addEventListener('submit', async(event)=>{
    event.preventDefault();

    const data = new FormData(signUpForm);
    const email = data.get(`email`);
    const password = data.get(`password`);
    console.log(email, password);

    const user = await signUpUser(email, password);
    console.log(user.id, user.email);
    console.log(user);

    window.location.href = `./poll`;
});

signInForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const user = await signInUser(signInEmail.value, signInPassword.value);
    
    if (user){
        console.log(user);
        redirectToPolls();
        // window.location.href = `./poll`;
    }
});
