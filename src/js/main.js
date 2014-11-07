"use strict";

$(function() {

    var path = window.location.pathname;
    var currentPageFile = path.split("/").pop();
    var currentPage = currentPageFile.split(".html").shift();
    var $navMenuLinks = $("a.nav-menu__link");

    $navMenuLinks.each(function() {
        var href = $(this).attr("href").split(".html").shift();
        if (href === currentPage) {
            $(this).parent().addClass("active");
        }
    });

    var mobileTreshold = 768;
    if ($(window).width() <= mobileTreshold) {
        var $mobileNavMenu = $("ul#mobile-nav-menu");

        $("button#mobile-menu-toggle").on("click", function() {
            $mobileNavMenu.slideToggle();
        });
    }

    switch (currentPage) {
        case "work":
            var portfolioFilter = $.listFilter({
                animate: true,
                speed: "slow",
                filterOptionsList: $("ul#filter-list"),
                listToFilter: $("ul#portfolio-list")
            });
            portfolioFilter.init();

            var imageCarousel = $.imageCarousel({
                container: $("ul#devere-carousel")
            });
            imageCarousel.init();
            break;
        case "contact":
            var contactForm = $.contactForm();
            $("input#send").on("click", function(event) {
                event.preventDefault();
                $("span.error-msg").hide();
                contactForm.validate();
            });
            break;
    }

});