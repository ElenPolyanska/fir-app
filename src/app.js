import { createModal, isValid } from './utils'
import { Question } from './question'
import { createAuthForm, signIn } from './auth'
import './styles.css'


const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')
const modalBtn = document.getElementById('modal-btn')

window.addEventListener('load', startPageHandler)
form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', (e) => {
    submitBtn.disabled = !isValid(e.target.value)
})
modalBtn.addEventListener('click', openModal)


function openModal() {
    createModal('Authorization', createAuthForm())
    document.getElementById('auth-form').addEventListener('submit', authFormHandler, { once: true })
}

function authFormHandler(e) {
    e.preventDefault()
    const email = e.target.querySelector('#email').value.trim()
    const password = e.target.querySelector('#password').value.trim()
    signIn(email, password)
        .then(token => Question.getListFromDB(token))
        .then(modalNoToken)
}

function modalNoToken(content) {
    console.log("content", content)
    if (typeof (content) === "string") {
        createModal('Error!', content)
    } else {
        createModal('List of questions', Question.listToHTML(content))
    }
}

function startPageHandler() {
    Question.renderList()
}

function submitFormHandler(e) {
    e.preventDefault()
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()

        }
        submitBtn.disabled = true

        // Async request to server to save question
        Question.create(question).then(() => {
            form.reset()
            input.className = ''
            submitBtn.disabled = false
        })
    }
}