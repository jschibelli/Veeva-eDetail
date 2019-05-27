/*global $, jQuery, DSS, setTimeout*/

(function ($, DSS) {
    "use strict";

    /**
     * Creates a modal
     * @requires {@link https://jquery.com/ jQuery}
     * @requires {@link http://ricostacruz.com/jquery.transit/ jQuery.Transit}
     * @requires com_dss_styles.css
     * @class
     * @memberof DSS
     * @param {Object} $modal      The modal wrapper
     * @param {Object} $openButton The element(s) that open the modal
     * @param {Object} settings    Extra Settings
     */

    DSS.Modal = function ($modal, $openButton, settings) {

        this.elements = {
            modal: $modal,
            openButton: $openButton
        };
        this.settings = settings || {};

        var self = this;

        self.properties = {
            locked: false,
            background: self.settings.background || false,
            animationDuration: self.settings.animationDuration || 300,
            modalResetState: {
                '-webkit-transform': 'translateY(100px)'
            }
        };

        self.openExtendFunctions = [];
        self.closeExtendFunctions = [];

        self.elements.modal.addClass('.dss-modal').css(self.properties.modalResetState);

        self.elements.modal.wrap("<div class='dss-modal-container' />");


        $.extend(self.elements, {
            closeButton: self.settings.closeButton || self.elements.modal.find(".close-button"),
            modalContainer: self.elements.modal.parent(".dss-modal-container")
        });

        if (self.properties.background) {
            self.elements.modalContainer.css('background', self.properties.background);
        }

        /*self.elements.modalContainer.on("touchmove", function (e) {
            e.preventDefault();
        });*/

        self.elements.closeButton.on("click", function (e) {
            e.stopPropagation();
            if (!self.properties.locked) {
                self.closeModal(self.settings.animationDuration);
            }
        });
        self.elements.openButton.on("click", function (e) {
            e.stopPropagation();
            if (!self.properties.locked) {
                self.openModal(self.settings.animationDuration);
            }
        });
    };


    /**
     * Extends the function queue that fires when the modal is opened
     * @memberof DSS.Modal
     * @param {Function} func the function to extend open
     */
    DSS.Modal.prototype.extendOpen = function (func) {
        var self = this;

        self.openExtendFunctions.push(func);
    };

    /**
     * Extends the function queue that fires when the modal is closed
     * @memberof DSS.Modal
     * @param {Function} func the function to extend close
     */
    DSS.Modal.prototype.extendClose = function (func) {
        var self = this;

        self.closeExtendFunctions.push(func);
    };

    /**
     * Opens the modal
     * @memberof DSS.Modal
     * @param {Number} duration the animation duration
     */

    DSS.Modal.prototype.openModal = function (duration) {
        var self = this,
            i,
            dur = duration || this.properties.animationDuration;

        self.lockOut(dur);

        // Disable swiping
        DSS.navigation.disableSwipe();

        self.elements.modalContainer.transition({
            opacity: 1
        }, dur).css({
            'display': 'block'
        });

        $("[data-content]").addClass("modal-index");

        self.elements.modal.transition({
            y: 0
        }, dur * 2, 'snap');

        for (i = self.openExtendFunctions.length - 1; i >= 0; i -= 1) {
            self.openExtendFunctions[i]();
        }
    };

    /**
     * Closes the modal
     * @memberof DSS.Modal
     * @param {Number} duration the animation duration
     */

    DSS.Modal.prototype.closeModal = function (duration) {
        var self = this,
            i,
            dur = duration || this.properties.animationDuration;

        self.lockOut(dur);

        // Enable swiping
        DSS.navigation.enableSwipe();

        self.elements.modalContainer.css({
            'display': 'none'
        }).transition({
            opacity: 0
        }, dur, function () {
            self.elements.modal.css(self.properties.modalResetState);
        });

        $("[data-content]").removeClass("modal-index");

        for (i = self.closeExtendFunctions.length - 1; i >= 0; i -= 1) {
            self.closeExtendFunctions[i]();
        }
    };

    /**
     * Prevents interactions with the panel for a specified
     * duration
     * @memberof DSS.Modal
     * @param {Number} duration The lockout duration
     */

    DSS.Modal.prototype.lockOut = function (duration) {
        var self = this;

        if (!self.properties.locked) {
            self.properties.locked = true;
            setTimeout(function () {
                self.properties.locked = false;
            }, duration);
        }
    };

    /**
     * DSS Video Modal
     * @requires {@link https://jquery.com/ jQuery}
     * @requires {@link DSS.Modal}
     * @class
     * @augments DSS.Modal
     * @memberof DSS
     * @param {Object} $modal      The modal wrapper
     * @param {Object} $openButton The element(s) that open the modal
     * @param {Object} settings    Extra Settings
     */
    DSS.VideoModal = function ($modal, $openButton, settings) {

        DSS.Modal.call(this, $modal, $openButton, settings);

        var self = this;

        $.extend(self.elements, {
            video: self.settings.videoElement || self.elements.modal.find("video")[0]
        });

        self.extendClose(function () {
            self.elements.video.pause();
            self.elements.video.currentTime = 0;
        });
    };

    DSS.VideoModal.prototype = Object.create(DSS.Modal.prototype);
    DSS.VideoModal.prototype.constructor = DSS.VideoModal;

    /**
     * DSS Zoom Modal
     * @requires {@link https://jquery.com/ jQuery}
     * @requires {@link DSS.Modal}
     * @class
     * @augments DSS.Modal
     * @memberof DSS
     * @param {Object} $modal      The modal wrapper
     * @param {Object} $openButton The element(s) that open the modal
     * @param {Object} $zoomEls    The element(s) that get zoomed
     * @param {Object} settings    Extra Settings
     */

    DSS.ZoomModal = function ($modal, $openButton, $zoomEls, settings) {
        var self = this;

        DSS.Modal.call(this, $modal, $openButton, settings);

        $.extend(self.elements, {
            zoomEls: $zoomEls
        });
    };

    DSS.ZoomModal.prototype = Object.create(DSS.Modal.prototype);
    DSS.ZoomModal.prototype.constructor = DSS.ZoomModal;


}(jQuery, DSS));