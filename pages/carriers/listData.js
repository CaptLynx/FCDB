jQuery(document).ready(function () { 
listData()
});

function listData() {
    var data = JSON.parse(localStorage["carriers"])
    console.log(localStorage["carriers"])
}

