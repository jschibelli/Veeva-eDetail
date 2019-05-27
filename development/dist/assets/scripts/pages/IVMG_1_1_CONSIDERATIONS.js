/*globals $ */

$(".row").ready(
    function () {
        "use strict";

        var pageCells = getAnimatingNode("fade-in-cells").find(".cell"),
            timeout = 100;

        $.each(pageCells, function (key, value) {
            setTimeout(function () {
                $(value).addClass("show");
            }, timeout * key);
        });

        setTimeout(function () {
            turnLightOn(getAnimatingNode("page-light"));
        }, timeout * pageCells.length);
        
        IVA[0].modals.treatmentAlgorithm.extendOpen(function (e) {
            turnLightOn(getAnimatingNode("modal-light", IVA[0].modals.treatmentAlgorithm.elements.modal));
        });
        
        IVA[0].modals.treatmentAlgorithm.extendClose(function () {
            turnLightOff(getAnimatingNode("modal-light", IVA[0].modals.treatmentAlgorithm.elements.modal));
        });
    }
);