const localStoragePrefix = 'TabRemember'
const homeTabSelector = '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div.css-1dbjc4n.r-aqfbo4.r-gtdqiz.r-1gn8etr.r-1g40b8q > div.css-1dbjc4n.r-1e5uvyk.r-5zmot > div:nth-child(2) > nav > div > div.css-1dbjc4n.r-1adg3ll.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1udh08x > div > div > a';

const sleep = ms => new Promise(s => setTimeout(s, ms));

let lasthref;

const getTabList = async selector => {
    let tabList = [];
    while (true) {
        await sleep(100);
        const doms = document.querySelectorAll(selector);
        if (!doms.length) {
            continue;
        }
        if (tabList.length !== doms.length) {
            tabList = doms;
            await sleep(100);
            continue;
        }
        if (tabList.length === doms.length) {
            break;
        }
    }
    return tabList;
}

const homeTabClick = (e) => {
    let elm = e.srcElement;
    if (elm.localName !== 'a') {
        elm = elm.closest('a');
    }
    localStorage.setItem(localStoragePrefix + '_homeIndex', elm.tabRememberIndex);
}

const home = async () => {
    const tabList = await getTabList(homeTabSelector);
    for (i = 0; i < tabList.length; i++) {
        tabList[i].tabRememberIndex = i;
        tabList[i].addEventListener('click', homeTabClick);
    }
    const ls = localStorage.getItem(localStoragePrefix + '_homeIndex');
    if (ls) {
        const index = Number(ls);
        if (index < tabList.length) {
            tabList[index].click();
        }
    }
}

const main = () => {
    if (lasthref === location.href) {
        return;
    }
    lasthref = location.href;
    switch (location.pathname) {
        case '/home':
            home();
            break;
    }
}

const observer = new MutationObserver(main);
observer.observe(document, { childList: true, subtree: true });