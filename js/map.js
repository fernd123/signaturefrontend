import {
    clearSession,
    verifyToken
} from '../utils/utils.js';

import {
    getMeetingsByReason,
    updateMeeting
} from '../utils/meetingUtils.js';

var $ = require('jQuery'); 

/*$(function () {
    $('.map').maphilight({
        strokeColor: '808080',
        strokeWidth: 5,
        strokeOpacity: 1,
        fillColor: '00c31d'
    });
});*/

window.addEventListener("DOMContentLoaded", function (event) {
    verifyToken().then(res => {
        onload(event);
    });
});

function exit() {
    clearSession;
}

function onload() {
    const map = document.getElementById('mapimage');
    map.addEventListener("click", mapHandler, false);

    function mapHandler(e) {
        e.preventDefault();
        const reason = e.target.alt;

        if (e.target != e.currentTarget) {
            showRegisteredPeople(reason);
        }
        e.stopPropagation();
    }

    function showRegisteredPeople(reason) {
        const peopleList = document.querySelector('#peopleList');
        while (peopleList.firstChild) {
            peopleList.removeChild(peopleList.firstChild);
        }

        const title = document.querySelector('#title');
        title.innerText = `Personas en ${reason}`;
        getMeetingsByReason(reason).then(res => {
            const meeting = res.result;
            for (let i = 0; i < meeting.length; i++) {
                const divRow = document.createElement('div');
                divRow.classList.add('row');

                const divCol = document.createElement('div');
                divCol.classList.add('col-sm-6');
                divCol.style.cssText = 'margin-bottom: 1em';
                divCol.innerText = `${meeting[i].name} - ${meeting[i].initDate}`;

                const divColBtn = document.createElement('div');
                divColBtn.classList.add('col-sm-6');

                const button = document.createElement('button');
                button.classList.add("btn", "btn-danger", "btn-sm");
                button.setAttribute('id', meeting.id);
                button.innerText = 'Registrar salida';
                button.onclick = () => endMeeting(meeting[i].id, reason);

                divColBtn.appendChild(button);
                divRow.appendChild(divCol);
                divRow.appendChild(divColBtn);

                peopleList.appendChild(divRow);
            }
        });
    }

    function endMeeting(id, reason) {
        updateMeeting(id).then(res => {
            showRegisteredPeople(reason);
        });
    }
}