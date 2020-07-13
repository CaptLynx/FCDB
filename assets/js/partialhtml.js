
function htmlPartial(selection) {
    var file, xhttp;

        file = selection;
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        $('section.content').innerHTML = this.responseText;
                    }
                    if (this.status == 404) { $('section.content').innerHTML = `Error loading partial ${ file }`; }

                }
            }
            xhttp.open('GET', 'pages/' + file, true);
            xhttp.send();
            return;
        }
    
};