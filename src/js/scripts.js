import SwiperCore, { Navigation, Pagination, Virtual } from '../../node_modules/swiper/core';
SwiperCore.use([Navigation, Pagination, Virtual]);


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

let historySlideTitle = document.querySelectorAll(".history__slide-title");


let hondaLineage = {
  1946: "Model A",
  1949: "Model D",
  1951: "Dream E",
  1953: "Benly J",
  1958: "Super Cub",
  1964: "3RC164",
  1969: "CB750",
  1972: "CR250 Elsinore",
  1974: "Gold Wing GL1000",
  1978: "NR500",
  1986: "VFR750F Interceptor",
  1993: "CBR900RR",
  1995: "EXP-2",
  2002: "RC211V",
  2010: "Fury",
  2013: "CBR500R",
  2018: "Africa Twin",
  2021: "Shadow Phantom",
}

let slideCollection = [];
for (let key in hondaLineage) {
   slideCollection.push(hondaLineage[key].toLowerCase().split(" ").join("-"));
}

let slideNames = [];
for (let key in hondaLineage) {
  slideNames.push(hondaLineage[key]);
}

let bikesYears = [];
for (let key in hondaLineage) {
  bikesYears.push(key);
}


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


let years = [];
historySlideTitle.forEach(item => {
  let string = item.innerText;
  years.push(string.substring(0, 4))
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

const mapSlider = new SwiperCore(".map__slider", {
  loop: false,
  autoHeight: true,
  pagination: {
    el: '.map__pagination',
    type: 'bullets',
    bulletClass: 'map__dot',
    clickable: true,
    clickableClass: 'map__paginatio--clickable',
    bulletActiveClass: 'map__dot--active',
    bulletElement: 'button',
  },
});

const historySlider = new SwiperCore(".history__images-slider", {
  loop: false,
  autoHeight: true,

  pagination: {
    el: '.history__timeline',
    type: 'bullets',
    dynamicBullets: true,
    horizontalClass: 'history__timeline--horizontal',
    dynamicMainBullets: 1,
    clickable: true,
    clickableClass: 'history__timeline--clickable',
    currentClass: 'history__timeline--current',
    bulletClass: 'history__timestamp',
    bulletActiveClass: 'history__timestamp--active',
    bulletElement: 'button',
    renderBullet: function (index, className) {
      return `<button class="${className}">${bikesYears[index]}</button>`;
    },
  },

  observeSlideChildren: true,
  observeParents: true,
  observer: true,
  virtual: {
    slides: (function () {
      let slides = [];
      for (let i = 0; i < slideNames.length; i++) {
        slides.push(`<li class="history__slide swiper-slide">
                      <div class="history__slide-image">
                        <img src="images/history/${slideCollection[i]}.png" alt="">
                      </div>
                      <div class="history__slide-title">
                        <p>
                          ${bikesYears[i]} ${slideNames[i]}
                        </p>
                      </div>
                    </li>`);
      }
      return slides;
    })(),
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



console.log(slideCollection);
