(function() {

    var ENTER_KEY = 13;

    var inputEl = document.getElementById("input"),
        resultEl = document.getElementById("result"),
        startBtn = document.getElementById("start"),
        resetInputBtn = document.getElementById("clinput"),
        resetResultBtn = document.getElementById("clresult");

    resetInputBtn.onclick = clearInput;

    resetResultBtn.onclick = clearResult;

    // inputEl.onkeypress = function (e) {
    //     if (e.keyCode == ENTER_KEY) {
    //         send();
    //     }
    // };
    
   startBtn.onclick = send;

    function clearInput() {
        inputEl.value = "";
        inputEl.focus();
    }

    function clearResult () {
        resultEl.value = "";
    }

    function send() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                printResult(this.responseText);
                enableStartBtn();
                clearInput();
            }
        };
        xhttp.open("POST", "/", true);
        xhttp.send(inputEl.value);
        console.log("send");
        disableStartBtn();
    }

    function printResult(msg) {
        resultEl.value = msg;
    }

    function disableStartBtn() {
        startBtn.setAttribute("disabled", "");
    }

    function enableStartBtn() {
        startBtn.removeAttribute("disabled");
    }
})();