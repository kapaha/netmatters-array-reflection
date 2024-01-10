const imagePreview = document.getElementById("find-image");
const newImageBtn = document.getElementById("new-image-btn");
const saveImageBtn = document.getElementById("save-image-btn");
const loadingEl = document.getElementById("loading");

let Account = null;
let currentImageUrl = null;
let loading = false;

async function getImage() {
    if (loading) return;

    loading = true;

    imagePreview.classList.add("hidden");
    loadingEl.style.display = "block";

    const response = await fetch("https://picsum.photos/300");

    currentImageUrl = response.url;
    imagePreview.src = currentImageUrl;

    imagePreview.addEventListener(
        "load",
        async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            loadingEl.style.display = "none";
            imagePreview.classList.remove("hidden");

            loading = false;
        },
        { once: true },
    );
}

function saveImage() {
    if (loading) return;

    const imageSaved = Account.saveImage(currentImageUrl);

    if (imageSaved) {
        getImage();
    }
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
