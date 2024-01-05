// Elements
const pages = Array.from(document.querySelectorAll("[data-page]"));
const pageButtons = Array.from(document.querySelectorAll("[data-page-target]"));

let activePage = pages.find((page) => page.dataset.page === "account");
let activePageButton = pageButtons.find(
    (page) => page.dataset.pageTarget === "account",
);

function init() {
    pageButtons.forEach((button) => {
        button.addEventListener("click", (element) => {
            const pageTarget = element.target.dataset.pageTarget;

            const targetPage = pages.find(
                (page) => page.dataset.page === pageTarget,
            );
            const targetPageButton = pageButtons.find(
                (pageButton) => pageButton.dataset.pageTarget === pageTarget,
            );

            if (targetPage === activePage) return;

            activePage.style.display = "none";
            targetPage.style.display = "unset";

            activePageButton.parentElement.classList.remove(
                "navbar-item--active",
            );
            targetPageButton.parentElement.classList.add("navbar-item--active");

            activePageButton = targetPageButton;
            activePage = targetPage;
        });
    });
}

export default {
    init,
};
