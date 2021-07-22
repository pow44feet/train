/* import {work} from "./func";

work(); */


let header = document.querySelector(".header");
let headerLink = document.querySelectorAll(".header__link");
let headerBgImage = document.querySelector(".header__bg-image");
let nav = document.querySelector(".header__nav");
let burger = document.querySelector(".header__burger");


burger.addEventListener("click", burgerMenu);




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


headerLink.forEach((item, index) => {
    console.log(item);
    item.addEventListener("mouseenter", (e) => {
        if (item == e.target) {
            let itemIndex = index;
            console.log(itemIndex);
            headerBgImage.style.backgroundImage = `url(${bgMenu[itemIndex]})`;
            headerBgImage.style.transform = "scale(1)";
        }
        
    });
});

let bgMenu = [
    "../images/mobile_menu_bird_1.jpg",
    "../images/mobile_menu_bird_2.jpg",
    "../images/mobile_menu_bird_3.jpg",
    "../images/mobile_menu_bird_4.jpg",
    "../images/mobile_menu_bird_5.jpg",
];