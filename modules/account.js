import Storage from "./storage.js";

// Constants
const STORAGE_KEY_EMAILS = "emails";

// Elements
const emailForm = document.querySelector("#email-form");
const emailInput = document.querySelector("#email-input");
const emailSelect = document.querySelector("#email-select");
const emailSelectContainer = document.querySelector("#email-select-container");

function createOptionElement(value) {
    const optionEmail = document.createElement("option");

    optionEmail.value = value;
    optionEmail.textContent = value;

    return optionEmail;
}

function initEmailSelect() {
    const emails = Storage.get(STORAGE_KEY_EMAILS);

    if (emails && emails.length) {
        emailSelectContainer.classList.remove("hidden");

        for (const email of emails) {
            const optionEl = createOptionElement(email);

            emailSelect.appendChild(optionEl);
        }
    }
}

function initEmailForm() {
    emailForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const emails = Storage.get(STORAGE_KEY_EMAILS) || [];

        if (emails.includes(email)) {
            throw new Error("Email already exists");
        }

        emails.push(email);
        Storage.set(STORAGE_KEY_EMAILS, emails);

        const optionEl = createOptionElement(email);
        emailSelect.appendChild(optionEl);
        emailSelect.value = email;
        emailSelectContainer.classList.remove("hidden");
    });
}

function init() {
    initEmailSelect();
    initEmailForm();
}

export default {
    init,
};
