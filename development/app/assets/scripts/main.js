/*global jQuery, $, DSS, FastClick, document, setTimeout, console, PatientPhotos, window */

var IVA = $(function ($, api, FastClick, PatientPhotos) {
    "use strict";

    FastClick.attach(document.body);

    var pageFlowKey = [
            "GAL_1_0_HOME",
            "GAL_2_0_LONG_TERM_EFFICACY",
            "GAL_3_0_DECREASE_IN_DEMATOLOGIC",
            "GAL_4_0_APPLICATION"

        ],

        $elements = {
            mainContainer: $(".container"),
            contentContainer: $(".content"),
            slideContainer: $(".foreground"),
            headerContainer: $("header"),
            skinbBgContainer: $(".skin-bg"),
            linkElements: $("[data-url]"),
            scrollableElements: $(".scrollable"),
            modalElements: $(".modal").not(".video-modal"),
            patientPhotosModals: $(".patient-photos-modal"),
            modalVideoElements: $(".video-modal"),
            modalButtons: $("[data-modal]"),
            accordionPanelChooseButtons: $("[data-accordionchoose]"),
            fadeInElements: $(".fade-on-load")
        },
        modals = {},
        patientPhotos = {},
        pageFlips = {},
        accordions = {},
        cubes = {},
        sliders = {};

    // FADE IN FUNCTIONALITY //////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    $elements.fadeInElements.transition({
        opacity: 1
    }, 600);

    // SLIDE IN FUNCTIONALITY //////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    $elements.headerContainer.transition({
        y: 0
    }, 300);

    $elements.skinbBgContainer.transition({
        opacity: 1
    }, 300);

    // NAVIGATION /////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    api.navigation.setPageFlowKey(pageFlowKey);
    api.navigation.setCurrentPage();

    $elements.linkElements.on("click", function (e) {
        api.navigation.goToPage(e);
    });

    $elements.contentContainer.swipe({
        swipeStatus: function (e, phase, direction, distance, duration) {

            var thresh = 200,
                fastThresh = 30,
                fastDur = 300,
                dragging = false;

            /**
             * triggerMove
             * @param {Number}   moveX    How much to move
             * @param {Number}   duration animation duration
             * @param {Function} callback the function to call after animation
             */
            function triggerMove(moveX, duration, callback) {
                $elements.slideContainer.transition({
                    x: moveX
                }, duration, callback);
            }

            /**
             * triggerFade to adjust Y of logo for a visual effect (origanlly opacity)
             * @param {Number}   distance to move Y (originally opacity)
             * @param {Number}   duration animation duration
             * @param {Function} callback the function to call after animation
             */
            function triggerFade(distRatio, duration, callback) {
                $elements.headerContainer.transition({
                    y: distRatio * -($elements.headerContainer.height())
                }, duration, callback);
                $elements.skinbBgContainer.transition({
                    opacity: 1 - distRatio
                }, duration, callback);
            }

            switch (phase) {
            case 'start':
                break;
            case 'move':
                if (distance > 30 && !dragging) {
                    dragging = true;
                    switch (direction) {
                    case 'left':
                        triggerMove(-distance, 10);
                        triggerFade(distance / (1024 / 2), 10);
                        break;
                    case 'right':
                        triggerMove(distance, 10);
                        triggerFade(distance / (1024 / 2), 10);
                        break;
                    }
                }
                break;
            default:
                dragging = false;
                if ((distance >= fastThresh && duration <= fastDur) || distance >= thresh) {
                    switch (direction) {
                    case 'left':
                        triggerMove(-1024, 400, api.navigation.gotoNextPage);
                        triggerFade(1, 400);
                        break;
                    case 'right':
                        triggerMove(1024, 400, api.navigation.gotoPrevPage);
                        triggerFade(1, 400);
                        break;
                    }
                } else {
                    triggerFade(0, 400);
                    triggerMove(0, 400);
                }
            }
        }
    });

    // MODALS /////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    $elements.modalElements.each(function () {
        var $thisModal = $(this),
            $modalButton,
            modalName = $thisModal.attr("id"),
            settings = {};

         settings.background = ' url(../images/bg_texture.jpg);';



        $modalButton = $elements.modalButtons.filter("[data-modal='" + modalName + "']");

        modals[modalName] = new api.Modal($thisModal, $modalButton, settings);
    });

    $elements.modalVideoElements.each(function () {
        var $thisModal = $(this),
            $modalButton,
            modalName = $thisModal.attr("id");

        $modalButton = $elements.modalButtons.filter("[data-modal='" + modalName + "']");

        modals[modalName] = new api.VideoModal($thisModal, $modalButton);
    });


    // RELEASE SCROLLABLE DIVS ////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    $elements.scrollableElements.each(function () {
        var $scrolling = $(this);

        api.scroll.scrollRelease($scrolling);
    });

    // PATIENT PHOTOS /////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////
    $elements.patientPhotosModals.each(function () {

        var $thisModal = $(this),
            modalName = $thisModal.attr("id"),
            accordionName = $thisModal.find(".patient-photos-accordion").attr("id");

        patientPhotos[modalName] = new PatientPhotos(modals[modalName], accordions[accordionName]);

    });

    return {
        content: $elements.contentContainer,
        modals: modals,
        patientPhotos: patientPhotos,
        pageFlips: pageFlips,
        accordions: accordions,
        cubes: cubes,
        sliders: sliders
    };

}(jQuery, DSS, FastClick, PatientPhotos));

// ANIMATIONS /////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function getAnimatingNode(name, parent) {
    "use strict";

    var nodeToAnimate;

    if (parent) {
        nodeToAnimate = parent.find("[data-animate=\"" + name + "\"]");
    } else {
        nodeToAnimate = $("[data-animate=\"" + name + "\"]");
    }
    return nodeToAnimate;
}

/* LIGHT UP FUNCTIONALITY */

function turnLightOn(node) {
    "use strict";

    if (node.data("animate")) {
        node.addClass("light-on");
    }
}

function turnLightOff(node) {
    "use strict";

    if (node.data("animate")) {
        node.removeClass("light-on");
    }
}

/* CHART ANIMATIONS */

function runChartAnim(lineToAnim, animTo) {
    "use strict";

    lineToAnim.transition({
        width: animTo
    }, function () {
        lineToAnim.addClass("scale_highlight");

        setTimeout(function () {
            lineToAnim.find(".success_rate")
                .transition({ opacity: 1 })
                .transition(
                    { scale: 1 },
                    function () {
                        lineToAnim.addClass("light_up");
                    }
                );
        }, 500);
    });
}

/* BUTTON ANIMATIONS */

function slideInButtons(buttons, timeout) {
    "use strict";

    $.each(buttons, function (key, value) {
        setTimeout(function () {
            $(buttons[buttons.length - (key + 1)]).addClass("show");
        }, timeout * key);
    });

    setTimeout(function () {
        $.each(buttons, function (key, value) {
            setTimeout(function () {
                turnLightOn($(value));
            }, timeout * key);
        });
    }, timeout * buttons.length);
}

function slideOutButtons(buttons, timeout) {
    "use strict";

    buttons.removeClass("light-on");

    $.each(buttons, function (key, value) {
        setTimeout(function () {
            $(value).removeClass("show");
        }, timeout * key);
    });
}

/* TOGGLE CONTENT */

function togglePageContent(target, parent) {
    "use strict";

    var contentToToggle = parent ? parent.children("[data-togglecontent]") : $("[data-togglecontent]"),
        buttonsToToggle = $(target).parent().children("[data-toggle]");

    buttonsToToggle.removeClass("active");
    $(target).addClass("active");

    $.each(contentToToggle, function (key, value) {
        $(value).removeClass("active");

        if ($(target).data("toggle") === $(value).attr("id")) {
            $(value).addClass("active");
        }
    });
}
