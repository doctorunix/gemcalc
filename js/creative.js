(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 48)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 48
    });

    // Closes responsive menu when a link is clicked
    $('.navbar-collapse>ul>li>a').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Collapse the navbar when page is scrolled
    $(window).scroll(function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    });

    // Scroll reveal calls
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);

    // Magnific popup calls
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

})(jQuery); // End of use strict

function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key) && evt.keyCode != 8) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function checkWhich() {
    var inny = $("#innyholder").find("input:last");
    if($("#output h3").text() != "") {
        return;
    }
    console.log(inny.attr("id"));
    switch (inny.attr("id")) {
        case "magdmg":
            inny.attr("type", "text");
            inny.addClass("maskInput");
            inny.attr("disabled", "disabled");
                inny.css("transform", "translateY(-35%");
                $("#innyholder").append("<input type='number' id='critdmg' class='input-control' pattern=\"\d*\" placeholder='critical damage'>");
                console.log("doing");
            break;
        case "critdmg":
            inny.attr("type", "text");
            inny.addClass("maskInput");
            inny.attr("disabled", true);
            doCalc();
            $("#dmgCalc").text("Reset");
            $("#dmgCalc").on("click", function () {
                resetDmg();
            });
            break;
    }
}

function resetDmg() {
    $("#critdmg").remove();
    $("#magdmg").val("");
    $("#magdmg").attr("disabled", false);
    $("#magdmg").css("transform", "translateY(0%)");
    $("#dmgCalc").text("Continue");
    $("#dmgCalc").off("click");
    $("#output h3").text("");
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function doCalc() {
    var magdmg = $("#magdmg").val();
    var critdmg = $("#critdmg").val();
    critdmg = critdmg / 100; //percentage to decimal
    var adjdmg = magdmg * 1.555556; //get damage while in shadow tower. Assumes 300 Mastery and 0% boost
    adjdmg = adjdmg * 4; //Multiplier for charged shot
    adjdmg = adjdmg * 2.5; //multiplier for emblem
    adjdmg = adjdmg * critdmg;
    var adder = (magdmg * 1.55556) * .1; //unsure of what they did here. Get emblem damage again based on damage in tower and 1% for ultra
    adjdmg = adjdmg * .01;
    adjdmg = adder + adjdmg;
    adjdmg = Math.floor(adjdmg);
    adjdmg = numberWithCommas(adjdmg);
    $("#output h3").text("Estimated Damage: " + adjdmg);
    console.log("Calculated");
}