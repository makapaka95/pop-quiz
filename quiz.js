const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-text'))
const questionCounterText = document.getElementById('questionCounter')
const scoreText = document.getElementById('score')
let users = JSON.parse(localStorage.getItem('users'))


let currentQuestion = {};
let questionCounter = 0;
let score = 0;





logQuestions("https://gist.githubusercontent.com/cmota/f7919cd962a061126effb2d7118bec72/raw/96ae8cbebd92c97dfbe53ad8927a45a28f8d2358/questions.json")

let questions = []

async function logQuestions(file) {
    try {
        const response = await fetch(file)
        if (!response.ok) {
            throw new Error("Network response was not OK");
          }
        const loadedQuestions = await response.json()
        questions = loadedQuestions
        startQuiz()
    } catch (error) {
        console.error("There has been a problem with your fetch request", error)
    }
}


  const bonus = 10;
  const max_questions = 15;

  function startQuiz () {
    questionCounter = 0;
    score = 0;
    newQuestion()
  }

  function newQuestion () {
    if(questions.length === 0 || questionCounter === max_questions){
        return window.location.assign('/end.html')
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${max_questions}`

    const questionIndex = Math.floor(Math.random() * questions.length)
    currentQuestion = questions[questionIndex]
    question.innerText = currentQuestion.question;

    answers.forEach(answer => {
        const id = answer.id
        answer.innerText = currentQuestion[id]
    })

    questions.splice(questionIndex, 1)

  }

  answers.forEach(answer => {
    answer.addEventListener('click', (e) => {
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.id
        
        let classToApply = 'incorrect';
        if(e.target.id === currentQuestion.answer){
            classToApply = 'correct';   
        } 

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            if(classToApply === 'correct'){
                incrementScore(bonus);
                users[users.length-1].score = score;
                localStorage.setItem('users', JSON.stringify(users))
            } else {
                users[users.length-1].score = score;
                localStorage.setItem('users', JSON.stringify(users))
                return window.location.assign('/end.html')
            }
            newQuestion()
        }, 1000)
 
    })
  })

  function incrementScore (num) {
        score += num;
        scoreText.innerText = score;
  }

  

  

  
