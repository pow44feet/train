import SwiperCore, { Navigation, Pagination, Virtual, Controller } from '../../node_modules/swiper/core';
SwiperCore.use([Navigation, Pagination, Virtual, Controller]);


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
let historyImagesSlider = document.querySelector(".history__images-slider");
let historyTimelineWrapper = document.querySelector(".history__timeline-wrapper");



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


let scrolltop = pageYOffset;

window.addEventListener('scroll', function(){
  if (pageYOffset > scrolltop) { // сравнить
    header.classList.add("header--scroll");
  } else {
    //console.log('Scroll Up');
  }
  scrolltop = pageYOffset;

  if (pageYOffset == 0) {
    header.classList.remove("header--scroll");
  }
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
  loop: true,
  speed: 400,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
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
  speed: 500,
  centeredSlides: true,
  slideToClickedSlide: true,
  navigation: {
    nextEl: '.history__arrow--next',
    prevEl: '.history__arrow--prev',
  },
  virtual: {
    slides: slideCollection,
    cache: true,
    renderSlide: function(slide, index) {
      slide = `<li class="history__slide swiper-slide" data-slide="${bikesYears[index]}">
                <div class="history__slide-image">
                  <img src="images/history/${slideCollection[index]}.png" alt="">
                </div>
                <p class="history__slide-title">
                  <span>
                    ${bikesYears[index]} ${slideNames[index]}
                  </span>
                </p>
              </li>`;
      return slide;
    }
  },
  on: {
    beforeTransitionStart: (e) => {

      // Put in variable activeSlide the real active slide
      let activeSlide;
      let slides = e.slides;
      slides.forEach(item => {
        if (item.classList.contains("swiper-slide-active")) {
          activeSlide = item;
        }
      });

      // Find out dataset of the slide
      let activeSlideYear = activeSlide.dataset.slide;

      let stamps = document.querySelectorAll(".history__stamp");
      stamps = Array.from(stamps);

      // Put in variable targetStamp the real target stamp
      let targetStamp;
      stamps.forEach(item => {
        if (item.dataset.target == activeSlideYear) {
          targetStamp = item;
        }
      });

      // Find out index of the target stamp
      let targetStampIndex = stamps.indexOf(targetStamp);

      if (targetStampIndex >= 0) {
        historyTimeline.slideTo(targetStampIndex);
      }
    },
  },
  breakpoints: {
    1100: {
      spaceBetween: 50,
      slidesPerView: 2.5,
    },
    768: {
      spaceBetween: 30,
      slidesPerView: 2.2,
    },
    600: {
      spaceBetween: 30,
      slidesPerView: 1.8,
    },
    300: {
      spaceBetween: 30,
      slidesPerView: 1.2,
    }
  }
});


function createSlide(target, inList) {
  let slide = document.createElement("li");
  slide.classList.add("history__stamp");
  slide.classList.add("swiper-slide");
  let slideSpan = document.createElement("span");
  slideSpan.classList.add("history__date");
  slide.prepend(slideSpan);
  let slideTitle = document.createElement("span");
  slideSpan.prepend(slideTitle);
  slideTitle.innerHTML = target;


  if (inList != '' && inList != undefined) {
    slide.classList.add("history__stamp--target");
    slide.setAttribute("data-target", target);
  }

  historyTimelineWrapper.appendChild(slide);
}

for (let i = bikesYears[0]; i <= bikesYears[bikesYears.length - 1]; i++) {

  i = String(i);

  if (bikesYears.indexOf(i) != -1) {
    createSlide(i, true);
  } else {
    createSlide(i);
  }
}

const historyTimeline = new SwiperCore(".history__timeline-slider", {
  loop: false,
  speed: 500,
  centeredSlides: true,
  slidesPerView: 'auto',
  simulateTouch: false,
  breakpoints: {
    440: {
      spaceBetween: 25,
    },
    380: {
      spaceBetween: 23,
    },
    300: {
      spaceBetween: 21,
    }
  }
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


ymaps.ready(init);
    function init(){
      var weAreHere = new ymaps.Map("map", {
          center: [55.73912494, 37.62594951],
          zoom: 12,
      });

      weAreHere.controls.remove('geolocationControl');
      weAreHere.controls.remove('searchControl');

      weAreHere.behaviors.disable("scrollZoom");

      var ourPlace = new ymaps.Placemark([55.73912494, 37.62594951], {}, {
        preset: 'islands#blackBicycle2CircleIcon',
        iconImageSize: [20, 20],
        iconImageOffset: [30, 10],
      });
      weAreHere.geoObjects.add(ourPlace);
    }
