(function () {
  "use strict";


  var burgerButton = document.querySelector(".top-menu__burger");
  var modalMenu = document.querySelector(".modal-menu");

  burgerButton.addEventListener("click", function (ev) {
    ev.preventDefault();

    burgerButton.classList.toggle("top-menu__burger--close");
    modalMenu.classList.toggle("modal-menu--hidden");
  });

})();
