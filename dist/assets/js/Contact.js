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
                        var requiredError = "#" + $(this).attr("id") + "-required";
                        var invalidValueError = "#" + $(this).attr("id") + "-invalid";
                        var value = $(this).val().trim();

                        if (value.length > 0) {
                            $(this).removeClass("error");
                            $(requiredError).hide();
                            $(invalidValueError).hide();
                        } else {
                            $(this).addClass("error");
                            $(invalidValueError).hide();
                            $(requiredError).show();
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
                    $("#email-invalid").show();
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
                        $("#spam-check-invalid").show();
                    }
                }

                return errorCount;
            },

            sendMessage: function(formData) {
                console.log("send message!", formData);
                $formEl.slideUp("slow");
                $(".success-msg").slideDown("slow");
                $.ajax({
                    type: "POST",
                    url: "send.php",
                    data: formData,
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