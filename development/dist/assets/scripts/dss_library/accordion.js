/*global $, jQuery, setTimeout, DSS*/

(function ($, setTimeout, DSS) {
    "use strict";

    /**
     * Creates an Accordion
     * @requires {@link https://jquery.com/ jQuery}
     * @requires {@link http://ricostacruz.com/jquery.transit/ jQuery.Transit}
     * @requires com_dss_styles.css
     * @class
     * @memberof DSS
     * @param {Object} $accordionPanel The accordion html container
     * @param {Object} settings        Extra settings
     */
    DSS.Accordion = function ($accordionPanel, settings) {
        this.elements = {
            accordionPanel: $accordionPanel
        };
        this.settings = settings || {};

        var self = this;

        self.properties = {
            capsuleSelector: self.settings.capsuleSelector || ".accordion-capsule"
        };

        // Set-up panels and capsules
        self.elements.accordionPanel.addClass("dss-accordion-panel");
        self.elements.accordionCapsules = self.elements.accordionPanel.find(self.properties.capsuleSelector);
        self.elements.accordionCapsules.addClass("dss-accordion-capsule");

        $.extend(self.properties, {
            accordionCapsuleSize: self.elements.accordionCapsules.width(),
            accordionSize: self.elements.accordionCapsules.size(),
            accordionWidth: self.elements.accordionPanel.width(),
            animationDuration: self.settings.animationDuration || 500,
            locked: false,
            lockable: self.settings.lockable || true
        });

        // Calculate Spacing
        if (self.settings.expandedSpace) {
            self.properties.expandedSpace = self.settings.expandedSpace;
            self.properties.accordionSpacing = (self.properties.accordionWidth - self.properties.expandedSpace) / self.properties.accordionSize;
        } else if (self.settings.accordionSpacing) {
            self.properties.accordionSpacing = self.settings.accordionSpacing;
            self.properties.expandedSpace = self.properties.accordionWidth - self.properties.accordionSpacing * self.properties.accordionSize;
        } else {
            self.properties.expandedSpace = self.settings.expandedSpace || self.properties.accordionWidth * 0.4;
            self.properties.accordionSpacing = self.settings.accordionSpacing || (self.properties.accordionWidth - self.properties.expandedSpace) / self.properties.accordionSize;
        }

        self.elements.accordionCapsules.each(function (i) {
            var leftNudge = i * self.properties.accordionSpacing;
            $(this).css('left', leftNudge);
        });

        self.elements.accordionCapsules.on("click", function (e) {
            e.stopPropagation();
            var $thisPanel = $(this);
            if (!self.properties.locked) {
                self.accordionAction($thisPanel, self.properties.animationDuration);
            }
        });
    };

    /**
     * Processes the target accordion slider and moves the rest of the sliders
     *
     * @memberof DSS.Accordion
     *
     * @param {Object} $capsule The target slider
     * @param {Number} duration The animation duration
     */

    DSS.Accordion.prototype.accordionAction = function ($capsule, duration) {
        var self = this,
            thisIndex = $capsule.index(),
            $rightEls = self.elements.accordionCapsules.filter(":gt(" + thisIndex + ")"),
            $leftEls = self.elements.accordionCapsules.filter(":lt(" + thisIndex + ")").add($capsule),
            properties = {};

        properties = {
            capsuleId: $capsule.attr('id'),
            duration: duration
        };

        self.elements.accordionPanel.trigger({
            type: 'accordionAction',
            properties: properties
        });

        self.move($leftEls, 0, duration);
        self.move($rightEls, self.properties.expandedSpace, duration);

        self.elements.accordionCapsules.removeClass("active");
        $capsule.addClass("active");
    };

    /**
     * Animates the sliders
     *
     * @memberof DSS.Accordion
     *
     * @param {Object} $els     The target sliders to move
     * @param {Number} x        The distance to move
     * @param {Number} duration The animation duration
     */

    DSS.Accordion.prototype.move = function ($els, x, duration) {
        var self = this;

        self.lockOut(duration);

        $els.transition({
            x: x
        }, duration);
    };

    /**
     * Prevents interaction with the accordion for a specified duration
     *
     * @memberof DSS.Accordion
     *
     * @param {Number} duration The lockout duration
     */

    DSS.Accordion.prototype.lockOut = function (duration) {
        var self = this;

        if (!self.properties.locked && self.properties.lockable) {
            self.properties.locked = true;
            setTimeout(function () {
                self.properties.locked = false;
            }, duration);
        }
    };

}(jQuery, setTimeout, DSS));