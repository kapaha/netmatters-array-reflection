import Account from "./account.js";

// Elements
const imagePreview = document.getElementById("find-image");
const newImageBtn = document.getElementById("new-image-btn");
const saveImageBtn = document.getElementById("save-image-btn");

let currentImageUrl = null;

async function getImage() {
    const response = await fetch("https://picsum.photos/300");

    currentImageUrl = response.url;

    imagePreview.src = currentImageUrl;
}

function saveImage() {
    const activeUser = Account.Users.getActiveUser();

    Account.Users.addImage(activeUser, currentImageUrl);

    getImage();
}

function init() {
    newImageBtn.addEventListener("click", getImage);
    saveImageBtn.addEventListener("click", saveImage);

    getImage();
}

export default {
    init,
};
