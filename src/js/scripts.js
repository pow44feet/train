import SwiperCore, { Navigation, Pagination } from '../../node_modules/swiper/core';
SwiperCore.use([Navigation, Pagination]);


let header = document.querySelector(".header");
let headerItem = document.querySelectorAll(".header__item");
let headerLink = document.querySelectorAll(".header__link");
let headerBgImage = document.querySelector(".header__bg-image");
let nav = document.querySelector(".header__nav");
let burger = document.querySelector(".header__burger");

let mapBody = document.querySelector(".map__body");
let mapButton = document.querySelectorAll(".map__item");
let mapClose = document.querySelectorAll(".map__close");


burger.addEventListener("click", burgerMenu);

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

const swiperHero = new SwiperCore('.hero-slider', {
  // Optional parameters
  loop: true,
  speed: 400,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.hero-slider__next',
    prevEl: '.hero-slider__prev',
  },
});

const swiperCards = new SwiperCore('.cards__slider', {
  // Optional parameters
  loop: true,
  speed: 400,

  // Navigation arrows
  navigation: {
    nextEl: '.cards__arrow--next',
    prevEl: '.cards__arrow--prev',
  },
});

window.onload = () => {
  let innerWidth = window.innerWidth;
  if (innerWidth < 992) mapButtonAction();

  window.addEventListener("resize", () => {
    let innerWidth = window.innerWidth;
    if (innerWidth < 992) mapButtonAction();
  });
}

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

function mapButtonAction() {
  mapButton.forEach(elem => {
    elem.addEventListener("click", () => {
      setTimeout(() => {
        elem.classList.toggle("map__item--active");
        mapBody.classList.toggle("map__body--cover");
      }, 300);
    });
  });
}
/*
function mapInfoToggle() {

}
*/
/*
mapClose.forEach(elem => {
  elem.addEventListener("click", () => {
    let closest = elem.closest(".map__item");
    console.log(closest);
    closest.classList.remove("map__item--active");
  });
});
*/


/*
window.onload = () => {
  let innerWidth = window.innerWidth;
  if (innerWidth < 1200) cardsDescCompress();

  window.addEventListener("resize", () => {
    let innerWidth = window.innerWidth;
    if (innerWidth > 1200) {
      return;
    } else {
      cardsDescCompress()
    }
  });
}

function cardsDescCompress() {
  Ellipsis({
    className: '.cards__desc',
    lines: 3,
  });
}
*/
