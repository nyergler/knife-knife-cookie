'use strict';

let onChrome = false;
try {
    browser;
} catch {
    onChrome = true;
 }

const handleClick = (tab) => {
    const location = new URL(tab.url);
    const cookies = {};
    if (onChrome) {
        cookies.origins = [location.origin];
    } else {
        cookies.hostnames = [location.hostname];
    }

    chrome.browsingData.remove(cookies, { cookies: true }, () => {
        return chrome.tabs.reload(tab.id, { bypassCache: true });
    });
}

chrome.browserAction.onClicked.addListener(handleClick);
console.log('loaded');