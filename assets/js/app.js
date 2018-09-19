'use strict';
const guessTime = 20

let game = {

    // Parameters
    correct: 0,
    incorrect: 0,
    time: guessTime,
    timer: '',
    questionNumber: 0,
    playerChoice: '',

    // Methods
    decreaseTime: () => {
        $('#timeRemaining').text(`Time Remaining: ${game.time}`)
        game.time--

        if (game.time < 10) {
            $('#timeRemaining').attr('style', 'color: red;')
        }

        // Stop the timer from running pass 0
        if (game.time === -1){
            game.stopTimer(game.timer)
            game.resetTime()
            $('#question').empty()
            $('#choices').empty()
            $('#timeRemaining').removeAttr('style')
            game.incorrect++
        }
    },

    // Start the timer
    startTimer: () => {
        game.timer = setInterval(game.decreaseTime, 1000)
    },

    // Stop the timer
    stopTimer: function(timer) {
        clearInterval(timer)
        game.questionNumber++

        if (game.questionNumber === Object.keys(triviaQuestions).length){
            // Display results
            setTimeout(game.displayResults, 2000)
        }
        
        else {
            // New questions and timer
            setTimeout(game.display, 4000)
            setTimeout(game.startTimer, 4000)
        }
    },

    showStart: () => {

        // Clear Trivia box
        $('#timeRemaining').hide()
        $('#question').hide()
        $('#choices').hide()

        $('#start').html(`<button style="background-color: black; margin-top: 20px"> Start Game`)

    },

    startGame: () => {
        $('#timeRemaining').show()
        $('#question').show()
        $('#choices').show()
        $('#start').hide()
        game.startTimer()
        game.display()
    },

    resetTime: () => {
        game.time = guessTime;
    },

    resetGame: () => {  
        game.correct = 0
        game.incorrect = 0
        game.questionNumber = 0
        game.resetTime()
        game.startGame()
    },

    display: () => {
        
        // Clear Choices
        $('#choices').empty()

        $('#question').text(Object.entries(triviaQuestions)[game.questionNumber][1].question)
        Object.entries(triviaQuestions)[game.questionNumber][1].choices.forEach(value => {
            $('#choices').append(`<p class="playerchoice"> ${value}`)
        })
        
    },

    // End game results
    displayResults: () => {
        $('#question').empty() 
        $('#choices').empty()
        $('#question').html(`
        <h1> Number of answers correct: ${game.correct}
        <h1> Number of answers incorrect: ${game.incorrect}`)
        $('#reset').html(`<button style="background-color: black; margin-top: 20px"> PLay Again?`)

    },

    checkAnswer: (playerChoice) => {
        if (playerChoice === Object.entries(triviaQuestions)[game.questionNumber][1].answer){
            $('#question').empty()
            $('#choices').empty()
            $('#choices').html(`<h1> Good job! Get ready for the next!`)
            $('#timeRemaining').removeAttr('style')
            game.time = 3
            game.correct++
            game.incorrect--
        }
        else {
            $('#question').empty()
            $('#choices').empty()
            $('#choices').html(`<h1> Sorry, better luck next time!`)
            $('#timeRemaining').removeAttr('style')
            game.time = 3
        }
    },

}

let triviaQuestions = {
    q1: {
        question: "On initial listen, you may have thought 'Panda' was performed by which artist?",
        choices: ['Big Sean', 'Future', 'Desiigner', 'Lil Pump'],
        answer: 'Future'
    },
    q2: {
        question: "Drake wore a jersey supporting this NBA All-Star in his new video 'In My Feelings' ",
        choices: ['Damian Lillard', 'Lebron James', 'Kevin Durant', 'Demarcus Cousins'],
        answer: 'Demarcus Cousins'
    },
    q3: {
        question: "Hey ___________ you want to come outside?",
        choices: ['Chance', 'Quavo', 'Pierre', 'Donald'],
        answer: 'Pierre'
    },
    q4: {
        question: "I-N-D-E-P-E-N-D-E-N-T, do you know what that mean was sung by who?",
        choices: ['Webbie', 'Boosie', 'Juvenille', 'Young Thug'],
        answer: 'Webbie'
    },
}

// When page Loads
$(document).ready(function() {

    game.showStart();

    // Start Game button
    $('#start').click(() => {
        game.startGame();
    })

    // Select choices from the player
    $('#choices').click((event) => {
        game.playerChoice = $(event.target).text().trim()
        game.checkAnswer(game.playerChoice)
    })

    // Play Again Button
    $('#reset').click(() => {
        game.resetGame();
    })

    
    
})