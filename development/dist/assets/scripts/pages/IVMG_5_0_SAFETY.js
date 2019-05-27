/*globals $ */

$(".row").ready(
    function () {
        "use strict";
        
        // Main page light
        turnLightOn(getAnimatingNode("page-light"));
        fadeInCaption();
        
        $("#chartOneBtn").on("touchstart", function () {
            $("[data-toggle]").addClass("erythema-chart").removeClass("stinging-chart");
            $(".chart-nav div").removeClass("active");
            $(this).addClass("active");
            //fadeInCaption();
        });
        $("#chartTwoBtn").on("touchstart", function () {
            $("[data-toggle]").removeClass("erythema-chart").addClass("stinging-chart");
            $(".chart-nav div").removeClass("active");
            $(this).addClass("active");
            //fadeInCaption();
        });
        
        IVA[0].modals.howToModal.extendOpen(function (e) {
            turnLightOn(getAnimatingNode("modal-light", IVA[0].modals.howToModal.elements.modal));
            getAnimatingNode("modal-fade-in").addClass("show");
        });
        
        IVA[0].modals.howToModal.extendClose(function () {
            turnLightOff(getAnimatingNode("modal-light", IVA[0].modals.howToModal.elements.modal));
            getAnimatingNode("modal-fade-in").removeClass("show");
        });
        
        function fadeInCaption() {
            var caption = getAnimatingNode("fade-in-caption");

            if (caption.hasClass("show")) {
                caption.removeClass("show");
                caption.addClass("dont-shift");
                
                setTimeout(function() {
                    caption.removeClass("dont-shift");
                    
                    setTimeout(function () {
                        caption.addClass("show");
                    }, 100);
                }, 100);
            } else {
                caption.addClass("show");
            }
        }
    }
);