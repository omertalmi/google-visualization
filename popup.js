window.onload = function () {

    // get all pop-up clicks and send message to background.js

    document.getElementById("list").onclick = function () {
        chrome.extension.sendMessage({
            type: 'ex_state',
            state: 'list'
        });
        window.close();
    };

    document.getElementById("knowledge").onclick = function () {
        chrome.extension.sendMessage({
            type: 'ex_state',
            state: 'knowledge'
        });
        window.close();
    };

    document.getElementById("clustering").onclick = function () {
        chrome.extension.sendMessage({
            type: 'ex_state',
            state: 'clustering'
        });
        window.close();
    };
};

