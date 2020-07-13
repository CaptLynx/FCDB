/*
    Loads html partials from the /partials/ folder and replaces elements with the partial attribute. 
    I.E. <div partial="navigation.html"></div>
*/

$(document).ready(function () {
    loadPartial();
});
function loadPartial() {
    var z, i, elmnt, file, xhttp;

    z = document.getElementsByTagName('*');
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];

        file = elmnt.getAttribute('partial');
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) { elmnt.innerHTML = `Error loading partial ${ file }`; }

                    $(elmnt).contents().unwrap();
                }
            }
            xhttp.open('GET', 'partials/' + file, true);
            xhttp.send();
            return;
        }
    }
};