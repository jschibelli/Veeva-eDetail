/*globals $ */

$(".row").ready(
    function () {
        "use strict";
        
        var buttons,
            modals = IVA[0].modals,
            timeout = 200;
        
        section3Animations("efficacyPage");
        
        // Toggle
        $("#efficacyPageContent").find("[data-toggle]").on("click", function (e) {
            slideOutButtons(buttons, timeout);
            
            setTimeout(function () {
                togglePageContent($(e.currentTarget), $("#efficacyPageContent"));
                section3Animations($(e.currentTarget).data("toggle"));
            }, timeout * buttons.length);
        });
        
        // Modal light
        modals.takeoverItt.extendOpen(function (e) {
            var modalVehicleLine = getAnimatingNode("modal-chart-animation").find(".vehicle_line"),
                modalForteLine = getAnimatingNode("modal-chart-animation").find(".forte_line");
        
            runChartAnim(modalVehicleLine, 607);
            runChartAnim(modalForteLine, 621);
            
            turnLightOn(getAnimatingNode("modal-light", modals.takeoverItt.elements.modal));
        })
        
        modals.takeoverItt.extendClose(function () {
            turnLightOff(getAnimatingNode("modal-light", modals.takeoverItt.elements.modal));
        });
        
        modals.takeoverIttPhotoModal.extendOpen(function (e) {
            turnLightOn(getAnimatingNode("modal-light", modals.takeoverIttPhotoModal.elements.modal));
            
            modals.takeoverIttPhotoModal.elements.modal.find("[data-toggle]").off("click").on("click", function (e) {
                togglePageContent($(e.currentTarget), modals.takeoverIttPhotoModal.elements.modal.find(".photo-row"));
            });
        })
        
        modals.takeoverIttPhotoModal.extendClose(function () {
            turnLightOff(getAnimatingNode("modal-light", modals.takeoverIttPhotoModal.elements.modal));
        });
        
        modals.takeoverIttPhotoModal2.extendOpen(function (e) {
            turnLightOn(getAnimatingNode("modal-light", modals.takeoverIttPhotoModal2.elements.modal));
            
            modals.takeoverIttPhotoModal2.elements.modal.find("[data-toggle]").off("click").on("click", function (e) {
                togglePageContent($(e.currentTarget), modals.takeoverIttPhotoModal2.elements.modal.find(".photo-row"));
            });
        })
        
        modals.takeoverIttPhotoModal2.extendClose(function () {
            turnLightOff(getAnimatingNode("modal-light", modals.takeoverIttPhotoModal2.elements.modal));
        });
        
        modals.adapaleneComparison_3_0_3.extendOpen(function (e) {
            turnLightOn(getAnimatingNode("modal-light", modals.adapaleneComparison_3_0_3.elements.modal));
            
            modals.adapaleneComparison_3_0_3.elements.modal.find("[data-toggle]").off("click").on("click", function (e) {
                turnLightOff(getAnimatingNode("modal-light", modals.adapaleneComparison_3_0_3.elements.modal));
                togglePageContent($(e.currentTarget), modals.adapaleneComparison_3_0_3.elements.modal);
                
                setTimeout(function () {
                    turnLightOn(getAnimatingNode("modal-light", modals.adapaleneComparison_3_0_3.elements.modal));
                }, timeout / 2);
            });
        })
        
        modals.adapaleneComparison_3_0_3.extendClose(function () {
            turnLightOff(getAnimatingNode("modal-light", modals.adapaleneComparison_3_0_3.elements.modal));
            togglePageContent($("[data-toggle=\"adapaleneModalSection\"]"), modals.adapaleneComparison_3_0_3.elements.modal);
        });
        
        function section3Animations(id) {
            buttons = getAnimatingNode("page-slide-light", $("#" + id));

            setTimeout(function () {
                // Main page light
                turnLightOn(getAnimatingNode("page-light"), $("#" + id));

                // Button animations
                slideInButtons(buttons, timeout);

                var vehicleLine = getAnimatingNode("page-chart-animation", $("#" + id)).find(".vehicle_line"),
                    forteLine = getAnimatingNode("page-chart-animation", $("#" + id)).find(".forte_line");

                runChartAnim(vehicleLine, 607);
                runChartAnim(forteLine, 621);
            }, 300);
        }
    }
);