const imagePreview = document.getElementById("find-image");
const newImageBtn = document.getElementById("new-image-btn");
const saveImageBtn = document.getElementById("save-image-btn");

let Account = null;
let currentImageUrl = null;

async function getImage() {
    const response = await fetch("https://picsum.photos/300");

    currentImageUrl = response.url;

    imagePreview.src = currentImageUrl;
}

function saveImage() {
    Account.saveImage(currentImageUrl);

    getImage();
}

function init(account) {
    if (!account) {
        throw new Error("Account module is required");
    }

    Account = account;

    newImageBtn.addEventListener("click", getImage);
    saveImageBtn.addEventListener("click", saveImage);

    getImage();
}

export default {
    init,
};
