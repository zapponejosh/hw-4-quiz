## Landing 
    Show title and instructions
    Get started button
    View highscores button
    Timer prominent set to 0:00
    after clicking get started user enters in username for leaderboard
    store username in localstorage

## Quiz 

show quiz section

show status bar (1/10?)

start timer at 1:00 (?)

if timer is below 15 seconds flash red!

    show question one (get from questions.js)
    answer clicked get clicked class applied
    get answer and check
        if wrong display "wrong. you lose 10 seconds!"
        if correct display "correct!"
    store score in local storage
    hide question one and response
    increment status bar
**repeat above for each question**

after last question set status and show see results


## Final Page with results and highscores 
* get status from local storage
* if status shows complete show score, else show resume button and other high scores
* compare score with highscores - get score from local storage
(show results _if_ quiz has been taken)
* get username from localstorage
* show its ranking in a ordered list
