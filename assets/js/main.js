$(document).ready(function () {
    startEDClock();
});

window.addEventListener('scroll', function() {
    $('header').toggleClass('sticky', window.scrollY > 0);
});

function startEDClock() {
    var today = new Date();
    var h = today.getUTCHours();
    var m = today.getUTCMinutes();
    var s = today.getUTCSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('#edtime').html(`${ h }:${ m }:${ s }`)
    setTimeout(startEDClock, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

