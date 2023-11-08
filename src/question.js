export class Question {
    static create(question) {
        const URL = 'https://fir-app-820dd-default-rtdb.firebaseio.com/questions.json'
        const options = {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(URL, options)
            .then(res => res.json())
            .then(data => {
                question.id = data.name
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }


    static getListFromDB(token) {
        if (!token) {
            return Promise.resolve('<p class="error">No token</p>')
        }
        return fetch(`https://fir-app-820dd-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
            .then(res => res.json())
            .then(response => {
                if (response && response.error) {
                    return `<p class="error">${response.error}</p>`
                }
                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })
    }

    static listToHTML(questions) {
        return questions.length
            ? `<ol>${questions.map(q => `<li>${q.text}, ${q.date}, ${q.id}</li>`).join('')}</ol>`
            : `<p>No questions into DB</p>`
    }

    static renderList() {
        const listQuestions = getListFromLS()
        const markup = listQuestions.length
            ? listQuestions.map(item => markupCard(item)).join('')
            : `<div class="mui--text-headline">No questions yet</div>`
        const rootList = document.getElementById('list')
        rootList.innerHTML = markup
    }
}

function markupCard(question) {
    return `<div class="mui--text-black-54">
    ${new Date(question.date).toLocaleTimeString()} /
    ${new Date(question.date).toLocaleDateString()}
    </div>
    <div>${question.text}</div>
    <br>`
}

function addToLocalStorage(question) {
    const allQuestions = getListFromLS()

    allQuestions.unshift(question)

    localStorage.setItem('questions', JSON.stringify(allQuestions))
}


function getListFromLS() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}