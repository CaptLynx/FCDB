
function partialhtml(selection) {
    var file, xhttp;

        file = selection;
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        $('#page-content').html(this.responseText);
                    }
                    if (this.status == 404) { $('#page-content').innerHTML = `Error loading partial ${ file }`; }

                }
            }
            xhttp.open('GET', 'pages/' + file, true);
            xhttp.send();
            return;
        }
    
};