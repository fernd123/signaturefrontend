import {
    clearSession
} from "./utils.js";

export function insertMeeting(meeting) {
    return fetch("http://localhost:4000/meeting", {
        method: "POST",
        headers: {
            'Access-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            userid: meeting.userid,
            reason: meeting.reason,
            signature: ''
        })
    }).then(result => {
        return result.json();
    }).then(data => {
        if (data.token != undefined) {
            clearSession();
        }
        return data;
    }).catch(error => {
        console.log(error);
    });
}

export function updateMeeting(id) {
    return fetch("http://localhost:4000/meeting", {
        method: "PUT",
        headers: {
            'Access-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    }).then(result => {
        return result.json();
    }).then(data => {
        if (data.token != undefined) {
            clearSession();
        }
        return data;
    }).catch(error => {
        console.log(error);
    });
}

export function getMeetingsToday() {
    return fetch("http://localhost:4000/meeting/today", {
        method: "GET",
        headers: {
            'Access-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(result => {
        return result.json();
    }).then(data => {
        if (data.token != undefined) {
            clearSession();
        }
        return data;
    }).catch(error => {
        console.log(error);
    });
}

export function getMeetingsLastWeek() {
    return fetch("http://localhost:4000/meeting/week", {
        method: "GET",
        headers: {
            'Access-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(result => {
        return result.json();
    }).then(data => {
        if (data.token != undefined) {
            clearSession();
        }
        return data;
    }).catch(error => {
        console.log(error);
    });
}

export function getMeetingsByReason(reason) {
    return fetch("http://localhost:4000/meeting/reason", {
        method: "POST",
        headers: {
            'Access-token': sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            reason: reason
        })
    }).then(result => {
        return result.json();
    }).then(data => {
        if (data.token != undefined) {
            clearSession();
        }
        return data;
    }).catch(error => {
        console.log(error);
    });
}