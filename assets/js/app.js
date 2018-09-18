'use strict';

let game = {

    // Parameters
    correct: 0,
    incorrect: 0,
    time: 10,
    timer: '',
    questionNumber: 0,

    // Methods
    decreaseTime: () => {
        $('#timeRemaining').text(`Time Remaining: ${game.time}`)
        game.time--

        // Stop the timer from running pass 0
        if (game.time === -1){
            game.stopTimer(game.timer)
            game.resetTime()
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

        if (game.questionNumber === 4){
            console.log(`end of game`)
            // Display results
            setTimeout(game.displayResults, 2000)
        }
        
        else {
            // New questions and timer
            setTimeout(game.display, 4000)
            setTimeout(game.startTimer, 4000)
        }
    },

    resetTime: () => {
        game.time = 10;
    },

    resetGame: () => {  
        game.correct = 0
        game.incorrect = 0
        game.resetTime()
    },

    display: () => {
        
        // Clear Choices
        $('#choices').empty()

        $('#question').text(Object.entries(triviaQuestions)[game.questionNumber][1].question)
        Object.entries(triviaQuestions)[game.questionNumber][1].choices.forEach(value => {
            $('#choices').append(`<p> ${value}`)
        })
        
    },

    displayResults: () => {
        $('#question').empty()
        $('#choices').empty()
        $('#question').html(`
        <h1> Number of answers correct: ${game.correct}
        <h1> Number of answers incorrect: ${game.incorrect}`)
    }

}

let triviaQuestions = {
    q1: {
        question: "On initial listen, you may have thought 'Panda' was performed by which artist?",
        choices: ['Big Sean', 'Future', 'Desiigner', 'Lil Pump'],
        answer: 'Desiigner'
    },
    q2: {
        question: "Drake wore a jersey supporting this NBA All-Star in his new video 'In My Feelings' ",
        choices: ['Damian Lillard', 'Lebron James', 'Kevin Durant', 'Demarcus Cousins'],
        answer: ''
    },
    q3: {
        question: "question 3",
        choices: ['', '', '', ''],
        answer: ''
    },
    q4: {
        question: "I-N-D-E-P-E-N-D-E-N-T, do you know what that mean was sung by who?",
        choices: ['Webbie', 'Boosie', 'Juvenille', 'Young Thug'],
        answer: 'Webbie'
    },
}

// When page Loads
$(document).ready(function() {

    game.startTimer()
    game.display()
    

})