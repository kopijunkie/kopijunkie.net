"use strict";

(function($) {

    $.contactForm = function() {

        var contactForm = {

            validate: function(formEl) {
                this.$formEl = formEl;
                console.log(this.formEl);

                // $carouselControls.on("click", function(event) {
                //     if ($(this).attr("id") === "next") {
                //         currentPosition++;
                //     }
                //     if ($(this).attr("id") === "prev") {
                //         currentPosition--;
                //     }
                //     carousel.manageControls(currentPosition);

                //     $(".carousel__slides").animate({
                //         "marginLeft" : carousel.settings.slideWidth * (-currentPosition)
                //     });
                // });

                var msgString = formEl.serialize();
                console.log(msgString);
            },

            sendMessage: function(message) {
                $.ajax({
                    type: "POST",
                    url: "send.php",
                    data: message,
                    success: function() {
                        $("form#contact-form").slideUp("slow").before(
                        "<div class='success'><h2>Success!</h2>" +
                        "<p>Thank you for your email. " +
                        "I'll get back to you shortly.</p></div>");
                    }
                });
            }

        };

        return {
            validate: contactForm.validate
        };

    };

})(jQuery);