/*global $, jQuery, setTimeout, DSS*/

(function ($, setTimeout, DSS) {
    "use strict";

    /**
     * Creates a cube rotator
     * @requires {@link https://jquery.com/ jQuery}
     * @requires {@link http://ricostacruz.com/jquery.transit/ jQuery.Transit}
     * @requires com_dss_styles.css
     * @class
     * @memberof DSS
     * @param {Object}  $cubePanel                      The cube wrapper
     * @param {Object}  settings                        Extra Settings
     *
     * @param {Object}  settings.leftButton             Goes to the left page when pressed, default is the left card
     * @param {Object}  settings.rightButton            Goes to the right page when pressed, default is the right card
     * @param {Number}  settings.animationDuration      in milliseconds, default is '700'
     * @param {String}  settings.animationPerspective   in pixels, default is '1900px'
     * @param {Boolean} settings.lockable Whether       interactions can be locked in this object, default is 'true'
     */

    DSS.Cube = function ($cubePanel, settings) {

        this.elements = {
            panel: $cubePanel
        };
        this.settings = settings || {};

        var self = this;

        $.extend(self.elements, {
            left: self.elements.panel.children(".left"),
            right: self.elements.panel.children(".right")
        });

        $.extend(self.elements, {
            cards: self.elements.left.add(self.elements.right)
        });

        self.properties = {
            animationDuration: self.settings.animationDuration || 700,
            cubePerspective: self.settings.animationPerspective || '2500px',
            panelWidth: self.elements.left.width(),
            panelHeight: self.elements.left.height(),
            locked: false,
            lockable: self.settings.lockable || true
        };

        // Wrap In Container
        self.elements.panel.wrap("<div/>");
        self.elements.cubeContainer = self.elements.panel.parent("div");

        // Setup Container
        self.elements.cubeContainer.css({
            '-webkit-perspective': self.properties.cubePerspective,
            '-webkit-transform': 'scale(0.75)'
        });

        // Setup Panel
        self.properties.panelTransY = (100 - self.properties.panelWidth / 10);
        self.elements.panel.addClass("dss-cube-panel");
        self.elements.panel.css({
            'width': self.properties.panelWidth,
            'height': self.properties.panelHeight,
            '-webkit-transform': 'translateY(' + self.properties.panelTransY + 'px)'
        });

        // Setup Cards and Shadow
        self.elements.cards.addClass("dss-cube-card");
        self.elements.right.css({
            '-webkit-transform': 'translateX(' + (self.properties.panelWidth / 2) + 'px) ' +
                'rotateY(90deg)'
        });
        self.elements.left.css({
            '-webkit-transform': 'translateZ(' + (self.properties.panelWidth / 2) + 'px) '
        });
        self.elements.cards.append('<div class="dss-cube-flip-shadow" />');
        self.elements.cubeFlipShadow = self.elements.cards.children(".dss-cube-flip-shadow");

        // Setup Drop Shadow
        self.elements.panel.append('<div class="dss-cube-drop-shadow"><div></div></div>');
        self.elements.cubeDropShadow = self.elements.panel.children(".dss-cube-drop-shadow");
        self.elements.cubeDropShadow.css({
            'width': self.properties.panelWidth,
            'height': self.properties.panelWidth,
            '-webkit-transform': 'rotateX(90deg) translateZ(-' + (self.properties.panelWidth / 2) + 'px)'
        }).children("div").css({
            '-webkit-box-shadow': '0px 0px ' +
                (self.properties.panelWidth / 6) + "px " +
                (self.properties.panelWidth / 2) + "px " +
                '#000'
        });

        // Initialize to Left
        setTimeout(function () {
            self.gotoLeft(800);
        }, 800);

        $.extend(self.elements, {
            leftButton: self.settings.leftButton || self.elements.left.children(".dss-cube-flip-shadow"),
            rightButton: self.settings.rightButton || self.elements.right.children(".dss-cube-flip-shadow")
        });

        // Bind Buttons
        self.elements.leftButton.on("click", function (e) {
            e.stopPropagation();
            if (!self.properties.locked) {
                self.gotoLeft(self.properties.animationDuration);
            }
        });

        self.elements.rightButton.on("click", function (e) {
            e.stopPropagation();
            if (!self.properties.locked) {
                self.gotoRight(self.properties.animationDuration);
            }
        });
    };

    /**
     * Rotates the cube
     * @memberof DSS.Cube
     * @param {Number} deg      The degree to rotate
     * @param {Number} duration The animation duration
     */

    DSS.Cube.prototype.move = function (deg, duration) {
        var self = this;

        self.lockOut(duration);

        self.elements.panel.transition({
            y: self.properties.panelTransY,
            rotateY: deg
        }, duration);

        self.elements.cards.not(".active").children(".dss-cube-flip-shadow").css("display", "block").transition({
            opacity: 0.6
        }, duration);

        self.elements.cards.filter(".active").children(".dss-cube-flip-shadow").transition({
            opacity: 0
        }, duration, function () {
            self.elements.cards.filter(".active").children(".dss-cube-flip-shadow").css("display", "none");
        });
    };

    /**
     * Rotates the cube to view the left side
     * @memberof DSS.Cube
     * @param {Number} duration The animation duration
     */

    DSS.Cube.prototype.gotoLeft = function (duration) {
        var self = this;

        self.elements.cards.removeClass("active");
        self.elements.left.addClass("active");
        self.move('-20deg', duration);
    };

    /**
     * Rotates the cube to view the right side
     * @memberof DSS.Cube
     * @param {Number} duration The animation duration
     */

    DSS.Cube.prototype.gotoRight = function (duration) {
        var self = this;

        self.elements.cards.removeClass("active");
        self.elements.right.addClass("active");
        self.move('-70deg', duration);
    };

    /**
     * Prevents interactions with the cube for a specified
     * duration
     * @memberof DSS.Cube
     * @param {Number} duration The lockout duration
     */

    DSS.Cube.prototype.lockOut = function (duration) {
        var self = this;

        if (!self.properties.locked && self.properties.lockable) {
            self.properties.locked = true;
            setTimeout(function () {
                self.properties.locked = false;
            }, duration);
        }
    };


}(jQuery, setTimeout, DSS));