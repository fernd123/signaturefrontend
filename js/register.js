import {
    User
} from './model/user.js';

import {
    showAlert
} from '../utils/utils.js';

const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const phoneInput = document.querySelector('#phone');
const mailInput = document.querySelector('#mail');
const submitBtn = document.querySelector('#submitBtn');
const registerForm = document.querySelector('#registerForm');
submitBtn.disabled = true;

eventListeners();

function eventListeners() {
    submitBtn.addEventListener("click", submit);
    usernameInput.addEventListener("input", checkSubmitBtn);
    passwordInput.addEventListener("input", checkSubmitBtn);
    phoneInput.addEventListener("input", checkSubmitBtn);
    mailInput.addEventListener("input", checkSubmitBtn);
}

function checkSubmitBtn(e){
    e.preventDefault();
    if(usernameInput.value && passwordInput.value && phoneInput.value && mailInput.value){
        submitBtn.disabled = false;
    }else{
        submitBtn.disabled = true;
    }
}

function submit(e) {
    e.preventDefault();
    const name = usernameInput.value;
    const password = passwordInput.value;
    const phone = phoneInput.value;
    const mail = mailInput.value;

    if (username === '' || username === null || password === '' || password === null || phone === '' || phone === null || mail === '' || mail === null) {
        // Validation
    } else {
        fetch("http://localhost:4000/user/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password,
                phone: phone,
                mail: mail
            })
        }).then(result => {
            return result.json();
        }).then(data => {
            if (Object.keys(data.result).length != 0) {
                registerForm.style.display = "none";
                showAlert('success', 'contentForm', 'Usuario registrado con éxito. Reedireccionando...');
                setTimeout(function () {
                    window.location.href = './login.html';
                }, 3000);
            } else {
                console.log(data.result);
                showAlert('error', 'registerForm', data.result.sqlMessage);
            }
        }).catch(error => {
            console.log(error);
        })
    }
}