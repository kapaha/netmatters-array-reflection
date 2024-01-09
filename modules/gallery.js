import { addGlobalEventListener } from "./utils.js";

const galleryGrid = document.getElementById("gallery-grid");
const gallerySingle = document.getElementById("gallery-single");
const gallerySingleImage = document.getElementById("gallery-single-image");
const deleteImageBtn = document.getElementById("delete-image-btn");
const backBtn = document.getElementById("back-btn");

let Account = null;
let Navigation = null;

function handleNavChange(data) {
    console.log(data);
    if (data === "gallery") {
        switchToGalleryView();
    }
}

function switchToSingleImageView(imageUrl) {
    gallerySingleImage.src = imageUrl;

    galleryGrid.style.display = "none";
    gallerySingle.style.display = "flex";
}

function switchToGalleryView() {
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
        const imageUrl = event.target.src;

        switchToSingleImageView(imageUrl);
    });

    deleteImageBtn.addEventListener("click", () => {
        // Get currently viewed image
        const currentImg = gallerySingleImage.src;

        // Get current account
        // Delete that image from the account
        Account.deleteImage(currentImg);

        // Switch back to gallery view
        switchToGalleryView();
    });

    backBtn.addEventListener("click", () => {
        switchToGalleryView();
    });

    Navigation.navObservable.subscribe(handleNavChange);
}

export default {
    init,
};
