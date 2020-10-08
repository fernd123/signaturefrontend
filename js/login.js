import {
    showAlert
} from '../utils/utils.js';

const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const submitBtn = document.querySelector('#submitBtn');

eventListeners();

function eventListeners() {
    submitBtn.addEventListener("click", submit);
    window.addEventListener("load", function (event) {
        sessionStorage.clear();
    });
}

function submit(e) {
    e.preventDefault();
    debugger;
    let name = usernameInput.value;
    let password = passwordInput.value;

    if (username === '' || username === null || password === '' || password === null) {} else {

        fetch("http://localhost:4000/user/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password
            })
        }).then(result => {
            return result.json();
        }).then(data => {
            if (data.token === undefined) {
                sessionStorage.clear();
                showAlert('error', 'loginForm', 'Usuario o contraseña incorrecto');
            } else {
                window.location.href = './home.html';
                sessionStorage.setItem('token', data.token);
            }
        }).catch(error => {
            console.log(error);
        })
    }
}