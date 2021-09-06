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
let mapComponent = document.querySelectorAll(".map__component");
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

mapClose.forEach(item => {
  item.addEventListener("click", hideInfo);
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
  if (innerWidth < 992) showInfo();

  window.addEventListener("resize", () => {
    let innerWidth = window.innerWidth;
    if (innerWidth < 992) showInfo();
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

function showInfo() {
  mapButton.forEach(elem => {
    elem.addEventListener("click", () => {
      bodyCover();
      let activeElem = elem.dataset.part;

      for (let i = 0; i < mapComponent.length; i++) {
        let infoWindow = mapComponent[i].dataset.info;

        if (activeElem == infoWindow) {
          mapComponent[i].classList.add("map__component--active");
        }
      }
    });
  });
}

function hideInfo() {
  mapBody.classList.remove("map__body--cover");
  mapComponent.forEach(item => {
    item.classList.remove("map__component--active");
  });
}

function bodyCover() {
  if (!(mapBody.classList.contains("map__body--cover"))) {
    mapBody.classList.add("map__body--cover");
  } else {
    mapBody.classList.remove("map__body--cover");
  }
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
