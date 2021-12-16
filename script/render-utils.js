export function renderPast(poll){
    const pollDiv = document.createElement(`div`);
    pollDiv.id = `pollDiv`;
    const pastQ = document.createElement(`h3`);
    pastQ.id = `pastQ`;
    pastQ.textContent = poll.query;


  
    const pollAnswers = {
        answerA: poll.answerA,
        answerB: poll.answerB
    };

    const pollNumbers = {
        voteA: poll.voteCountA,
        voteB: poll.voteCountB
    };


    const divAnswers = renderOption(pollAnswers, pollNumbers);

    pollDiv.prepend(pastQ, divAnswers);

    return pollDiv;
}

function renderOption(pollAnswers, pollNumbers){
    const answerContainer = document.createElement(`div`);
    answerContainer.id = `answerContainer`;

    const divA = document.createElement(`div`);
    divA.id = `divA`;
    const divB = document.createElement(`div`);
    divB.id = `divB`;

    const AA = document.createElement(`p`);
    AA.id = `AA`;
    const VA = document.createElement(`p`);
    VA.id = `VA`;
    const AB = document.createElement(`p`);
    AB.id = `AB`;
    const VB = document.createElement(`p`);
    VB.id = `VB`;

    AA.textContent = pollAnswers.answerA;
    VA.textContent = pollNumbers.voteA;
    AB.textContent = pollAnswers.answerB;
    VB.textContent = pollNumbers.voteB;


    divA.append(AA, VA);
    divB.append(AB, VB);

    answerContainer.append(divA, divB);
 
    return (answerContainer);
}