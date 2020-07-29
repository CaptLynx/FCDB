$(document).ready(function () {
    //Do nothing
});


// ------ Page Management ------

/*
    Loads page content from the /pages/ folder to enable single-page application functionality.
    It will add the content inside an element with id="page-content"
    Simply call the function at some point.. i.e. "loadContent('pageContent.html').
*/

window.addEventListener('popstate', function (e) {
    if (window.location.pathname === '/') {
        loadContent(`home`, '', false);
    } else {
        loadContent(window.location.pathname.substr(1), '', false);
    }
});


//When the page is loaded/refreshed, direct to correct page.
function onFirstLoad() {
    if (sessionStorage.getItem('redirect404') !== null) {
        loadContent(sessionStorage.getItem('redirect404').substr(1));
        sessionStorage.removeItem('redirect404');
    } else {
        loadContent('home');
    }
}

function loadContent(selection, state, changeState) {
    $('#page-content').fadeOut('fast', function () {
        $('#page-content').load(`${ window.location.origin }/pages/${ selection }`, function (response, status) {
            $('.navbar-collapse').collapse('hide');
            if (status === 'success') {
                loadPartials(); //Check for partials every time the page is reloaded, then finally run insertLightbox() when finished.
                $('#page-content').fadeIn('fast');
            }
            if (status === 'error') {
                loadContent('404'); //Possible infinite loop?
                return;
            }
        });
    });
    
    if (typeof changeState === 'undefined' && changeState !== false) {
        if (selection === 'home') { //Instead of home having a /home.html url, display as base domain.
            if (window.location.pathname !== '/') {
                window.history.pushState(state, '', '/');
                $('base').attr('href', `/`)
            }
        } else if (selection !== '404' && selection !== window.location.pathname.substr(1)) { //Maintain page url despite 404
            window.history.pushState(state, '', `/${selection}`);
            $('base').attr('href', `${ location.origin }`)
        }
    }

    //Make header link active based on URL
    $('.nav-link').each(function () {
        if (($(this).attr('onclick').indexOf(location.pathname.split('/')[1]) !== -1 && location.pathname !== '/') || ( $(this).html().toLowerCase() === 'home' && location.pathname === '/' )) { //Highlight if on home page
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
        //Activate dropdowns
        if ($(this).hasClass('dropdown-toggle')) {
            if (location.pathname.split('/').length > 2 && $(this).prev().hasClass('active')) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        }
    });

    //Activate dropdown items
    $('.dropdown-item').each(function () {
        if ($(this).attr('onclick').split("'")[1] === location.pathname.substr(1)) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
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
        $(this).load(`${ window.location.origin }/partials/${$(this).attr('partial')}`, function (response, status) {
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

