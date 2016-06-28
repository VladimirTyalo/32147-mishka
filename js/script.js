(function () {
  "use strict";
  // for mobileMenu
  var burgerButton = document.querySelector(".top-menu__burger");
  var modalMenu = document.querySelector(".modal-menu");
  var userBlock = document.querySelector(".user-block");

  // for slider
  var btnPrev = document.querySelector(".slider__btn--prev");
  var btnNext = document.querySelector(".slider__btn--next");
  var slider = document.querySelector(".slider__inner");


  initMenuState();


  handleMenu();

  if (slider && btnPrev && btnNext) {
    handleSlider();
  }


  function handleSlider() {

    var reviewShowClass = "slider__item--shown";
    var btnDisabledClass = "slider__btn--disabled";

    btnNext.addEventListener("click", function (ev) {
      ev.preventDefault();
      if (this.classList.contains(btnDisabledClass)) return;

      var currentReview = slider.querySelector("." + reviewShowClass);

      if (!currentReview) {
        console.log("no class: " + reviewShowClass);
        return;
      }

      var nextReview = currentReview.nextElementSibling;

      // check if there is no next review
      if (!nextReview) return;
      // check if next review is the last one
      if (!nextReview.nextElementSibling) {
        this.classList.add(btnDisabledClass);

      }
      btnPrev.classList.remove(btnDisabledClass);
      currentReview.classList.remove(reviewShowClass);
      nextReview.classList.add(reviewShowClass);
    });


    btnPrev.addEventListener("click", function (ev) {
      ev.preventDefault();
      if (this.classList.contains(btnDisabledClass))  return;


      var currentReview = slider.querySelector("." + reviewShowClass);

      if (!currentReview)return;

      var prevReview = currentReview.previousElementSibling;

      // check if there is no prev review
      if (!prevReview) return;
      // check if prev review is the first one
      if (!prevReview.previousElementSibling) {
        this.classList.add(btnDisabledClass);

      }
      btnNext.classList.remove(btnDisabledClass);
      currentReview.classList.remove(reviewShowClass);
      prevReview.classList.add(reviewShowClass);
    });

  }


  function handleMenu() {
    burgerButton.addEventListener("click", function (ev) {
      ev.preventDefault();

      burgerButton.classList.toggle("top-menu__burger--closed");
      modalMenu.classList.toggle("modal-menu--closed");
      userBlock.classList.toggle("user-block--closed");
    });
  }

  function initMenuState() {
    userBlock.classList.remove("no-js");
    modalMenu.classList.remove("no-js");
  }


})();
