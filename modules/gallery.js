import { addGlobalEventListener } from "./utils.js";

const galleryGrid = document.getElementById("gallery-grid");
const gallerySingle = document.getElementById("gallery-single");
const gallerySingleImage = document.getElementById("gallery-single-image");
const deleteImageBtn = document.getElementById("delete-image-btn");
const backBtn = document.getElementById("back-btn");

let Account = null;
let Navigation = null;

function handleNavChange(tabId) {
    if (tabId === "gallery") {
        renderGallery();
    }
}

function renderImageViewer(imageUrl, imageId) {
    gallerySingleImage.src = imageUrl;
    gallerySingleImage.dataset.imageId = imageId;

    galleryGrid.style.display = "none";
    gallerySingle.style.display = "flex";
}

function renderGallery() {
    gallerySingle.style.display = "none";
    galleryGrid.style.display = "flex";
}

function init(account, navigation) {
    if (!account) {
        throw new Error("Account module is required");
    }

    if (!navigation) {
        throw new Error("Navigation module is required");
    }

    Account = account;
    Navigation = navigation;

    addGlobalEventListener("click", ".gallery__img", (event) => {
        renderImageViewer(event.target.src, event.target.dataset.imageId);
    });

    deleteImageBtn.addEventListener("click", () => {
        Account.deleteImage(gallerySingleImage.dataset.imageId);

        renderGallery();
    });

    backBtn.addEventListener("click", renderGallery);

    Navigation.navObservable.subscribe(handleNavChange);
}

export default {
    init,
};
