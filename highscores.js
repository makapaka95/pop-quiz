const highScoresList = document.getElementById('highScoreList')
let users = JSON.parse(localStorage.getItem('users')) || [];

let highScores = [...users].sort((a, b) => b.score - a.score)

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join(' ');

