(function () {
  "use strict";


  var burgerButton = document.querySelector(".top-menu__burger");
  var modalMenu = document.querySelector(".modal-menu");
  var userBlock = document.querySelector(".user-block");

  userBlock.classList.remove("no-js");
  modalMenu.classList.remove("no-js");

  burgerButton.addEventListener("click", function (ev) {
    ev.preventDefault();

    burgerButton.classList.toggle("top-menu__burger--close");

    modalMenu.classList.toggle("modal-menu--closed");
    userBlock.classList.toggle("user-block--closed");


  });

})();
