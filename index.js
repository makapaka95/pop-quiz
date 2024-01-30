const userForm = document.getElementById('user-form')
const userInput = document.getElementById('username')

function onSubmit (e) {
    e.preventDefault()
    const username = userInput.value

    if(userInput.value === '') {
        alert('please enter username!')
    }else {
        addUser(username)
        return window.location.assign('/quiz.html')
    }


}

function addUser(user)  {
    let users = JSON.parse(localStorage.getItem('users') || '[]')
    let person = {
        name: user,
        score: 0
    }
    users.push(person)
    localStorage.setItem('users', JSON.stringify(users))
}

userForm.addEventListener('submit', onSubmit)

