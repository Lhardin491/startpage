
// code for expanding input box
(function () {
    var min = 1, max = 1000, pad_right = 5, input = document.getElementById('input');

    input.style.width = min + 'px';
    input.onkeypress = input.onkeydown = input.onkeyup = function () {
        var input = this;
        setTimeout(function () {
            var tmp = document.createElement('div');
            tmp.style.padding = '0';
            if (getComputedStyle)
                tmp.style.cssText = getComputedStyle(input, null).cssText;
            if (input.currentStyle)
                tmp.style.cssText = input.currentStyle.cssText;
            tmp.style.width = '';
            tmp.style.position = 'absolute';
            tmp.innerHTML = input.value.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;")
                .replace(/ /g, '&nbsp;');
            input.parentNode.appendChild(tmp);
            var width = tmp.clientWidth + pad_right + 1;
            tmp.parentNode.removeChild(tmp);
            if (min <= width && width <= max)
                input.style.width = width + 'px';
        }, 1);
    }
})();

// gets today's date
$(document).ready(function () {
    n = new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
});

// autofocus the input box
window.onload = function () {
    $("#input").focus();
};

// when enter is pressed, perform a duckduckgo search
$("#input").on('keyup', function (e) {
    if (e.keyCode == '13') {
        window.location.href = "https://duckduckgo.com/?q=" + $("#input").val();
    }
});

// weather function
//Mansfield API: http://api.openweathermap.org/data/2.5/weather?id=4709013&units=imperial&appid=bb617c8eebae0d1c79c479dd6ad0aab3
$(document).ready(function(){
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?id=4709013&units=imperial&appid=bb617c8eebae0d1c79c479dd6ad0aab3', function(json_data){
        document.getElementById("weather").innerHTML = json_data.main.temp + "&deg;F " + json_data.weather[0].main;
    })
});