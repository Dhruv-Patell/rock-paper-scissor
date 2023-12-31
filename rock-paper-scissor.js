let isAutoPlaying = false;
let intervalId;

let score = JSON.parse(localStorage.getItem('score')) || {
    myScore: 0,
    compScore: 0,
    ties: 0
};

function resetValues() {
    score.myScore = 0; 
    score.compScore = 0;
    score.ties = 0;
    updateScoreElement();
    document.querySelector('.js-move-chosen').innerHTML = `Let's start again`;
    document.querySelector('.js-result').innerHTML = `Reset`;
    localStorage.removeItem('score');
}

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(function() {
            let ranDomMove = Math.random();
            ranDomMove *= 3;
            const myMove = (ranDomMove < 1 ? 'rock': (ranDomMove < 2 ? 'paper' : 'scissors')); 
            pickMove(myMove);
        }, 1000);
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

function updateScoreElement() {
    document.querySelector('.js-scores').innerHTML = `Results are: Player: ${score.myScore}, Computer: ${score.compScore}, Tie: ${score.ties}`;
}

function updateResult() {
    document.querySelector('.js-result').innerHTML = `You Results are: Player: ${score.myScore}, Computer: ${score.compScore}, Tie: ${score.ties}`;
}

function pickMove(myMove) {
    let randomNumber = Math.random();
    randomNumber *= 3; 
    compMove = (randomNumber < 1 ? 'rock': (randomNumber < 2 ? 'paper' : 'scissors'));
    let resultElement = document.querySelector('.js-result');
    document.querySelector('.js-move-chosen').innerHTML = `You
    <img src="images/${myMove}-emoji.png" class="pic-emoji">
    <img src="images/${compMove}-emoji.png" class="pic-emoji">
    Computer`;

    if (compMove === myMove) {
        score.ties++;
        resultElement.innerHTML = `Tie`;
    }
    else if ((compMove === 'rock' && myMove === 'paper') ||
        (compMove === 'paper' && myMove === 'scissors') ||
        (compMove === 'scissors' && myMove === 'rock')) {
        resultElement.innerHTML = `You Win`;
        score.myScore++;
    }
    else if ((compMove === 'rock' && myMove === 'scissors') ||
        (compMove === 'paper' && myMove === 'rock') ||
        (compMove === 'scissors' && myMove === 'paper')) {
        resultElement.innerHTML = `You Lose`;
        score.compScore++;
    }
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
}
