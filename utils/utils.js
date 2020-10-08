const alertStack = [];

const exitBtn = document.querySelector('#exitBtn');
if (exitBtn != undefined)
    exitBtn.addEventListener('click', clearSession);

export function clearSession() {
    sessionStorage.clear();
    window.location.href = './login.html';
}
export function verifyToken() {
    return fetch("http://localhost:4000/token/verify", {
        method: "GET",
        headers: {
            'Access-token': sessionStorage.getItem('token')
        }
    }).then(result => {
        return result.json();
    }).then(data => {
        if (data.token === undefined) {
            clearSession();
        } else {
            sessionStorage.setItem('token', data.token);
        }
    }).catch(error => {
        console.log(error);
    })
}

export function getUsers() {
    return fetch("http://localhost:4000/user", {
        method: "GET",
        headers: {
            'Access-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(result => {
        return result.json();
    }).then(data => {
        return data;
    }).catch(error => {
        console.log(error);
    });
}

export function showAlert(type, node, message) {

    // Close another alerts
    alertStack.forEach(alert => {
        alert.remove();
    });

    const parent = document.querySelector(`#${node}`);
    const alertDiv = document.createElement('div');
    alertDiv.setAttribute('role', 'alert');
    switch (type) {
        case 'error':
            alertDiv.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show');
            break;
        case 'success':
            alertDiv.classList.add('alert', 'alert-success', 'alert-dismissible', 'fade', 'show');
            break;
        default:
            alertDiv.classList.add('alert', 'alert-primary');
            break;
    }
    alertDiv.textContent = message;

    parent.appendChild(alertDiv);
    alertStack.push(alertDiv);

    setTimeout(function () {
        alertDiv.remove();
        alertStack.pop();
    }, 3000);


}