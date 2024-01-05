import Storage from "./storage.js";

// Constants
const STORAGE_KEY_USERS = "USERS";
const STORAGE_KEY_ACTIVE_USER = "ACTIVE_USER";

// Elements
const emailForm = document.querySelector("#email-form");
const emailInput = document.querySelector("#email-input");
const emailSelect = document.querySelector("#email-select");
const emailSelectContainer = document.querySelector("#email-select-container");

const Users = (function () {
    const users = Storage.get(STORAGE_KEY_USERS) || [];

    let activeUser =
        Storage.get(STORAGE_KEY_ACTIVE_USER) || users[0]?.email || "";

    setActiveUser(activeUser);

    function create(email) {
        if (exists(email)) {
            throw new Error("User already exists");
        }

        users.push({ email, images: [] });

        Storage.set(STORAGE_KEY_USERS, users);
    }

    function getActiveUser() {
        return activeUser;
    }

    function setActiveUser(email) {
        activeUser = email;

        const activeUserEl = document.getElementById("active-user");
        activeUserEl.textContent = email;

        Storage.set(STORAGE_KEY_ACTIVE_USER, email);
    }

    function get() {
        return users;
    }

    function getUser(email) {
        return users.find((user) => user.email === email);
    }

    function addImage(email, imageUrl) {
        const user = getUser(email);

        user.images.push(imageUrl);

        Storage.set(STORAGE_KEY_USERS, users);
    }

    function exists(email) {
        return users.some((user) => user.email === email);
    }

    return {
        create,
        get,
        exists,
        getActiveUser,
        setActiveUser,
        addImage,
    };
})();

function createOptionElement(value) {
    const optionEl = document.createElement("option");

    optionEl.value = value;
    optionEl.textContent = value;

    return optionEl;
}

function initEmailSelect() {
    const users = Users.get();

    if (users && users.length) {
        emailSelectContainer.classList.remove("hidden");

        const activeUser = Users.getActiveUser();

        for (const user of users) {
            const optionEl = createOptionElement(user.email);

            if (user.email === activeUser) {
                optionEl.selected = true;
            }

            emailSelect.appendChild(optionEl);
        }
    }
}

function initEmailForm() {
    emailForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();

        try {
            Users.create(email);
        } catch (error) {
            console.error(error);
            return;
        }

        const optionEl = createOptionElement(email);

        emailSelect.appendChild(optionEl);

        // Active user
        Users.setActiveUser(email);
        emailSelect.value = email;

        emailSelectContainer.classList.remove("hidden");
        emailInput.value = "";
    });
    emailSelect.addEventListener("change", (event) => {
        const selected = event.target.value;

        Users.setActiveUser(selected);
    });
}

function init() {
    initEmailSelect();
    initEmailForm();
}

export default {
    init,
    Users,
};
