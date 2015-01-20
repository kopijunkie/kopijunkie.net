$(document).ready(function() {

    "use strict";

    var path = window.location.pathname;
    var currentPageFile = path.split("/").pop();
    var currentPage = currentPageFile.split(".html").shift();
    var $navMenuLinks = $("a.nav-menu__link");

    $navMenuLinks.each(function() {
        var href = $(this).attr("href").split(".html").shift();
        if (href === currentPage) {
            $(this).parent().addClass("active");
        }
    });

    $("button#mobile-menu-toggle").on("click", function() {
        $("nav#nav-menu").slideToggle("slow");
    });

    switch (currentPage) {
        case "work":
            var portfolioFilter = $.listFilter({
                animate: true,
                speed: "slow",
                filterOptionsList: $("ul#filter-list"),
                listToFilter: $("ul#portfolio-list")
            });
            portfolioFilter.init();

            $(".carousel").slick({
                lazyLoad: "ondemand",
                autoplay: true,
                autoplaySpeed: 5000,
                infinite: true
            });

            break;
        case "contact":
            var contactForm = $.contactForm();
            $("input#send").on("click", function(event) {
                event.preventDefault();
                $("span.error-msg").hide();
                contactForm.validate();
            });
            break;
    }

    window.lastFmRecords.init({
        username: "KopiJunkie",
        count: 5,
        period: "lovedtracks",
        defaultthumb: "http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_large.png"
    });
    $("#lastfmrecords a").append("<span class='vinyl'></span>");
    $("#lastfmrecords a").hover(function() {
            $(this).children(".vinyl").stop(true,true).animate({"left": "78px"}, 500);
        }, function() {
            $(this).children(".vinyl").animate({"left": "28px"}, 500);
        }
    );

    var now = moment();
    $("#year").text(" " + now.year());

});
