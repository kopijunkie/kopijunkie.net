"use strict";

(function($) {

    $.listFilter = function(options) {

        var filterList = {

            options: $.extend({
                animate: false,
                filterOptionsList: $("ul#filter-list"),
                listToFilter: $("ul#list")
            }, options),

            init: function() {
                if (window.console) {
                    if (filterList.options.filterOptionsList.length < 1) {
                        console.log("ERROR (listFilter): filterOptionsList option element not found");
                        return;
                    }
                    if (filterList.options.listToFilter.length < 1) {
                        console.log("ERROR (listFilter): listToFilter option element not found");
                        return;
                    }
                }

                var filterOptions = filterList.options.filterOptionsList.find("li");
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
                var $list = filterList.options.listToFilter;

                if (window.console && $list.length < 1) {
                    console.log("WARNING (listFilter): listToFilter option does not have any <li> elements");
                }

                if (filterList.options.animate) {
                    if (filterString === "all") {
                        $list.find("li").fadeIn(filterList.options.speed);
                    } else {
                        $list.find("li").each(function() {
                            var $currentListItem = $(this);
                            if ($currentListItem.hasClass(filterString)) {
                                $currentListItem.fadeIn(filterList.options.speed);
                            } else {
                                $currentListItem.fadeOut(filterList.options.speed);
                            }
                        });
                    }
                } else {
                    if (filterString === "all") {
                        $list.find("li").show();
                    } else {
                        $list.find("li").each(function() {
                            var $currentListItem = $(this);
                            if ($currentListItem.hasClass(filterString)) {
                                $currentListItem.show();
                            } else {
                                $currentListItem.hide();
                            }
                        });
                    }
                }
            }

        };

        return {
            init: filterList.init
        };

    };

})(jQuery);
