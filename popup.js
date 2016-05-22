window.onload = function () {
    
    // get all pop-up clicks and send message to background.js

    document.getElementById("list").onclick = function () {
        chrome.extension.sendMessage({
            type: 'ex_state',
            state: 'list'
        });
    };

    document.getElementById("knowledge").onclick = function () {
        chrome.extension.sendMessage({
            type: 'ex_state',
            state: 'knowledge'
        });
    };

    document.getElementById("clustering").onclick = function () {
        chrome.extension.sendMessage({
            type: 'ex_state',
            state: 'clustering'
        });
    };
};

