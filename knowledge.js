var target = document.querySelector('body');

var addCluster = function () {

    if (document.getElementsByName("q")[1]) {
        //var query = document.getElementsByName("q")[1].value;
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
        //if (query !== clusters_html.window_location){
        //    window.location = clusters_html.window_location;
        //}
        injectToDiv += clusters_html.clusters_html;
        //{
        //	injectToDiv += '<li class="file"><a href="https://www.google.com/search?q=David+Ben+Gurion">David Ben Gurion</a></li>';
        //	injectToDiv += '<li class="file"><a href="https://www.google.com/search?q=Ben+Gurion+Airport"">Ben Gurion Airport</a></li>';
        //	injectToDiv += '<li class="file"><a href="https://www.google.com/search?q=Ben+Gurion+University"">Ben Gurion University</a></li></ol>';
        //}

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

        //var all_clusters = document.getElementsByClassName("cluster").style.background.src = chrome.extension.getURL("css_tree/folder.png");
    }
};

var removeRhs = function () {

    // Default Knowledge graph
    if (document.getElementById("rhs_block")) {
        document.getElementById("rhs_block").style.display = "none";
    }
    // carousel
    if (document.getElementById("botabar")) {
        document.getElementById("botabar").style.display = "none";
    }

    // TODO: check those - remove elements
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

    if (document.getElementById("rcnt")) {
        if (!document.getElementById("cluster")) {
            addCluster();
        }
    }
};

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
        removeRhs();
    });
});

//document.getElementById("lst-ib").addEventListener("onkeyup", function () {
//    removeRhs();
//}, false);

var config = {attributes: true, childList: true, characterData: true, subtree: true};
observer.observe(target, config);


function add_clusters_html(q) {

    //var query = document.getElementById("query").value;
    var found = false;
    var clusters_html = "";
    var window_location;
    // run all clusters
    for (var key in clusters) {
        var cluster_group = clusters[key];
        for (var i = 0; i < cluster_group.length; i++) {
            // find selected cluster
            if (q.toLowerCase() === cluster_group[i].toLowerCase()) {
                found = true;

                // set first cluster selected - (move to first cluster search)
                if (q.toLowerCase() === cluster_group[0].toLowerCase()) {
                    window_location = "https://www.google.com/search?q=" + cluster_group[1];
                    window.location.href = window_location;
                    //window.location.replace(window_location);
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

// cluster name is not important - only the strings array
var clusters =
{
    //"BBC": ["BBC", "BBC Broadcasting Company", "BBC World News", "BBC News Africa", "BBC News Headlines"],
    //"Ben Gurion": ["Ben Gurion", "David Ben Gurion", "Ben Gurion Airport", "Ben Gurion University"],
    "Microsoft Israel": ["Microsoft Israel", "Microsoft Israel Careers", "Microsoft Israel Events", "Microsoft Israel Phone Number", "IBM Israel"],
    "Bank Of India": ["Bank Of India" ,"Bank Of India Recruitment", "Bank Of India IFSC Code", "Bank of India - US Operations"],
    "Tel-Aviv Municipality": ["Tel Aviv Municipality", "Tel Aviv Municipality Parking" ,"Tel Aviv Municipality Phone Number", "Tel Aviv Municipality Arnona", "Tel Aviv Municipality Address"],
    "Gephi": ["Gephi Tutorial", "Gephi Download", "Gephi Api", "Gephi Java"],
    "Sony Playstation 4": ["Sony Playstation 4", "Buy Sony Playstation 4", "Sony Playstation 4 Price", "Sony Playstation 4 Amazon", "Sony Playstation 4 vs Xbox"],
    "John Travolta": ["John Travolta1", "John Travolta", "John Travolta", "John Travolta"],
    "Data Mining": ["Data Mining", "Data Mining Applications", "Data Mining Algorithms", "Data Science", "Machine Learning", "Big Data", "Business Intelligence", "Data Mining Amazon"]
};

