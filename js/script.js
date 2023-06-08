"use strict"

print = console.log;
const dir = console.dir;


//=====Установка обработчика на смену фона элемента BODY===
document.addEventListener("scroll", changeColorBackground);

function changeColorBackground(event){
    let clientHeight = document.documentElement.clientHeight;
    const element = document.querySelector('.bgc_white');
    const domRect = element.getBoundingClientRect();
    if (domRect.top < clientHeight / 2 && domRect.bottom > clientHeight / 2){
        document.body.classList.add("body__bgc_white");
    }
    else{
        document.body.classList.remove("body__bgc_white");
    }
}