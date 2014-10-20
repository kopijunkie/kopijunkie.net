"use strict";

var s,
    PortfolioFilter = {

    settings: {
        filters: [],
        portfolioListItems: $("#portfolio-list li"),
        filterListItems: $("#filter-list li")
    },

    init: function() {
        s = this.settings;
        this.bindUIActions();
    },

    bindUIActions: function() {
        s.filterListItems.on("click", function() {
            PortfolioFilter.filterBy(this.text().toLowerCase());
        });
    },

    filterBy: function(filterString) {
        s.portfolioListItems.each(function(index) {
            console.log( index + ": " + $( this ).text() );

            if ($(this).hasClass(filterString)) {
                $(this).addClass("hide");
            } else {
                $(this).removeClass("hide");
            }
        });
    }

};
"use strict";

(function($) {

    $.PortfolioFilter.init();

})(jQuery);