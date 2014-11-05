"use strict";

$(function() {

    var path = window.location.pathname;
    var currentPageFile = path.split("/").pop();
    var currentPage = currentPageFile.split(".html").shift();
    var $navMenuLinks = $(".nav-menu__link");

    $navMenuLinks.each(function() {
        var href = $(this).attr("href").split(".html").shift();
        if (href === currentPage) {
            $(this).parent().addClass("active");
        }
    });

    switch (currentPage) {
        case "work":
            var portfolioFilter = $.listFilter({
                animate: true,
                speed: "slow",
                filterOptionsList: $("#filter-list"),
                listToFilter: $("#portfolio-list")
            });
            portfolioFilter.init();

            var imageCarousel = $.imageCarousel({
                container: $("#devere-carousel")
            });
            imageCarousel.init();
            break;
        case "contact":
            var contactForm = $.contactForm();
            $("#send").on("click", function(event) {
                event.preventDefault();
                $(".error-msg").hide();
                contactForm.validate();
            });
            break;
    }

});