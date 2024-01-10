export function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (e) => {
        if (e.target.closest(selector)) callback(e);
    });
}

// Not truely random, but okay for this demo app
export function getRandomId() {
    return "id" + Math.random().toString(16).slice(2);
}
