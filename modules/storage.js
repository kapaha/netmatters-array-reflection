const STORAGE_KEY_USERS = "USERS";
const STORAGE_KEY_ACTIVE_USER_ID = "ACTIVE_USER_ID";

function get(key) {
    return JSON.parse(localStorage.getItem(key));
}

function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getUsers() {
    return get(STORAGE_KEY_USERS);
}

function setUsers(users) {
    set(STORAGE_KEY_USERS, users);
}

function getActiveUser() {
    return get(STORAGE_KEY_ACTIVE_USER_ID);
}

function setActiveUser(activeUser) {
    set(STORAGE_KEY_ACTIVE_USER_ID, activeUser);
}

export default {
    getUsers,
    setUsers,
    getActiveUser,
    setActiveUser,
};
