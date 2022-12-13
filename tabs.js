const tabList = document.querySelector('[role="tablist"]')
const tabs = tabList.querySelectorAll('[role="tab"]')

tabList.addEventListener('keydown', changeTabFocus)

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel)
});

tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;
    
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute('tabindex', -1)

        if (e.keyCode === keydownRight) {
            tabFocus++;
            if(tabFocus>=tabs.length){tabFocus = 0}
        } else if (e.keyCode === keydownLeft) {
            tabFocus--
            if(tabFocus<0){tabFocus = tabs.length-1}
        }
    
        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }

}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);
    targetTab.setAttribute("aria-selected", true)

    hideContent(mainContainer,'[role="tabpanel"]')
    hideContent(mainContainer, 'picture')

    showContent(mainContainer, [`#${targetPanel}`])
    
    const targetPic = targetPanel.slice(0,-3)+'pic';
        mainContainer.querySelector([`#${targetPic}`]).classList.remove('hidden')
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((tabpanel) => tabpanel.classList.add('hidden'));
}

function showContent(parent, target) {
    parent
        .querySelector(target)
        .classList.remove('hidden')
}