"use strict"

print = console.log;
const dir = console.dir;


//=====Установка обработчика на смену фона элемента BODY===
document.addEventListener("scroll", changeColorBackground);

//=====Установка обработчика для скрытия части навигации шапки при наличии скрола===
document.addEventListener("scroll", hiddenHeaderNav);

//=====Установка обработчика для textarea, чтобы изменять его высоту====
const textarea = document.querySelector('section.form textarea');
textarea.addEventListener("input", resizeTextarea);

//=====Установка обработчика для textarea, чтобы изменять его высоту====
const inputTel = document.querySelector('section.form .tel_input');
inputTel.addEventListener("input", validInputTel);



function changeColorBackground(event) {
    let clientHeight = document.documentElement.clientHeight;
    const element = document.querySelector('.bgc_white');
    const domRect = element.getBoundingClientRect();
    if (domRect.top < clientHeight / 2 && domRect.bottom > clientHeight / 2) {
        document.body.classList.add("body__bgc_white");
    }
    else {
        document.body.classList.remove("body__bgc_white");
    }
}
function hiddenHeaderNav(event) {
    // let clientHeight = document.documentElement.clientHeight;
    const header = document.querySelector('header');
    const scrollElement = document.body;
    const domRect = scrollElement.getBoundingClientRect();
    // print(domRect.top);
    if (domRect.top < -5) {
        header.classList.add("hidden_nav");
    }
    else {
        header.classList.remove("hidden_nav");
    }
}
function  resizeTextarea(event) {
    const textarea = event.target;
    let text = textarea.value;
    const textareaMetter = textarea.closest("div").querySelector(".textareaSizeMetter")
    textareaMetter.innerHTML = text;
    textarea.style.height = textareaMetter.clientHeight + "px";
    // print(textareaMetter.clientHeight);
}

function validInputTel(event) {
    const inputTel = event.target;
    let inputVal = inputTel.value;
    const lastSymbol = inputVal[inputVal.length - 1];
    try{
        if (lastSymbol.charCodeAt(0) < 48 || lastSymbol.charCodeAt(0) > 57) {
            inputTel.value = inputVal.slice(0, -1)
        }
    }
    catch{
        return;
    }
    // print(lastSymbol);
}
