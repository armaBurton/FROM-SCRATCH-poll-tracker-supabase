# Sign up / sign in page

## HTML setup
- Sign up
  - form: username input, password input and button
- Sign in
  - form: username input, password input and button

## Events
### Login / sign in
  - Once the user hits submit on the form . . .
  - get the username and password from the form (`new FormData(form)`)
  - "log in the user"
    - consult the supabase docs to find:
```js 
  const response = await client.auth.signIn({
  email: 'example@email.com',
  password: 'example-password',
})
```
- redirect the user to the protected page with their data

### Sign up
  - Once the user hits submit on the form . . .
  - get the username and password from the form (`new FormData(form)`)
  - "log in the user"
    - consult the supabase docs to find:
```js 
  const response = await client.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})
```
- redirect the user to the protected page with their data

## Polls Page

### HTML Setup
- Form for our new poll
- Buttons to add and subtract votes
- A div to inject current poll into
- A div to inject past polls into

### Event
- on load, 
  - go fetch all this user's past polls 
  - display them
- On click vote
  - increment the state of the vote for that option,
  - then display the change
- On submit add question and options button
  - grab the DOM for the current poll, then inject the question and options into those DOM elements
- On click of Finish Poll
  - Take the current poll state and add it to past polls IN SUPABASE!!!
  - Re-fetch the polls from supabase and redisplay the list (clear the list in the DOM, render, and append)

![](./assets/supa-rls-1.png)
![](./assets/supa-rls-2.png)


| User should be able to . . .                                                         |             |
| :----------------------------------------------------------------------------------- | ----------: |
| Visit the deployed pages on GitHub pages, with link in the About section of the Github repo|        1 |

| Events  `                                                                            |             |
| :----------------------------------------------------------------------------------- | ----------: |
| On the home page (`'/'`), Login and Signup using the login and signup form. On success, redirect to the `/polls` page   |        2 |
| Logout by clicking the logout button                                                       |        1 |
| If a non-logged-in user tries to visit the polls page, redirect them to the login page | 1 |
| On the polls page load, see a form and empty current poll div                              |        2 |
| On the polls page load, fetch all past polls and render them to the past polls div         |        2 |
| On submit, add the poll options and question to the current poll div.  Use the `displayCurrentPollEl` function to do this                                   |        1 |
| On clicking add increment the correct votes in the current poll div. Use the `displayCurrentPollEl` function to do this. |     1 |
| On clicking finish, empty the current poll div, and use supabase to add the current poll to the database. |1|
| On clicking finish, clear the past polls div, then fetch all past polls from supabase and render them in the past polls div. Do this in a function called `displayAllPolls` |2|

| Functions                                                              |             |
| :----------------------------------------------------------------------------------- | ----------: |
| IMPURE: `displayCurrentPollEl()` : displays the current poll state to the current poll DOM element | 1|
| IMPURE: `displayAllPolls()` : clears out and appends to polls div | 1|
| PURE (stretch: with TDD): `renderPoll(poll)` : returns DOM node | 1|
| ASYNC (stretch: with TDD): `createPoll(poll)` : creates a poll for currently logged in user in supabase |1|
| ASYNC (stretch: with TDD): `getPolls()` : returns polls for currently logged in user from supabase |1|