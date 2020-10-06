import { verifyToken } from '../utils/utils.js';
import {
    Meeting
} from './model/meeting.js';
const meetingList = [];

$(function () {
    $('.map').maphilight();
});

window.addEventListener("load", function (event) {
    debugger;
    verifyToken();
    onload();
});

function onload() {
    const map = document.getElementById('mapimage');
    map.addEventListener("click", mapHandler, false);

    const registerButton = document.querySelector('#registerButton');
    registerButton.addEventListener("click", registerButtonHandler);

    function mapHandler(e) {
        e.preventDefault();
        if (e.target != e.currentTarget) {
            var clicked = e.target.coords;
            console.log('click event triggered at ' + clicked);
        }
        e.stopPropagation();
    }

    function registerButtonHandler(e) {
        e.preventDefault();
        const meeting = new Meeting('Fernando', 'Ver al jefe', 'frs');
        meetingList.push(meeting);
        console.log(meetingList);
    }
}