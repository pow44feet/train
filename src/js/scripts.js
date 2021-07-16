/* import {work} from "./func";

work(); */


let header = document.querySelector(".header");
let headerItem = document.querySelectorAll(".header__item");
let nav = document.querySelector(".header__nav");
let burger = document.querySelector(".header__burger");

burger.addEventListener("click", burgerMenu);



headerItem.forEach(item => {
    item.addEventListener("mouseenter", (e) => {
        let target = e.target;
        console.log(target);
        /* if (item === e.target) {
            item.classList.add("header__item--active");
        } else {
            item.classList.remove("header__item--active");
        } */
    });
});




function burgerMenu() {
    if (header.classList.contains("header--active")) {
        header.classList.remove("header--active");
        nav.classList.remove("nav--active");
        burger.classList.remove("burger--active");
    } else {
        header.classList.add("header--active");
        nav.classList.add("nav--active");
        burger.classList.add("burger--active");
    }
}