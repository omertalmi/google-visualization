//window.onload = function () {
//
//    // get all pop-up clicks and send message to background.js
//
//    document.getElementById("list").onclick = function () {
//        chrome.extension.sendMessage({
//            type: 'ex_state',
//            state: 'list'
//        });
//        window.close();
//    };
//
//    document.getElementById("knowledge").onclick = function () {
//        chrome.extension.sendMessage({
//            type: 'ex_state',
//            state: 'knowledge'
//        });
//        window.close();
//    };
//
//    //document.getElementById("clustering").onclick = function () {
//    //    chrome.extension.sendMessage({
//    //        type: 'ex_state',
//    //        state: 'clustering'
//    //    });
//    //    window.close();
//    //};
//};

function clustering(e) {
    chrome.extension.sendMessage({
        type: 'ex_state',
        state: 'clustering'
    });
    window.close();
}


function knowledge(e) {
    chrome.extension.sendMessage({
        type: 'ex_state',
        state: 'knowledge'
    });
    window.close();
}


function list(e) {
    chrome.extension.sendMessage({
        type: 'ex_state',
        state: 'list'
    });
    window.close();
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('clustering').addEventListener('click', clustering);
    document.getElementById('knowledge').addEventListener('click', knowledge);
    document.getElementById('list').addEventListener('click', list);
});
