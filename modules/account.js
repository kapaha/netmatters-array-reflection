import { getRandomId } from "./utils.js";
import Toastify from "./toastify.js";
import Observable from "./observable.js";

const emailSelect = document.querySelector("#email-select");
const emailSelectContainer = document.querySelector("#email-select-container");
const emailForm = document.querySelector("#email-form");
const emailInput = document.querySelector("#email-input");

const activeUserObservable = new Observable();
const imagesObservable = new Observable();

let noAccountToast = null;
let duplicateAccountToast = null;

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

    activeUserObservable.notify();
    imagesObservable.notify(Boolean(getActiveUser().images.length));
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

    renderGallery();

    activeUserObservable.notify();
    imagesObservable.notify(Boolean(getActiveUser().images.length));
}

function saveImage(imageUrl) {
    if (!state.activeUserId) {
        if (noAccountToast) {
            noAccountToast.hideToast();
        }

        noAccountToast = Toastify({
            text: "Please create an account to save images",
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
        }).showToast();

        return false;
    }

    getActiveUser().images.unshift({ url: imageUrl, id: getRandomId() });
    Storage.setUsers(state.users);

    renderGallery();

    imagesObservable.notify(Boolean(getActiveUser().images.length));

    return true;
}

function deleteImage(imageId) {
    getActiveUser().images = getActiveUser().images.filter(
        (image) => image.id !== imageId,
    );
    Storage.setUsers(state.users);

    imagesObservable.notify(Boolean(getActiveUser().images.length));

    renderGallery();
}

function renderGallery() {
    const galleryEl = document.getElementById("gallery-container");
    const fragment = document.createDocumentFragment();

    galleryEl.innerHTML = "";

    getActiveUser().images.forEach((image) => {
        const imgEl = document.createElement("img");
        imgEl.classList.add("w-full", "gallery-image", "cursor-pointer");
        imgEl.src = image.url;
        imgEl.dataset.imageId = image.id;

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        imageContainer.appendChild(imgEl);

        fragment.appendChild(imageContainer);
    });

    galleryEl.appendChild(fragment);
}

function handleEmailFormSubmit(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const validEmail = emailRegex.test(email);

    if (!validEmail) {
        emailInput.setCustomValidity("Please use a valid email address");
        emailInput.reportValidity();
        return;
    }

    try {
        createUser(email);
    } catch (error) {
        if (duplicateAccountToast) {
            duplicateAccountToast.hideToast();
        }

        duplicateAccountToast = Toastify({
            text: error.message,
            duration: 2000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            type: "error",
            className: "toastify--error",
        }).showToast();

        return;
    }

    setActiveUser(email);

    emailSelectContainer.classList.remove("hidden");

    const optionEl = createOptionElement(email);
    emailSelect.appendChild(optionEl);
    emailSelect.value = email;

    emailInput.value = "";
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

    emailInput.addEventListener("input", (event) => {
        event.target.setCustomValidity("");
    });

    renderEmailSelect();

    if (state.activeUserId) {
        renderGallery();
    }
}

export default {
    init,
    saveImage,
    deleteImage,
    activeUserObservable,
    imagesObservable,
};
