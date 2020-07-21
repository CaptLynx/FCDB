/*
    Loads page content from the /pages/ folder to enable single-page application functionality.
    It will add the content inside an element with id="page-content"
    Simply call the function at some point.. i.e. "loadContent('pageContent.html').
*/

window.addEventListener('popstate', function (e) {
    if (window.location.pathname === '/') {
        loadContent(`home.html`);
    } else {
        loadContent(`${ window.location.pathname.substr(1) }.html`);
    }
});

function loadContent(selection, state) {
    $('#page-content').load(`pages/${ selection }`, function (response, status) {
        if (status === 'error') {
            loadContent('404.html'); //Possible infinite loop?
        }
    });

    if (selection === 'home.html') { //Instead of home having a /home.html url, display as base domain.
        window.history.pushState(state, '', '/');
    } else if (selection !== '404.html') { //Maintain page url despite 404
        window.history.pushState(state, '', `/${ selection.split('.html')[0] }`);
    }
}


//When the page is loaded/refreshed, direct to correct page.
function onFirstLoad() {
    if (sessionStorage.getItem('redirect404') !== null) {
        loadContent(`${ sessionStorage.getItem('redirect404').substr(1) }.html`);
        sessionStorage.removeItem('redirect404');
    } else {
        loadContent('home.html');
    }
}

/* DEPRECATED CODE
function loadContent(selection, state) {
    var xhttp;

        if (selection) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        $('#page-content').html(this.responseText);
                    }
                    if (this.status == 404) { loadContent('404.html'); }

                }
            }
            if(selection !== 'home.html') {
                window.history.pushState(state, '', '/' + selection.split('.html')[0]);
            } else {
                window.history.pushState(state, '', '/');
            }
            xhttp.open('GET', 'pages/' + selection, true);
            xhttp.send();
        }
    
};
*/