"use strict";

(function($) {

    $.imageCarousel = function(options) {

        var carousel = {

            settings: $.extend({
                slideWidth: 480,
                slideHeight: 162,
                speed: "slow",
                container: $("#carousel")
            }, options),

            init: function() {
                var currentPosition = 0;
                carousel.initialiseCarousel();

                var $carouselControls = carousel.settings.container.find(".control-btn");
                carousel.settings.container.find(".control-btn--prev").hide();

                $carouselControls.on("click", function(event) {
                    if ($(this).attr("id") === "next") {
                        currentPosition++;
                    } else {
                        currentPosition--;
                    }
                    carousel.manageControls(currentPosition);
                    console.log(currentPosition);
                    // FIXME: has bug
                    $(".carousel__slides").animate({
                        "marginLeft" : carousel.settings.slideWidth * currentPosition
                    });
                });
            },

            initialiseCarousel: function() {
                var $carousel = carousel.settings.container;
                $carousel.width(carousel.settings.slideWidth);
                $carousel.height(carousel.settings.slideHeight);
                var $slides = $carousel.find("li");
                $slides.wrapAll("<div class='carousel__slides'></div>")
                        .css("width", carousel.settings.slideWidth);
                $(".carousel__slides").css("width", carousel.settings.slideWidth * $slides.length);

                $carousel.prepend("<button class='control-btn control-btn--prev'>Previous</button>")
                            .append("<button class='control-btn control-btn--next'>Next</button>");
            },

            manageControls: function(position) {
                if (position === 0) {
                    $(".control-btn--prev").hide();
                } else {
                    $(".control-btn--prev").show();
                }
                if (position === this.slidesCount - 1) {
                    $(".control-btn--next").hide();
                } else {
                    $(".control-btn--next").show();
                }
            }

        };

        return {
            init: carousel.init
        };

    };

})(jQuery);
