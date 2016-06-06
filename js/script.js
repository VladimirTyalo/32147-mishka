(function () {
  "use strict";


  var burgerButton = document.querySelector(".top-menu__burger");
  var modalMenus = document.querySelectorAll(".modal-menu");

  burgerButton.addEventListener("click", function (ev) {
    ev.preventDefault();

    burgerButton.classList.toggle("top-menu__burger--close");
    console.log("burger/close button is clicked");
    for(var i = 0; i < modalMenus.length; i++) {
      modalMenus[i].classList.toggle("modal-menu--hidden");
    }


  });

})();
