const emailSelect = document.querySelector("#email-select");
const emailSelectContainer = document.querySelector("#email-select-container");
const emailForm = document.querySelector("#email-form");
const emailInput = document.querySelector("#email-input");

const state = {
    users: [],
    activeUserId: null,
};

let Storage = null;

function createOptionElement(value) {
    const optionEl = document.createElement("option");

    optionEl.value = value;
    optionEl.textContent = value;

    return optionEl;
}

function fetchState() {
    const users = Storage.getUsers();

    if (!users) return;

    state.users = users;

    const activeUser = Storage.getActiveUser();

    if (!activeUser) {
        state.storedActiveUser = state.users[0];
    }

    state.activeUserId = activeUser;
}

function createUser(email) {
    const userExists = state.users.some((user) => user.email === email);

    if (userExists) {
        throw new Error("User already exists");
    }

    state.users.push({ email, images: [] });
    Storage.setUsers(state.users);
}

function getActiveUser() {
    return state.users.find((user) => user.email === state.activeUserId);
}

function setActiveUser(id) {
    state.activeUserId = id;
    Storage.setActiveUser(id);

    renderActiveUserEl();
}

function saveImage(imageUrl) {
    const activeUser = getActiveUser();

    activeUser.images.push(imageUrl);
    Storage.setUsers(state.users);
}

function handleEmailFormSubmit(event) {
    event.preventDefault();

    const email = emailInput.value.trim();

    try {
        createUser(email);
    } catch (error) {
        console.error(error);
        // TODO: Show error message
        return;
    }

    setActiveUser(email);

    emailSelectContainer.classList.remove("hidden");

    const optionEl = createOptionElement(email);
    emailSelect.appendChild(optionEl);
    emailSelect.value = email;

    emailInput.value = "";
}

function renderActiveUserEl() {
    document.getElementById("active-user").textContent = state.activeUserId;
}

function renderEmailSelect() {
    if (state.users.length) {
        emailSelectContainer.classList.remove("hidden");

        for (const user of state.users) {
            const optionEl = createOptionElement(user.email);

            if (user.email === state.activeUserId) {
                optionEl.selected = true;
            }

            emailSelect.appendChild(optionEl);
        }
    }
}

function init(storage) {
    if (!storage) {
        throw new Error("Storage module is required");
    }

    Storage = storage;

    fetchState();

    emailForm.addEventListener("submit", handleEmailFormSubmit);

    emailSelect.addEventListener("change", (event) => {
        setActiveUser(event.target.value);
    });

    renderEmailSelect();
    renderActiveUserEl();
}

export default {
    init,
    saveImage,
};
