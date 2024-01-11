import { addGlobalEventListener } from "./utils.js";

const galleryGrid = document.getElementById("gallery-grid");
const gallerySingle = document.getElementById("gallery-single");
const imageViewerContainer = document.getElementById("image-preview-container");
const deleteImageBtn = document.getElementById("delete-image-btn");
const backBtn = document.getElementById("back-btn");
const galleryTab = document.querySelector("[data-tab=gallery]");

let Account = null;
let Navigation = null;

let viewerImage;

function handleNavChange(tabId) {
    if (tabId === "gallery") {
        renderGallery();
    }
}

function renderImageViewer(imageUrl, imageId) {
    if (!viewerImage) {
        viewerImage = document.createElement("img");

        viewerImage.className = "mx-auto h-full object-contain";
        viewerImage.alt = "";

        imageViewerContainer.appendChild(viewerImage);
    }

    viewerImage.src = imageUrl;
    viewerImage.dataset.imageId = imageId;

    galleryGrid.style.display = "none";
    gallerySingle.style.display = "grid";
}

function renderGallery() {
    gallerySingle.style.display = "none";
    galleryGrid.style.display = "flex";
}

function renderGalleryTab(imagesExist) {
    if (imagesExist) {
        galleryTab.classList.add("desktop:block");
        galleryTab.classList.remove("desktop:hidden");
    } else {
        galleryTab.classList.add("desktop:hidden");
        galleryTab.classList.remove("desktop:block");
    }
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

    addGlobalEventListener("click", ".gallery-image", (event) => {
        renderImageViewer(event.target.src, event.target.dataset.imageId);
    });

    deleteImageBtn.addEventListener("click", () => {
        Account.deleteImage(viewerImage.dataset.imageId);

        renderGallery();
    });

    backBtn.addEventListener("click", renderGallery);

    Navigation.navObservable.subscribe(handleNavChange);
    Account.activeUserObservable.subscribe(renderGallery);
    Account.imagesObservable.subscribe(renderGalleryTab);
}

export default {
    init,
};
