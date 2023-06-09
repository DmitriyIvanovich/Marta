"use strict"

print = console.log;
const dir = console.dir;


//=====Установка обработчика для элементов появляющихся при скроле===
document.addEventListener("scroll", showElements);
showElements();

//=====Установка обработчика на смену фона элемента BODY===
document.addEventListener("scroll", changeColorBackground);
changeColorBackground();

//=====Установка обработчика для скрытия части навигации шапки при наличии скрола===
document.addEventListener("scroll", hiddenHeaderNav);
hiddenHeaderNav();

//=====Установка обработчика для раскрытия кнопки ОСТАВИТЬ ЗАЯВКУ на фиксированом блоке при наличии скрола===
document.addEventListener("scroll", showButtonOnFixedElements);
showButtonOnFixedElements();

//=====Установка обработчика для textarea, чтобы изменять его высоту====
const textarea = document.querySelector('section.form textarea');
textarea.addEventListener("input", resizeTextarea);

//=====Установка обработчика для input (type = "tel") для валидации====
const inputTel = document.querySelector('section.form .tel_input');
inputTel.addEventListener("input", validInputTel);

//===== Установка обработчика для удаления анимации при первом появления элемента ====
const animationElements = document.querySelectorAll(".animFirstShow");
for (let i = 0; i < animationElements.length; i++){
    let item = animationElements[i];
    item.addEventListener("animationend", event=>{
        event.target.classList.remove("animFirstShow")
        // print(item)
    }, { once: true })
}

//===== Установка обработчика для удаления анимации при первом появления элемента ====
const scrollToElement = document.querySelectorAll("[href^='#']");
// print(scrollToElement)
for (let i = 0; i < scrollToElement.length; i++){
    let item = scrollToElement[i];
    if(item.getAttribute("href").length === 1) continue;
    
    let sctollToObject = document.querySelector(item.getAttribute("href"));
    
    item.addEventListener("click", event=>{
        event.preventDefault();
        // print(window.pageYOffset);
        scrollStreamToElement(sctollToObject);
        
    })

    function scrollStreamToElement(item){
        let c = sctollToObject.getBoundingClientRect();
        let dY = c.top;
        let dYlast = 0;
        let speed = 10;

        let timer = setInterval(()=>{
            // print(dY, '000')
            window.scrollBy(0, speed)
            speed = speed*1.01;
            c = sctollToObject.getBoundingClientRect();
            dY = c.top;

            // print(dY, '111')
            if (dY === dYlast) clearInterval(timer);
            dYlast = dY;
        }, 10)
    }
}


function showElements(event) {
    let clientHeight = document.documentElement.clientHeight;
    const waitingElements = document.querySelectorAll('.waitingElement');

    for (let i = 0; i < waitingElements.length; i++) {
        let item = waitingElements[i];

        const domRect = item.getBoundingClientRect();
        
        //берем ключевуе точки для определения вхождения одного элемента в другой
        let a1 = domRect.top;
        let a2 = domRect.bottom;
        let b1 = 0;
        let b2 = clientHeight;

        //сверяем не находятся ли точки элемента (комплексно) за пределами верхнего и нижнего края клиентского окна
        //если элемент ниже или выше, то прерываем итерацию
        if (a1 < b1 && a2 < b1) continue;
        if (a1 > b2 && a2 > b2) continue;
        item.classList.remove("waitingElement")
    }
}

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

function showButtonOnFixedElements(event) {
    let clientHeight = document.documentElement.clientHeight;
    const button = document.querySelector('section.screen_kit .button');
    const scrollElement = document.body;
    const domRect = scrollElement.getBoundingClientRect();
    // print(domRect.top);
    if (domRect.top < -5) {
        button.classList.add("show");
    }
    else {
        button.classList.remove("show");
    }
}

function resizeTextarea(event) {
    const textarea = event.target;
    let text = textarea.value;
    
    // print(text);
    const textareaMetter = textarea.closest("div").querySelector(".textareaSizeMetter")
    textareaMetter.innerHTML = text;
    if(text.slice(-1) ==="\n"){
        textareaMetter.innerHTML += "<br>"
    };
    textarea.style.height = textareaMetter.clientHeight + "px";
    // print(textareaMetter.clientHeight);
}

function validInputTel(event) {
    const inputTel = event.target;
    let inputVal = inputTel.value;
    const lastSymbol = inputVal[inputVal.length - 1];
    try {
        if (lastSymbol.charCodeAt(0) < 48 || lastSymbol.charCodeAt(0) > 57) {
            inputTel.value = inputVal.slice(0, -1)
        }
    }
    catch {
        return;
    }
    // print(lastSymbol);
}
