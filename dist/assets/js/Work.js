"use strict";

$(function() {

    var path = window.location.pathname;
    var page = path.split("/").pop();
    console.log( page );

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