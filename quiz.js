const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-text'))
const questionCounterText = document.getElementById('questionCounter')
const scoreText = document.getElementById('score')
let users = JSON.parse(localStorage.getItem('users'))


let currentQuestion = {};
let questionCounter = 0;
let score = 0;



let questions = [{
    "question": "A flashing red traffic light signifies that a driver should do what?",
    "A": "stop",
    "B": "speed up",
    "C": "proceed with caution",
    "D": "honk the horn",
    "answer": "A"
  }, {
    "question": "A knish is traditionally stuffed with what filling?",
    "A": "potato",
    "B": "creamed corn",
    "C": "lemon custard",
    "D": "raspberry jelly",
    "answer": "A"
  }, {
    "question": "A pita is a type of what?",
    "A": "fresh fruit",
    "B": "flat bread",
    "C": "French tart",
    "D": "friend bean dip",
    "answer": "B"
  }, {
    "question": "A portrait that comically exaggerates a person's physical traits is called a what?",
    "A": "landscape",
    "B": "caricature",
    "C": "still life",
    "D": "Impressionism",
    "answer": "B"
  }, {
    "question": "A second-year college student is usually called a what?",
    "A": "sophomore",
    "B": "senior",
    "C": "freshman ",
    "D": "junior ",
    "answer": "A"
  }, {
    "question": "A student who earns a J.D. can begin his or her career as a what?",
    "A": "lawyer",
    "B": "bricklayer",
    "C": "doctor",
    "D": "accountant",
    "answer": "A"
  }, {
    "question": "A triptych is a work of art that is painted on how many panels?",
    "A": "two",
    "B": "three",
    "C": "five",
    "D": "eight",
    "answer": "B"
  }, {
    "question": "According to a famous line from the existentialist play 'No Exit' what is hell?",
    "A": "oneself",
    "B": "other people",
    "C": "little made large",
    "D": "hued in green and blue",
    "answer": "B"
  }, {
    "question": "According to a popular slogan, what state should people not 'mess with'?",
    "A": "New York",
    "B": "Texas",
    "C": "Montana",
    "D": "Rhode Island",
    "answer": "B"
  }, {
    "question": "According to a Yale University study, what smell is the most recognizable to American adults?",
    "A": "tuna",
    "B": "laundry",
    "C": "popcorn",
    "D": "coffee",
    "answer": "D"
  }, {
    "question": "According to folklore, the 'jackalope' is an antlered version of what animal?",
    "A": "chicken",
    "B": "rabbit",
    "C": "moose",
    "D": "snake",
    "answer": "B"
  }, {
    "question": "According to Greek mythology, who was Apollo's twin sister?",
    "A": "Aphrodite",
    "B": "Artemis",
    "C": "Venus",
    "D": "Athena",
    "answer": "B"
  }, {
    "question": "According to legend, if you give someone the 'evil eye' what are you doing?",
    "A": "cursing them",
    "B": "blessing a child",
    "C": "counting money",
    "D": "passing time",
    "answer": "A"
  }, {
    "question": "According to legend, in what country are you most likely to meet a leprechaun?",
    "A": "Ireland",
    "B": "Poland",
    "C": "Greenland",
    "D": "Scotland",
    "answer": "A"
  }, {
    "question": "According to the American Kennel Club, what is the most popular breed of dog in the US as of 1999?",
    "A": "Poodle",
    "B": "Beagle",
    "C": "German shepherd",
    "D": "Labrador retriever",
    "answer": "D"
  }]

  const bonus = 10;
  const max_questions = 15;

  function startQuiz () {
    questionCounter = 0;
    score = 0;
    newQuestion()
  }

  function newQuestion () {
    if(questions.length === 0){
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

  

  startQuiz()

  