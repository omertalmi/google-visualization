var target = document.querySelector('body');

var ex_state = "";
getState();

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
        switch (ex_state) {

            case 'list':
                removeKnowledgeGraph();
                break;

            case 'knowledge':
                break;

            case 'clustering':
                removeKnowledgeGraph();
                if (document.getElementById("rcnt")) {
                    if (!document.getElementById("cluster")) {
                        addCluster();
                    }
                }
                break;
        }

    });
});

var config = {attributes: true, childList: true, characterData: true, subtree: true};
observer.observe(target, config);

chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
        case 'ex_state':
            //alert("message listener : " + message.state);
            getState();
    }

    //OPTIONAL - Refresh on state change
    //location.reload();

});

function getState() {
    chrome.storage.local.get('ex_state', function (result) {
        console.log(result);
        if (!result.ex_state) {
            ex_state = 'knowledge';
            return;
        }

        ex_state = result.ex_state;
        //alert('local storage state : ' + ex_state);
    });
}


var addCluster = function () {

    if (document.getElementsByName("q")[1]) {

        var query = document.getElementById("lst-ib").value;
        var newDiv = document.createElement('div');
        newDiv.id = 'cluster';
        newDiv.style.width = "245px";
        newDiv.style.position = "absolute";
        newDiv.style.marginTop = "50px";
        newDiv.style.marginLeft = "0px";
        var injectToDiv = '<ol class="tree">';
        injectToDiv += '<li class="li_cluster">';
        injectToDiv += '<label class="label_cluster" for="all_clusters">All Clusters</label>';
        injectToDiv += '<input class="cluster_input" type="checkbox" checked disabled id="all_clusters"/>';
        injectToDiv += '<ol class="inside_tree">';
        var clusters_html = add_clusters_html(query);

        injectToDiv += clusters_html.clusters_html;

        injectToDiv += '</ol>';
        injectToDiv += '</li>';
        injectToDiv += '</ol>';
        injectToDiv += '<div class="divider"></div>';

        if (clusters_html != "") {
            newDiv.innerHTML = injectToDiv;
            document.getElementById('top_nav').appendChild(newDiv);
        }

        document.getElementById('rcnt').style.marginLeft = "230px";
        document.getElementById('center_col').style.marginLeft = "10px";
    }
};

var removeKnowledgeGraph = function () {

    // Default Knowledge graph
    if (document.getElementById("rhs_block")) {
        document.getElementById("rhs_block").style.display = "none";
    }
    // carousel
    if (document.getElementById("botabar")) {
        document.getElementById("botabar").style.display = "none";
    }

    // remove Knowledge Graph classes
    var class1 = document.getElementsByClassName("kp-blk _Rqb _RJe");
    var class2 = document.getElementsByClassName("_Xhb");
    var class3 = document.getElementsByClassName("g mnr-c g-blk");
    var class4 = document.getElementsByClassName("g tpo knavi obcontainer mod"); //temperature

    var kgArray = [];
    kgArray = kgArray.concat(class1, class2, class3, class4);

    for (var i = 0; i < kgArray.length; i++) {
        for (var j = 0; j < kgArray[i].length; j++) {
            kgArray[i][j].remove();
        }
    }

};


function add_clusters_html(q) {

    //var query = document.getElementById("query").value;
    var found = false;
    var clusters_html = "";
    var window_location;
    // run all clusters
    for (var key in clusters) {
        var cluster_group;
        cluster_group = clusters[key];
        for (var i = 0; i < cluster_group.length; i++) {
            // find selected cluster
            if (q.toLowerCase() === cluster_group[i].toLowerCase()) {
                found = true;

                // set first cluster selected - (move to first cluster search)
                if (q.toLowerCase() === cluster_group[0].toLowerCase()) {
                    window_location = "https://www.google.com/search?q=" + cluster_group[1];
                    window.location.href = window_location;
                }
                // add all cluster links in this group, first OR user selected cluster will be selected
                for (var j = 1; j < cluster_group.length; j++) {
                    if (q.toLowerCase() === cluster_group[j].toLowerCase()) {
                        clusters_html += '<li class="cluster"><a class="a_cluster_selected" href="https://www.google.com/search?q=' + cluster_group[j] + '">' + cluster_group[j] + '</a></li>';
                    } else {
                        clusters_html += '<li class="cluster"><a class="a_cluster" href="https://www.google.com/search?q=' + cluster_group[j] + '">' + cluster_group[j] + '</a></li>';
                    }
                }
                break;
            }
            if (found) {
                break;
            }
        }
        if (found) {
            break;
        }
    }
    return {clusters_html: clusters_html, window_location: window_location};
}

// cluster key is NOT important - only the strings array
var clusters =
{
    //"BBC": ["BBC", "BBC Broadcasting Company", "BBC World News", "BBC News Africa", "BBC News Headlines"],
    //"Ben Gurion": ["Ben Gurion", "David Ben Gurion", "Ben Gurion Airport", "Ben Gurion University"],
    "Microsoft Israel": ["Microsoft Israel", "Microsoft Israel Careers", "Microsoft Israel Events", "Microsoft Israel Phone Number", "IBM Israel"],
    "Bank Of India": ["Bank Of India", "Bank Of India Recruitment", "Bank Of India IFSC Code", "Bank of India - US Operations"],
    "Tel-Aviv Municipality": ["Tel Aviv Municipality", "Tel Aviv Municipality Parking", "Tel Aviv Municipality Phone Number", "Tel Aviv Municipality Arnona", "Tel Aviv Municipality Address"],
    "Gephi": ["Gephi Tutorial", "Gephi Download", "Gephi Api", "Gephi Java"],
    "Sony Playstation 4": ["Sony Playstation 4", "Buy Sony Playstation 4", "Sony Playstation 4 Price", "Sony Playstation 4 Amazon", "Sony Playstation 4 vs Xbox"],
    "John Travolta": ["John Travolta1", "John Travolta", "John Travolta", "John Travolta"],
    "Data Mining": ["Data Mining", "Data Mining Applications", "Data Mining Algorithms", "Data Science", "Machine Learning", "Big Data", "Business Intelligence", "Data Mining Amazon"]
};