"use strict";

$(function() {

    var portfolioFilter = $.listFilter({
        filterOptionsList: $("#filter-list"),
        listToFilter: $("#portfolio-list"),
        animate: true,
        speed: "slow"
    });
    portfolioFilter.init();

});