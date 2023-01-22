const localStorageKey = 'TabRemember'
const forYouSelector = '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div.css-1dbjc4n.r-aqfbo4.r-gtdqiz.r-1gn8etr.r-1g40b8q > div.css-1dbjc4n.r-1e5uvyk.r-5zmot > div:nth-child(2) > nav > div > div.css-1dbjc4n.r-1adg3ll.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1udh08x > div > div:nth-child(1) > a';
const followingSelector = '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div.css-1dbjc4n.r-aqfbo4.r-gtdqiz.r-1gn8etr.r-1g40b8q > div.css-1dbjc4n.r-1e5uvyk.r-5zmot > div:nth-child(2) > nav > div > div.css-1dbjc4n.r-1adg3ll.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1udh08x > div > div:nth-child(2) > a';

const forYouClick = () => {
    localStorage.setItem(localStorageKey, 'foryou');
}

const followingClick = () => {
    localStorage.setItem(localStorageKey, 'following');
}

const main = async () => {
    await new Promise(s => setTimeout(s, 100));
    let forYouElm = document.querySelector(forYouSelector);
    let followElm = document.querySelector(followingSelector);
    if (!forYouElm || !followElm) {
        for (i = 1; i < 11; i++) {
            await new Promise(s => setTimeout(s, i * 100));
            if (!forYouElm) {
                forYouElm = document.querySelector(forYouSelector);
            }
            if (!followElm) {
                followElm = document.querySelector(followingSelector);
            }
            if (forYouElm && followElm) {
                break;
            }
        }
        if (!forYouElm || !followElm) {
            return;
        }
    }
    forYouElm.addEventListener('click', forYouClick);
    followElm.addEventListener('click', followingClick);

    const ls = localStorage.getItem(localStorageKey);
    if (ls) {
        if (ls === 'following') {
            followElm.click();
        } else if (ls === 'foryou') {
            forYouElm.click();
        }
    }
}

window.addEventListener("load", main)