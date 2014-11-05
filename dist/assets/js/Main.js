"use strict";

$(function() {

    var path = window.location.pathname;
    var pageFile = path.split("/").pop();
    var pageName = pageFile.split(".html").shift();

    switch (pageName) {
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