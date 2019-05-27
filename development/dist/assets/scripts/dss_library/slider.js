/*global $, jQuery, setTimeout, DSS*/

(function ($, setTimeout, DSS) {
    "use strict";

    /**
     * Creates a slider panel
     * @requires {@link https://jquery.com/ jQuery}
     * @requires {@link http://ricostacruz.com/jquery.transit/ jQuery.Transit}
     * @requires com_dss_styles.css
     * @class
     * @memberof DSS
     * @param {Object}  $sliderPanel                    The panel wrapper
     * @param {Object}  settings                        Extra Settings
     *
     * @param {Number}  settings.animationDuration      in milliseconds, default is '800'
     * @param {Boolean} settings.lockable               Whether interactions can be locked in this object, default is 'true'
     */

    DSS.Slider = function ($sliderPanel, settings) {

        this.elements = {
            panel: $sliderPanel
        };
        this.settings = settings || {};

        var self = this,
            numCards;

        $.extend(self.elements, {
            cards: self.elements.panel.children(".card"),
            buttons: self.elements.panel.find("[data-slide-nav]")
        });

        self.properties = {
            animationDuration: self.settings.animationDuration || 1000,
            panelWidth: self.elements.cards.width(),
            panelHeight: self.elements.cards.height(),
            locked: false,
            lockable: self.settings.lockable || true
        };

        numCards = self.elements.cards.length;

        // Setup Panel
        self.elements.panel.addClass("dss-slide-panel");
        self.elements.panel.css({
            'width': self.properties.panelWidth,
            'height': self.properties.panelHeight
        });

        // Setup Cards and Card Container
        self.elements.cards.wrapAll("<div class='dss-slide-card-wrap' />");
        self.elements.slideCardWrap = self.elements.panel.find(".dss-slide-card-wrap");
        self.elements.slideCardWrap.css({
            'width': self.properties.panelWidth,
            'height': self.properties.panelHeight * numCards
        });

        self.elements.cards.addClass("dss-slide-card").each(function (index) {
            $(this).css({
                '-webkit-transform': 'translateY(' + self.properties.panelHeight * index + 'px)'
            });
        });

        // Bind Buttons
        self.elements.buttons.on("click", function (e) {
            e.stopPropagation();

            var page = $(this).data("slide-nav"),
                properties;

            if (!self.properties.locked) {
                self.move(page, self.properties.animationDuration);

                properties = {
                    page: page,
                    duration: self.properties.animationDuration
                };

                self.elements.panel.trigger({
                    type: 'slidePanelMove',
                    properties: properties
                });
            }
        });
    };

    /**
     * Moves the slider to the target panel
     * @memberof DSS.Slider
     * @param {String} pageID       The target page ID
     * @param {Number} duration     The animation duration
     */

    DSS.Slider.prototype.move = function (pageID, duration) {
        var self = this,
            location;

        location = -self.elements.cards.index($("#" + pageID)) * self.properties.panelHeight;

        self.lockOut(duration);

        self.elements.slideCardWrap.transition({
            y: location
        }, duration, 'snap');
    };

    /**
     * Prevents interactions with the panel for a specified
     * duration
     * @memberof DSS.Slider
     * @param {Number} duration The lockout duration
     */

    DSS.Slider.prototype.lockOut = function (duration) {
        var self = this;

        if (!self.properties.locked && self.properties.lockable) {
            self.properties.locked = true;
            setTimeout(function () {
                self.properties.locked = false;
            }, duration);
        }
    };

    /**
     * Creates a fade slider panel
     * @requires {@link https://jquery.com/ jQuery}
     * @requires {@link http://ricostacruz.com/jquery.transit/ jQuery.Transit}
     * @requires com_dss_styles.css
     * @class
     * @memberof DSS
     * @augments DSS.Slider
     * @param {Object}  $sliderPanel                    The panel wrapper
     * @param {Object}  settings                        Extra Settings
     *
     * @param {Number}  settings.animationDuration      in milliseconds, default is '800'
     * @param {Boolean} settings.lockable               Whether interactions can be locked in this object, default is 'true'
     */

    DSS.FadeSlider = function ($sliderPanel, settings) {

        DSS.Slider.call(this, $sliderPanel, settings);

        var self = this;

        // Setup Cards and Card Container
        self.elements.slideCardWrap.css({
            'width': self.properties.panelWidth,
            'height': self.properties.panelHeight
        });

        self.properties.cardResetState = {
            '-webkit-transform': 'translateY(30px)',
            'opacity': '0',
            'display': 'none'
        };

        self.move(self.elements.cards.first().attr('id'), 0);

        self.elements.buttons.off("click").on("click", function (e) {
            e.stopPropagation();

            var page = $(this).data("slide-nav"),
                properties;

            if (!self.properties.locked) {
                self.move(page, self.properties.animationDuration);

                properties = {
                    page: page,
                    duration: self.properties.animationDuration
                };

                self.elements.panel.trigger({
                    type: 'slidePanelMove',
                    properties: properties
                });
            }
        });
    };

    DSS.FadeSlider.prototype = Object.create(DSS.Slider.prototype);
    DSS.FadeSlider.prototype.constructor = DSS.FadeSlider;

    /**
     * Moves the slider to the target panel
     * @override
     * @memberof DSS.FadeSlider
     * @param {String} pageID       The target page ID
     * @param {Number} duration     The animation duration
     */

    DSS.FadeSlider.prototype.move = function (pageID, duration) {
        var self = this;

        self.lockOut(duration / 1.2);

        self.elements.cards.css(self.properties.cardResetState);

        self.elements.cards.filter('#' + pageID).css('display', 'block').transition({
            y: 0
        }, duration, 'snap').transition({
            opacity: 1,
            queue: false
        }, duration / 2);

    };


}(jQuery, setTimeout, DSS));