// get message from popup.js
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    save_state(request.state);
    return true;
});

// save extension state on local storage
function save_state(state) {

    // IMPORTANT! save on local storage
    chrome.storage.local.set({'ex_state': state});

    // set extension badge
    switch (state) {
        case 'list':
            chrome.browserAction.setBadgeText({text: 'List'});
            break;
        case 'knowledge':
            chrome.browserAction.setBadgeText({text: 'KG'});
            break;
        case 'clustering':
            chrome.browserAction.setBadgeText({text: 'Cluster'});
    }

    // OPTIONAL - send message to current tab (to the listener in knowledge.js)
    // currently send message for refresh use
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendMessage(tab.id, {type: "ex_state", state: state});
    });
}
