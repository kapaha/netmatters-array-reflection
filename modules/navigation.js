const ACTIVE_TAB_BTN_CLASS = "navbar-item--active";

const tabs = document.querySelectorAll("[data-tab]");
const tabBtns = document.querySelectorAll("[data-tab-target]");

const state = {
    activeTab: "account",
};

function render() {
    tabs.forEach((tab) => {
        if (tab.dataset.tab === state.activeTab) {
            tab.style.display = "unset";
        } else {
            tab.style.display = "none";
        }
    });

    tabBtns.forEach((tabBtn) => {
        if (tabBtn.dataset.tabTarget === state.activeTab) {
            tabBtn.classList.add(ACTIVE_TAB_BTN_CLASS);
        } else {
            tabBtn.classList.remove(ACTIVE_TAB_BTN_CLASS);
        }
    });
}

function switchTab(newTabId) {
    if (state.activeTab === newTabId) return;

    state.activeTab = newTabId;

    render();
}

function init() {
    tabBtns.forEach((button) => {
        button.addEventListener("click", () => {
            switchTab(button.dataset.tabTarget);
        });
    });

    render();
}

export default {
    init,
};
