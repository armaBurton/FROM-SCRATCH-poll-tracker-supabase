// import functions and grab DOM elements
import { renderPoll } from './render-utils.js';
import { getPolls, checkAuth, logOut, makePollObj, uploadPoll } from '../../script/fetch-utils.js';
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

    displayCurrentPollEl();
    resetForm();
});

closePollButton.addEventListener(`click`, async(e) => {
    e.preventDefault();
    const pollObj = makePollObj(query, answerA, answerB, voteCountA, voteCountB);
    uploadPoll(pollObj);
    console.log(pollObj);

    setTimeout(resetPoll(), 500);
    
    displayCurrentPollEl();
    const getPastPolls = await getPolls();
  
    if (getPastPolls){
        displayAllPolls(getPastPolls);
    }
    // displayAllPolls();
});

function displayCurrentPollEl(){
    currentQuery.textContent = query;
    currentResponseA.textContent = answerA;
    currentResponseB.textContent = answerB;
    countA.textContent = voteCountA;
    countB.textContent = voteCountB;
}

function resetPoll(){
    query = 'No current poll';
    voteCountA = 0;
    voteCountB = 0;
    answerA = '';
    answerB = '';
}

function displayAllPolls(getPastPolls){
    pastPolls.textContent = '';
    for (let poll of getPastPolls){
        const holder = renderPoll(poll);
        pastPolls.prepend(holder);
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