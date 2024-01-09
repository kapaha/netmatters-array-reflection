export function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (e) => {
        if (e.target.closest(selector)) callback(e);
    });
}
