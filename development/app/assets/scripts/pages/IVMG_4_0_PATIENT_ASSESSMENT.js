/*globals $ */

$(".row").ready(
    function () {
        "use strict";
        
        var toggleContent = getAnimatingNode("fade-toggle").children('article'),
            modals = IVA[0].modals,
            curTarget,
            timeout;
        
        // Main page light
        turnLightOn(getAnimatingNode("page-light"));
        
        // Toggle functionality

        toggleContent.on("click", function (event) {
            curTarget = $(this);
            
            clearTimeout(timeout);
            
            timeout = setTimeout(function () {
                if (curTarget.hasClass('active')) {
                    return false;
                }
                toggleContent.not(curTarget).removeClass('active').addClass('blur');

                curTarget.removeClass('blur').addClass('active');
            }, 75);
        });
        
        modals.takeoverSeverePhotoModal.extendOpen(function (e) {
            turnLightOn(getAnimatingNode("modal-light", modals.takeoverSeverePhotoModal.elements.modal));  
            
            modals.takeoverSeverePhotoModal.elements.modal.find("[data-toggle]").off("click").on("click", function (e) {
                togglePageContent($(e.currentTarget), modals.takeoverSeverePhotoModal.elements.modal.find(".photo-row"));
            });
        });
        
        modals.takeoverSeverePhotoModal.extendClose(function () {
            turnLightOff(getAnimatingNode("modal-light", modals.takeoverSeverePhotoModal.elements.modal));
        });
    }
);