"use strict";

(function($) {

    $.listFilter = function(options) {

        var filterList = {

            settings: $.extend({
                animate: false,
                filterOptionsList: $("ul#filter-list"),
                listToFilter: $("ul#list")
            }, options),

            init: function() {
                if (window.console) {
                    if (filterList.settings.filterOptionsList.length < 1) {
                        console.log("ERROR (listFilter): filterOptionsList option element not found");
                        return;
                    }
                    if (filterList.settings.listToFilter.length < 1) {
                        console.log("ERROR (listFilter): listToFilter option element not found");
                        return;
                    }
                }

                var filterOptions = filterList.settings.filterOptionsList.find("li");
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
                var $list = filterList.settings.listToFilter;

                if (window.console && $list.length < 1) {
                    console.log("WARNING (listFilter): listToFilter option does not have any <li> elements");
                }

                if (filterList.settings.animate) {
                    if (filterString === "all") {
                        $list.find("li").fadeIn(filterList.settings.speed);
                    } else {
                        $list.find("li").each(function() {
                            var $currentListItem = $(this);
                            if ($currentListItem.hasClass(filterString)) {
                                $currentListItem.fadeIn(filterList.settings.speed);
                            } else {
                                $currentListItem.fadeOut(filterList.settings.speed);
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
