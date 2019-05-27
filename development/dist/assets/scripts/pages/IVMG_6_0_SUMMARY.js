/*globals $ */

$(".row").ready(
    function () {
        "use strict";

        var listItems = getAnimatingNode("fade-in-rows").find("div"),
            timeout = 250;
        
        // Main page light
        turnLightOn(getAnimatingNode("page-light"));

        // Fade in list items
        $.each(listItems, function (key, value) {
            setTimeout(function () {
                $(value).addClass("show");
            }, timeout * key);
        });
        
        IVA[0].modals.treatmentAlgorithm.extendOpen(function (e) {
            turnLightOn(getAnimatingNode("modal-light", IVA[0].modals.treatmentAlgorithm.elements.modal));
        });
        
        IVA[0].modals.treatmentAlgorithm.extendClose(function () {
            turnLightOff(getAnimatingNode("modal-light", IVA[0].modals.treatmentAlgorithm.elements.modal));
        });
    }
);