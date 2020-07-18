
/*
    Loads page content from the /pages/ folder to enable single-page application functionality.
    It will add the content inside an element with id="page-content"
    Simply call the function at some point.. i.e. "loadContent('pageContent.html').
*/

function loadContent(selection) {
    var file, xhttp;

        file = selection;
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        $('#page-content').html(this.responseText);
                    }
                    if (this.status == 404) { loadContent('404.html'); }

                }
            }
            window.history.pushState({}, '', "/" + file.split('.html')[0]);
            xhttp.open('GET', 'pages/' + file, true);
            xhttp.send();
            return;
        }
    
};
