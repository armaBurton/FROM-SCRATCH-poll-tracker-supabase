const SUPABASE_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUxMDExOCwiZXhwIjoxOTU1MDg2MTE4fQ.n_1ON3spG8iTfcVhhr5SVF_YVwK9zTLL2ChEvI1BSmY`;

const SUPABASE_URL = `https://fyyidslbegjzyojgpivl.supabase.co`;

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


export async function signUpUser(realEmail, realPassword){
    // const user = client.auth.user();
    console.log(`before sign up`, client.auth.user());

    // - consult the supabase docs to find:
    const response = await client.auth.signUp({
        email: realEmail,
        password: realPassword
    });

    console.log(`after sign up`, client.auth.user());
    
    return response.user;

}

export async function signInUser(email, password){
    const response = await client.auth.signIn({
        email,
        password
    });
    return response.user;
}

export async function redirectToGames() {
    if (await getUser()) {
        location.replace('./polls');
    }
}

export async function uploadPoll(pollObj){
    const response = await client
        .from(`pollTracker`)
        .insert([
            {
                query: pollObj.query,
                answerA: pollObj.answerA,
                answerB: pollObj.answerB,
                voteCountA: pollObj.voteCountA,
                voteCountB: pollObj.voteCountB,
                userid: pollObj.userID
            },
        ]);

    return response.data;
}

export async function getPolls(){
    const response = await client
        .from(`pollTracker`)
        .select();
    
    return response.data;
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function getUser() {
    return client.auth.session();
}

export async function redirectToPolls(){
    if (await getUser()){
        location.replace(`./poll`);
    }
}

export async function logOut() {
    await client.auth.signOut();

    return window.location.href = '/';
}

export function makePollObj(query, answerA, answerB, voteCountA, voteCountB){
    return {
        query,
        answerA,
        answerB,
        voteCountA,
        voteCountB,
        userID: client.auth.user().id
    };
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }