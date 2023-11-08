export function createAuthForm() {
    return `
<form class="mui-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
        <input type="email" autocomplete="off" id="email" required>
        <label for="email">Email</label>
    </div>
     <div class="mui-textfield mui-textfield--float-label">
        <input type="password" autocomplete="off" id="password" required>
        <label for="password">Password</label>
    </div>
    <button type="submit"  class="mui-btn mui-btn--raised">LogIn</button>
</form>
    `
}


const baseURL = 'https://identitytoolkit.googleapis.com/v1'
const apiKey = "AIzaSyCD7sUCoVLtK-X7mr4wKroVC59qvVoWzqI"

export function signIn(email, password) {
    const options = {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(`${baseURL}/accounts:signInWithPassword?key=${apiKey}`, options)
        .then(res => res.json())
        .then(data => data.idToken)

}


export function signUp(email, password) {
    const options = {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${baseURL}/accounts:signUp?key=${apiKey}`, options)
}