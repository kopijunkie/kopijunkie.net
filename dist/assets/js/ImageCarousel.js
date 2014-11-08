"use strict";

(function($) {

    $.imageCarousel = function(options) {

        var carousel = {

            settings: $.extend({
                slideWidth: 480,
                slideHeight: "auto",
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
                    }
                    if ($(this).attr("id") === "prev") {
                        currentPosition--;
                    }
                    carousel.manageControls(currentPosition);

                    $(".carousel__slides").animate({
                        "marginLeft" : carousel.settings.slideWidth * (-currentPosition)
                    });
                });
            },

            initialiseCarousel: function() {
                var $carousel = carousel.settings.container;
                $carousel.width(carousel.settings.slideWidth);
                if (carousel.settings.slideHeight !== "auto") {
                    $carousel.height(carousel.settings.slideHeight + 1);
                }

                var $slides = $carousel.find("li");
                $slides.wrapAll("<div class='carousel__slides'></div>")
                        .css({
                            "width": carousel.settings.slideWidth,
                            "height": carousel.settings.slideHeight
                        });
                $(".carousel__slides").css("width", carousel.settings.slideWidth * $slides.length);

                $carousel.prepend("<button class='control-btn control-btn--prev' id='prev'>Previous</button>")
                            .append("<button class='control-btn control-btn--next' id='next'>Next</button>");
            },

            manageControls: function(position) {
                var $prevButton = $(".control-btn--prev");
                var $nextButton = $(".control-btn--next");
                var $slides = carousel.settings.container.find("li");
                var slidesCount = $slides.length;

                if (position === 0) {
                    $prevButton.hide();
                } else {
                    $prevButton.show();
                }
                if (position === slidesCount - 1) {
                    $nextButton.hide();
                } else {
                    $nextButton.show();
                }
            }

        };

        return {
            init: carousel.init
        };

    };

})(jQuery);
