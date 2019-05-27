/*globals $ */

$(".row").ready(
    function () {
        "use strict";
        
        var tableRows = getAnimatingNode("fade-in-rows").find(".row-content"),
            modals = IVA[0].modals;
        
        // Main page light
        turnLightOn(getAnimatingNode("page-light"));

        setTimeout(function () {
            // Animate arrow
            getAnimatingNode("grow-arrow").addClass("grow");

            // Fade in rows
            $.each(tableRows, function (key, value) {
                setTimeout(function () {
                    $(value).find(".cell-wrapper").addClass("show");
                }, 150 * key);
            });
        }, 500);
        
        modals.failureModal.elements.modal.find("[data-toggle]").on("click", function (e) {
            togglePageContent($(e.currentTarget));
        });
        
        // Modal light
        modals.failureModal.extendOpen(function (e) {
            turnLightOn(getAnimatingNode("modal-light", modals.failureModal.elements.modal));
        })
        
        modals.failureModal.extendClose(function () {
            turnLightOff(getAnimatingNode("modal-light", modals.failureModal.elements.modal));
        });
        
        modals.igaModerateModal.extendOpen(function () {
            igaModalOn(modals.igaModerateModal.elements.modal);
        })
        
        modals.igaModerateModal.extendClose(function () {
            igaModalOff(modals.igaModerateModal.elements.modal);
        });
        
        modals.igaSevereModal.extendOpen(function () {
            igaModalOn(modals.igaSevereModal.elements.modal);
        })
        
        modals.igaSevereModal.extendClose(function () {
            igaModalOff(modals.igaSevereModal.elements.modal);
        });
        
        function igaModalOn(modal) {
            var modalTableRows = getAnimatingNode("fade-in-modal-rows").find(".row"),
                timeout = 150;
            
            turnLightOff(getAnimatingNode("modal-light", modal));

            $.each(modalTableRows, function (key, value) {
                setTimeout(function () {
                    $(value).find(".text-cell").addClass("show");
                }, timeout * key);
            });
            
            setTimeout(function () {
                turnLightOn(getAnimatingNode("modal-light", modal));
            }, timeout * modalTableRows.length);
        }
        
        function igaModalOff(modal) {
            getAnimatingNode("fade-in-modal-rows").find(".text-cell").removeClass("show");
            turnLightOff(getAnimatingNode("modal-light", modal));
        }
    }
);