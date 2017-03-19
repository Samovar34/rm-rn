(function() {

    var ENTER_KEY = 13;

    var inputEl = document.getElementById("input"),
        resultEl = document.getElementById("result"),
        startBtn = document.getElementById("start"),
        resetInputBtn = document.getElementById("clinput"),
        resetResultBtn = document.getElementById("clresult");
        footer = document.getElementsByTagName("footer")[0];

    resetInputBtn.onclick = clearInput;

    resetResultBtn.onclick = clearResult;
    
    startBtn.onclick = send;

    // проверить расположение футера
    locateFooter();

    window.onresize = locateFooter; // обработчик на изменение размеров окна

    // очистка поля ввода
    function clearInput() {
        inputEl.value = "";
    }

    // очиста полы ввывода
    function clearResult () {
        resultEl.value = "";
    }

    // отправка данных на сервер
    function send() {
        var xhttp = new XMLHttpRequest();
        xhttp.timeout = 10000; // 10 сек

        xhttp.ontimeout = function () {
            alert("Время запроса истекло");
            enableStartBtn();
        };

        xhttp.onabort = function () {
            alert("Запрос был прерван");
            enableStartBtn();
        };

        xhttp.onerror = function () {
            alert("Произошла ошибка запроса");
            enableStartBtn();
        }

        xhttp.onload = function () {
            if (this.status == 200) {
                printResult(this.responseText);
            } else if (this.status == 500) {
                alert("На сервере произошла ошибка");
            } else {
                alert("Состояние запроса: " + this.statu + "(" + this.statusText + ")");
            }

            // очистить поле ввода и активировать кнопку
            enableStartBtn();
            clearInput();
        }

        xhttp.open("POST", "/", true);

        xhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

        xhttp.send(inputEl.value);
        console.log("send");
        disableStartBtn();
    }

    // отобразить результа
    function printResult(msg) {
        resultEl.value = msg;
    }

    // отключить кнопку отправки данных
    function disableStartBtn() {
        startBtn.setAttribute("disabled", "");
    }

    // включить кнопку отправки данных
    function enableStartBtn() {
        startBtn.removeAttribute("disabled");
    }

    // Проверяет высоту экрана и подсраиваем футер
    function locateFooter () {
        if (window.innerHeight < 490) {
            footer.classList.add("fix");
        } else {
            footer.classList.remove("fix");
        }
    }
})();