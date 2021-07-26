/* import {work} from "./func";

work(); */

import SwiperCore, { Navigation, Pagination } from '../../node_modules/swiper/core';
SwiperCore.use([Navigation, Pagination]);


let header = document.querySelector(".header");
let headerItem = document.querySelectorAll(".header__item");
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
    item.addEventListener("mouseenter", (e) => {
        if (item == e.target) {
            headerItem.forEach(elem => {
                elem.classList.remove("header__item--active");
            });
            item.closest(".header__item").classList.add("header__item--active");
        }

    });
});

const swiper = new SwiperCore('.swiper-container', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
