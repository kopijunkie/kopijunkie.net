"use strict";

$(function() {

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

});