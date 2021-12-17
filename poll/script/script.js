// import functions and grab DOM elements
import { renderPast } from './render-utils.js';
import { uploadPoll, getPolls, checkAuth, logOut, makePollObj } from '../../script/fetch-utils.js';
//grab incremental buttons
const upAButton = document.querySelector(`#up-a`);
const downAButton = document.querySelector(`#down-a`);
const upBButton = document.querySelector(`#up-b`);
const downBButton = document.querySelector(`#down-b`);

//grab form
const form = document.querySelector(`form`);

//grab close poll button
const closePollButton = document.querySelector(`#close-poll`);

//grab current poll elements
const currentQuery = document.querySelector(`#current-query`);
const currentResponseA = document.querySelector(`#cq-a`);
const currentResponseB = document.querySelector(`#cq-b`);
const countA = document.querySelector(`#count-a`);
const countB = document.querySelector(`#count-b`);

const logOutButton = document.querySelector(`.logout-button`);

logOutButton.addEventListener(`click`, () => {
    logOut();
});

checkAuth();


//grab past polls section
const pastPolls = document.querySelector(`.past-polls`);

// let state
let query = '';
let voteCountA = 0,
    voteCountB = 0,
    answerA = '',
    answerB = '';

//past polls array
// const pastPollsArr = [];

// set event listeners 
// get user input
// use user input to update state 
// update DOM to reflect the new state

upAButton.addEventListener(`click`, () => {
    voteCountA++;
    countA.textContent = voteCountA;
});

downAButton.addEventListener(`click`, () => {
    voteCountA--;
    countA.textContent = voteCountA;
});

upBButton.addEventListener(`click`, () => {
    voteCountB++;
    countB.textContent = voteCountB;
});

downBButton.addEventListener(`click`, () => {
    voteCountB--;
    countB.textContent = voteCountB;
});


//form eventListener
form.addEventListener(`submit`, (e) => {
    e.preventDefault();

    const data = new FormData(form);

    query = data.get(`query`);
    answerA = data.get(`response-a`);
    answerB = data.get(`response-b`);

    displayCurrentPoll();
    resetForm();
});

closePollButton.addEventListener(`click`, async(e) => {
    e.preventDefault();
    const pollObj = makePollObj();
    console.log(pollObj.userID);
    const userID = pollObj.userID;
    const pushPoll = await uploadPoll(pollObj);
    console.log(pushPoll);

    // pastPollsArr.push(pollObj);

    resetPoll();
    displayCurrentPoll();
    const getPastPolls = await getPolls();
  
    if (getPastPolls){
        displayAllPolls(getPastPolls, userID);
    }
    // displayAllPolls();
});

function displayCurrentPoll(){
    currentQuery.textContent = query;
    currentResponseA.textContent = answerA;
    currentResponseB.textContent = answerB;
    countA.textContent = voteCountA;
    countB.textContent = voteCountB;
}

// const SUPABASE_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUxMDExOCwiZXhwIjoxOTU1MDg2MTE4fQ.n_1ON3spG8iTfcVhhr5SVF_YVwK9zTLL2ChEvI1BSmY`;

// const SUPABASE_URL = `https://fyyidslbegjzyojgpivl.supabase.co`;

// const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// function makePollObj(query, answerA, answerB, voteCountA, voteCountB){
//     return {
//         query,
//         answerA,
//         answerB,
//         voteCountA,
//         voteCountB,
//         userID: client.auth.user().id
//     };
// }

function resetPoll(){
    query = 'No current poll';
    voteCountA = 0;
    voteCountB = 0;
    answerA = '';
    answerB = '';
}

function displayAllPolls(getPastPolls, userID){
    pastPolls.textContent = '';
    console.log(userID);
    for (let poll of getPastPolls){
        // if (poll.userID === userID){
            const holder = renderPast(poll);
            pastPolls.prepend(holder);
        // }
    }
}

function resetForm(){
    document.querySelector(`form`).reset();
}

window.addEventListener(`load`, async(e) => {
    e.preventDefault();

    const getPastPolls = await getPolls();
    if (getPastPolls){
        const pollObj = makePollObj();
        const userID = pollObj.userID;
        displayAllPolls(getPastPolls, userID);
    }
});