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
"use strict";

(function($) {

    $.listFilter = function(options) {

        var filterList = {

            options: $.extend({
                animate: false,
                speed: "slow",
                filterOptionsList: $("ul#filter-list"),
                listToFilter: $("ul#list")
            }, options),

            init: function() {
                if (window.console) {
                    if (options.filterOptionsList.length < 1) {
                        console.log("ERROR (listFilter): filterOptionsList option element not found");
                        return;
                    }
                    if (options.listToFilter.length < 1) {
                        console.log("ERROR (listFilter): listToFilter option element not found");
                        return;
                    }
                }

                var filterOptions = options.filterOptionsList.find("li");
                if (window.console && filterOptions.length < 1) {
                    console.log("WARNING (listFilter): filterOptionsList option does not have any <li> elements");
                }

                filterOptions.on("click", function(event) {
                    event.preventDefault();

                    var filterString = $(this).text().trim().toLowerCase().replace(" ", "-");
                    filterList.filterListBy(filterString);
                });
            },

            filterListBy: function(filterString) {
                var list = options.listToFilter;

                if (window.console && list.length < 1) {
                    console.log("WARNING (listFilter): listToFilter option does not have any <li> elements");
                }

                if (filterString === "all") {
                    list.find("li").show(options.speed);
                } else {
                    list.find("li").each(function() {
                        var currentListItem = $(this);

                        if (currentListItem.hasClass(filterString)) {
                            if (options.animate) {
                                currentListItem.fadeIn(options.speed);
                            } else {
                                currentListItem.show();
                            }
                        } else {
                            if (options.animate) {
                                currentListItem.fadeOut(options.speed);
                            } else {
                                currentListItem.hide();
                            }
                        }
                    });
                }
            }

        };

        return {
            init: filterList.init
        };

    };

})(jQuery);
