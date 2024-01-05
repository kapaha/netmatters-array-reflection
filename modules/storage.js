function get(key) {
    return JSON.parse(localStorage.getItem(key));
}

function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export default {
    get,
    set,
};
