let sto = window.sessionStorage;
let headers = {};

export function getTokenHeader() {
    let token = getToken();
    // token="Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaWFuZyIsImV4cCI6MTU4NzIyNDM0NSwiaWF0IjoxNTg3MjE3MTQ1fQ.GvHmecWhnJSQp5pq9ccGLOok1DmYle55u3k7ZcJSvyJJAfb9BZushjvKa6vEdwLQvcmIBpKu0QrINUZIkvD_rQ"
    if (!isTokenNull()) {
        token = "Bearer " + token;
        headers = {Authorization: token,};
    }
    return headers;
}

export function getToken() {
    return sto.getItem("token");
}

function setToken(token) {
    let sto = window.sessionStorage;
    sto.setItem("token", token);
}

function isTokenNull() {
    let token = getToken();
    if (!token) {
        return true;
    }
    return false;
}

function setTokenNull() {
    let sto = window.sessionStorage;
    sto.removeItem("token");
}

function isLogged() {
    return !isTokenNull();
}

function logout() {
    setTokenNull()
}

export default {
    setToken, isLogged, logout,
}


