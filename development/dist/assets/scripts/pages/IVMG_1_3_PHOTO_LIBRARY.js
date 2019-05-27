/*globals $ */

$(".row").ready(
    function () {
        "use strict";
        
        var timeout = 250;
        
        // Main page light
        turnLightOn(getAnimatingNode("page-light"));
        
        // Slide in photos
        $.each(getAnimatingNode("slide-in-photos"), function (key, value) {
            setTimeout(function () {
                $(value).addClass("show");
            }, timeout);
        });
    }
);