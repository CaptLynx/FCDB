$(document).ready(function () {
    loadPartials();
});


// ------ Page Management ------

/*
    Loads page content from the /pages/ folder to enable single-page application functionality.
    It will add the content inside an element with id="page-content"
    Simply call the function at some point.. i.e. "loadContent('pageContent.html').
*/

window.addEventListener('popstate', function (e) {
    if (window.location.pathname === '/') {
        loadContent(`home`);
    } else {
        loadContent(`${ window.location.pathname.substr(1) }`);
    }
});


//When the page is loaded/refreshed, direct to correct page.
function onFirstLoad() {
    if (sessionStorage.getItem('redirect404') !== null) {
        loadContent(`${ sessionStorage.getItem('redirect404').substr(1) }`);
        sessionStorage.removeItem('redirect404');
    } else {
        loadContent('home');
    }
}

function loadContent(selection, state) {
    $('#page-content').load(`pages/${ selection }`, function (response, status) {
        if (status === 'error') {
            loadContent('404'); //Possible infinite loop?
        }
    });

    if (selection === 'home') { //Instead of home having a /home.html url, display as base domain.
        window.history.pushState(state, '', '/');
    } else if (selection !== '404') { //Maintain page url despite 404
        window.history.pushState(state, '', `/${ selection }`);
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

// ------ End of Page Management ------

/*
    Loads html partials from the /partials/ folder and replaces elements with the partial attribute. 
    I.E. <div partial="navigation"></div>
*/

function loadPartials() {
    $('[partial]').each(function (i) {
        $(this).load(`partials/${$(this).attr('partial')}`, function (response, status) {
            $(this).contents().unwrap();
            if (status === 'error') {
                $(this).html(`Error loading partial: ${$(this).attr('partial')}`);
            }
        });
    });

    /*
    for (elmnt of $('[partial]')) {
        var partial = elmnt.getAttribute('partial');

        if (partial) {
            $(elmnt).load(`partials/${partial}`, function (response, status) {
                if (status === 'error') {
                    $(elmnt).html(`Error loading ${ partial }.html`);
                }
            });
        }
    }
    */
}

