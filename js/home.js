import {
    verifyToken,
    getUsers,
    showAlert,
    clearSession
} from '../utils/utils.js';

import {
    insertMeeting
} from '../utils/meetingUtils.js';

import {
    Meeting
} from './model/meeting.js';
const meetingList = [];

$(function () {
    $('.map').maphilight();
});

window.addEventListener("DOMContentLoaded", function (event) {
    verifyToken().then(res => {
        onload(event);
    });
});

function onload() {
    const registerButton = document.querySelector('#registerButton');
    registerButton.disabled = true;
    registerButton.addEventListener("click", registerButtonHandler);

    const userList = document.querySelector('#userList');
    userList.addEventListener("input", checkRegisterButton);
    loadUserList();

    const reasonList = document.querySelector('#reasonList');
    reasonList.addEventListener("input", checkRegisterButton);
    loadReasonList();

    const signatureForm = document.querySelector('#signatureForm');

    function registerButtonHandler(e) {
        e.preventDefault();
        const reason = reasonList.value,
            userid = userList.value;
        const meeting = new Meeting(0, userid, reason, '1231');
        insertMeeting(meeting).then(result => {
            signatureForm.reset();
            registerButton.disabled = true;
            showAlert('success', 'divAlert', 'Cita registrada con éxito');
        });

    }

    function checkRegisterButton(e) {
        e.preventDefault();
        if (reasonList.value !== "null" && userList.value !== "null") {
            registerButton.disabled = false;
        } else {
            registerButton.disabled = true;
        }
    }

    function loadUserList() {
        getUsers().then(data => {
            const result = data.result;
            for (var i = 0; i < result.length; i++) {
                if (i == 0) {
                    const elnull = document.createElement("option");
                    elnull.textContent = null;
                    elnull.value = null;
                    userList.appendChild(elnull);
                }
                const el = document.createElement("option");
                const opt = result[i];
                el.textContent = opt.name;
                el.value = opt.id;
                userList.appendChild(el);
            }
        });
    }

    function loadReasonList() {
        const reasonListValues = [{
                name: null,
                value: null
            }, {
                name: "Habitación 1",
                value: "habitacion1"
            },
            {
                name: "Baño",
                value: "banyo"
            },
            {
                name: "Habitación 2",
                value: "habitacion2"
            },
            {
                name: "Salon",
                value: "salon"
            },
            {
                name: "Cocina",
                value: "cocina"
            }
        ]
        for (var i = 0; i < reasonListValues.length; i++) {
            const opt = reasonListValues[i];
            const el = document.createElement("option");
            el.textContent = opt.name;
            el.value = opt.value;
            reasonList.appendChild(el);
        }
    }
}