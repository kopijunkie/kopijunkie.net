"use strict";

(function($) {

    $.contactForm = function() {

        var $formEl = $("#contact-form");

        var contactForm = {

            validate: function() {
                var errorCount = contactForm.validateValues();

                if (errorCount === 0) {
                    var formData = $formEl.serialize();
                    contactForm.sendMessage(formData);
                } else {
                    $(".form__input").on("keyup", function() {
                        var value = $(this).val().trim();
                        if (value.length > 1) {
                            $(this).removeClass("error");
                            var errorId = "#" + $(this).attr("id") + "-required";
                            $(errorId).hide();
                        } else {
                            $(this).addClass("error");
                        }
                    });
                }

            },

            validateValues: function() {
                var errorCount = 0;
                var $nameInput = $("#name");
                var name = $nameInput.val().trim();
                if (name.length === 0) {
                    errorCount++;
                    $nameInput.addClass("error");
                    $("#name-required").show();
                }

                var $emailInput = $("#email");
                var email = $emailInput.val().trim();
                var emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
                if (email.length === 0) {
                    errorCount++;
                    $emailInput.addClass("error");
                    $("#email-required").show();
                } else if (!emailRegex.test(email)) {
                    errorCount++;
                    $emailInput.addClass("error");
                    $("#email-error").show();
                }

                var $messageTextArea = $("#message");
                var message = $messageTextArea.val().trim();
                if (message.length === 0) {
                    errorCount++;
                    $messageTextArea.addClass("error");
                    $("#message-required").show();
                }

                var $spamCheckInput = $("#spam-check");
                var spamCheckValue = $spamCheckInput.val().trim();
                if (spamCheckValue.length === 0) {
                    errorCount++;
                    $spamCheckInput.addClass("error");
                    $("#spam-check-required").show();
                } else {
                    if (isNaN(spamCheckValue) || parseInt(spamCheckValue) !== 7) {
                        errorCount++;
                        $spamCheckInput.addClass("error");
                        $("#spam-check-error").show();
                    }
                }

                console.log(errorCount);
                return errorCount;
            },

            sendMessage: function(formData) {
                console.log("send message!", formData);
                // $.ajax({
                //     type: "POST",
                //     url: "send.php",
                //     data: formData,
                //     success: function() {
                //         $("form#contact-form").slideUp("slow").before(
                //         "<div class='success'><h2>Success!</h2>" +
                //         "<p>Thank you for your email. " +
                //         "I'll get back to you shortly.</p></div>");
                //     }
                // });
            }

        };

        return {
            validate: contactForm.validate
        };

    };

})(jQuery);