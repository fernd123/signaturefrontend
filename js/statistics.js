import {
    clearSession,
    verifyToken
} from '../utils/utils.js';

import {
    getMeetingsToday,
    getMeetingsLastWeek,
    updateMeeting
} from '../utils/meetingUtils.js';

const statisticsOption = document.querySelector('#statisticsOption');
const resultDiv = document.querySelector('#result');
statisticsOption.addEventListener("input", onload);

window.addEventListener("DOMContentLoaded", function (event) {
    verifyToken().then(res => {
        onload(event);
    });
});

function onload(e) {
    setData();
}

function setData() {
    switch (statisticsOption.value) {
        case 't':
            getMeetingsToday().then(res => {
                createTable(res.result);
            });
            break;
        case 'w':
            getMeetingsLastWeek().then(res => {
                createTable(res.result);
            });
            break;
        default:
            break;
    }

    function createTable(data) {

        if (data !== undefined) {

            while (resultDiv.firstChild) {
                resultDiv.removeChild(resultDiv.firstChild);
            }

            const table = document.createElement('table');
            table.classList.add("table", "table-bordered");
            table.innerHTML = `
            <thead class="thead-dark">
            <tr>
            <th scope="col">Name</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Reason</th>
            </tr>
            </thead>`;

            const tbody = document.createElement('tbody');
            table.appendChild(tbody);

            for (let i = 0; i < data.length; i++) {
                const tr = document.createElement('tr');
                const tdName = document.createElement('td');
                const tdFrom = document.createElement('td');
                const tdTo = document.createElement('td');
                const tdReason = document.createElement('td');

                tdName.innerText = data[i].name;
                tdFrom.innerText = data[i].initDate;
                tdReason.innerText = data[i].reason;

                if (data[i].endDate === null || data[i].endDate === '') {
                    const button = document.createElement('button');
                    button.classList.add("btn", "btn-danger", "btn-sm");
                    button.setAttribute('id', data[i].id);
                    button.innerText = 'Registrar salida';
                    button.onclick = () => endMeeting(data[i].id, data);
                    tdTo.appendChild(button);
                } else {
                    tdTo.innerText = data[i].endDate;
                }
                tr.appendChild(tdName);
                tr.appendChild(tdFrom);
                tr.appendChild(tdTo);
                tr.appendChild(tdReason);

                table.appendChild(tr);
            }

            resultDiv.appendChild(table);
        }
    }

    function endMeeting(id, data) {
        updateMeeting(id).then(res => {
            setData();
        }).catch(error => {
            window.location.href = './index.html';
        });
    }
}