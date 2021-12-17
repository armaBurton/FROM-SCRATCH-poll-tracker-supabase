import './example.test.js';
import { renderPoll } from '../poll/script/render-utils.js';
import { getPolls, uploadPoll } from '../script/fetch-utils.js';

const test = QUnit.test;

const poll = {
    query: '',
    answerA: '',
    answerB: '',
    voteCountA: '',
    voteCountB: '',
};

test('testing renderPoll()', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = '<div id="pollDiv"><h3 id="pastQ"></h3><div id="answerContainer"><div id="divA"><p id="AA"></p><p id="VA"></p></div><div id="divB"><p id="AB"></p><p id="VB"></p></div></div></div>';
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderPoll(poll);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});

test('testing uploadPoll()', async(expect) => {
    // expect.preventDefault();
    //Arrange
    // Set up your arguments and expectations

    const expected = typeof [];
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = typeof uploadPoll();

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual, expected);
});

test('testing getPolls()', async(expect) => {
    // expect.preventDefault();
    //Arrange
    // Set up your arguments and expectations

    const expected = typeof [];
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = typeof getPolls();

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual, expected);
});