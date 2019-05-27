/*global $, jQuery, setTimeout, DSS*/

(function ($, setTimeout, DSS) {
    "use strict";

    /**
     * Creates a panel flipper
     * @requires {@link https://jquery.com/ jQuery}
     * @requires {@link http://ricostacruz.com/jquery.transit/ jQuery.Transit}
     * @requires com_dss_styles.css
     * @class
     * @memberof DSS
     * @param {Object}  $flipPanel                       The panel wrapper
     * @param {Object}  settings                         Extra Settings
     *
     * @param {Object}  settings.frontButton            Goes to the front page when pressed
     * @param {Object}  settings.backButton             Goes to the back page when pressed
     * @param {Number}  settings.animationDuration      in milliseconds, default is '800'
     * @param {String}  settings.animationPerspective   in pixels, default is '1900px'
     * @param {Boolean} settings.lockable Whether       interactions can be locked in this object, default is 'true'
     */

    DSS.PageFlip = function ($flipPanel, settings) {

        this.elements = {
            panel: $flipPanel
        };
        this.settings = settings || {};

        var self = this;

        $.extend(self.elements, {
            front: self.elements.panel.children(".front"),
            back: self.elements.panel.children(".back")
        });

        $.extend(self.elements, {
            cards: self.elements.back.add(self.elements.front),
            frontButton: self.settings.frontButton || self.elements.back,
            backButton: self.settings.backButton || self.elements.front
        });

        self.properties = {
            animationDuration: self.settings.animationDuration || 800,
            flipPerspective: self.settings.animationPerspective || '1900px',
            panelWidth: self.elements.front.width(),
            panelHeight: self.elements.front.height(),
            locked: false,
            lockable: self.settings.lockable || true
        };

        // Wrap In Container
        self.elements.panel.wrap("<div class='dss-flip-panel-container' />");
        self.elements.flippingContainer = self.elements.panel.parent(".dss-flip-panel-container");

        // Setup Container
        self.elements.flippingContainer.css('-webkit-perspective', self.properties.flipPerspective);

        // Setup Panel
        self.elements.panel.addClass("dss-flip-panel").css({
            'width': self.properties.panelWidth,
            'height': self.properties.panelHeight
        });

        // Setup Cards and Shadow
        self.elements.cards.addClass("dss-flip-card");
        self.elements.back.css('-webkit-transform', 'rotateX(180deg)');
        self.elements.front.append('<div class="dss-flip-shadow" />');
        self.elements.flipShadow = self.elements.panel.find(".dss-flip-shadow");

        // Setup Panel Shadow
        self.elements.flippingContainer.append("<div class='dss-flip-panel-shadow'><div></div></div>");
        self.elements.flipPanelShadow = self.elements.flippingContainer.children(".dss-flip-panel-shadow");

        // Initialize to Front
        self.gotoFront(0);
        self.elements.front.addClass("active");

        // Bind Buttons
        self.elements.backButton.on("click", function (e) {
            e.stopPropagation();
            if (!self.properties.locked) {
                self.gotoBack(self.properties.animationDuration);
            }
        });

        self.elements.frontButton.on("click", function (e) {
            e.stopPropagation();
            if (!self.properties.locked) {
                self.gotoFront(self.properties.animationDuration);
            }
        });
    };

    /**
     * Rotates the panel
     * @memberof DSS.PageFlip
     * @param {Number} deg      The degree to rotate
     * @param {Number} duration The animation duration
     */

    DSS.PageFlip.prototype.flip = function (deg, duration) {
        var self = this;

        self.lockOut(duration);

        self.elements.flipPanelShadow.transition({
            rotateX: '90deg',
            scaleY: '2'
        }, duration / 2).transition({
            rotateX: '90deg',
            scaleY: '1'
        }, duration / 2);

        self.elements.cards.filter(".active").removeClass("active").siblings(".dss-flip-card").addClass("active");

        self.elements.panel.transition({
            rotateX: deg
        }, duration);
    };

    /**
     * Fades a panel
     * @memberof DSS.PageFlip
     * @param {Object} target   The target to fade
     * @param {Number} duration The animation duration
     */

    DSS.PageFlip.prototype.shadowFade = function (target, duration) {

        target.css("display", "block").transition({
            opacity: 0.6
        }, duration / 2).transition({
            opacity: 0
        }, duration / 2, function () {
            target.css("display", "none");
        });
    };

    /**
     * Flips to the back of the panel
     * @memberof DSS.PageFlip
     * @param {Number} duration The animation duration
     */

    DSS.PageFlip.prototype.gotoBack = function (duration) {
        var self = this;

        self.flip('-180deg', duration);
        self.shadowFade(self.elements.front.find(self.elements.flipShadow), duration);
    };

    /**
     * Flips to the front of the panel
     * @memberof DSS.PageFlip
     * @param {Number} duration The animation duration
     */

    DSS.PageFlip.prototype.gotoFront = function (duration) {
        var self = this;

        self.flip('0deg', duration);
        self.shadowFade(self.elements.front.find(self.elements.flipShadow), duration);
    };

    /**
     * Flips to the panel forward
     * @memberof DSS.PageFlip
     * @param {Number} duration The animation duration
     */

    DSS.PageFlip.prototype.flipForward = function (duration) {
        var self = this;

        self.flip('+=180deg', duration);
        self.shadowFade(self.elements.cards.filter(".active").find(self.elements.flipShadow), duration);
    };

    /**
     * Flips to the panel backward
     * @memberof DSS.PageFlip
     * @param {Number} duration The animation duration
     */

    DSS.PageFlip.prototype.flipBackward = function (duration) {
        var self = this;

        self.flip('-=180deg', duration);
        self.shadowFade(self.elements.cards.not(".active").find(self.elements.flipShadow), duration);
    };

    /**
     * Prevents interactions with the panel for a specified
     * duration
     * @memberof DSS.PageFlip
     * @param {Number} duration The lockout duration
     */

    DSS.PageFlip.prototype.lockOut = function (duration) {
        var self = this;

        if (!self.properties.locked && self.properties.lockable) {
            self.properties.locked = true;
            setTimeout(function () {
                self.properties.locked = false;
            }, duration);
        }
    };


}(jQuery, setTimeout, DSS));