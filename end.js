const finalScore = document.getElementById('finalScore')
let users = JSON.parse(localStorage.getItem('users'))

finalScore.innerText = `Your score is ${users[users.length-1].score}`

