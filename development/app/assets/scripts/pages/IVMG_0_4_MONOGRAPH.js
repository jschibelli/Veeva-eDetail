/*globals $, PDFObject */

$(".row").ready(
    function () {
        "use strict";
        
        var previousPage = localStorage.getItem("fromPage"),
            closeBtn = $("[data-closepm]");

        DSS.navigation.disableSwipe();
        
        if (previousPage) {
            closeBtn
            .attr("data-url", previousPage)
            .off("click").on("click", function (e) {
                DSS.navigation.goToPage(e);
            });
        } else {
            closeBtn.addClass("hide");
        }
    }
);