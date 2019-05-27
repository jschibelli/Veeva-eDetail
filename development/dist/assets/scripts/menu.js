/**
 * Hamburger menu functionality
 *
 * Returns
 * - buttonActive | jQuery element | The button that's active for current page
 * - toggleContent | function | Triggers open/close of sitemap menu
 *
 * jQuery, jQuery Transit, FastClick
 */

/*global $, jQuery, DSS */

(function ($, api) {
    "use strict";
    
    api.navigation.setCurrentPage();

    var $menuToggle = $("#menuToggle"),
        $menuOverlay = $("#menuOverlay"),
        $menuFade = $("#menuFade"),
        $menuSlide = $("#menuSlide"),
        $utilityNav = $(".upper-utility_nav"),
        $buttonActive = $("#menuSlide [data-url='" + api.navigation.getCurrentPage() + "']"),
        $blurEls = $(".content");

    /**
     * toggleContent toggles sitemap navigation
     */

    function toggleContent() {
        $menuToggle.toggleClass("active");

        if ($menuToggle.hasClass("active")) {
            $blurEls.addClass('menu-blur');
            $utilityNav.addClass("hide");
            $menuOverlay.css('display', 'block').transition({
                opacity: '1'
            }, 200);
            $menuSlide.transition({
                x: "500px"
            }, 400);
        } else {
            $blurEls.removeClass('menu-blur');
            $utilityNav.removeClass("hide");
            $menuOverlay.css('display', 'none').transition({
                opacity: '0'
            }, 200);
            $menuSlide.transition({
                x: "0px"
            }, 400);
        }
    }

    $menuToggle.click(function () {
        toggleContent();
    });

    $menuFade.click(function () {
        toggleContent();
    });

    $buttonActive.addClass('active');

    return {
        buttonActive: $buttonActive,
        toggleContent: toggleContent
    };

}(jQuery, DSS));