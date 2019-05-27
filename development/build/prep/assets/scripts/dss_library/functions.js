/*global document, DSS, IVA */

(function () {
    "use strict";

    /**
     * Contains general functions and methods
     * @namespace general
     * @memberof DSS
     */

    DSS.general = (function () {

        var exports = {};

        /**
         * Returns the object size
         *
         * @memberof! DSS.general
         *
         * @param   {Object} obj the target
         * @returns {Number} the size of the target
         *
         * @example
         * var someObj = { foo: 1, bar: 2 };
         * DSS.General.getObjectSize(someObj);
         * //returns 2
         *
         */
        function getObjectSize(obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    size += 1;
                }
            }
            return size;
        }

        exports = {
            getObjectSize: getObjectSize
        };

        return exports;

    }());

    /**
     * Contains navigation related functions and methods
     * @namespace navigation
     * @memberof DSS
     */

    DSS.navigation = (function () {

        var extension = "html",
            pageFlowKey,
            flowLength,
            currentPageName,
            currentPageIdx = [],
            exports;

        /**
         * Gets page content
         *
         * @memberof! DSS.navigation
         */
        function getPageContent() {
            return IVA[0].content;
        }
        
        function getPageExtension(page) {
            var checkExtension = page.split("."),
                retVal = extension;

            if (checkExtension.length > 1) {
                retVal = checkExtension[checkExtension.length - 1];
            }
            return retVal;
        }

        /**
         * Sets the pageflow with an array
         *
         * @memberof! DSS.navigation
         *
         * @param {Array} pageKey The story flow keys
         *
         * @example
         * DSS.navigation.setPageFlowKey(['page1', 'page2']);
         */
        function setPageFlowKey(pageKey) {
            pageFlowKey = pageKey;
            flowLength = pageFlowKey.length;
        }

        /**
         * Redirects to a page
         *
         * @memberof! DSS.navigation
         *
         * @param {String} page the page to redirect to
         *
         * @example
         * DSS.navigation.updatePage('page1');
         */
        function updatePage(page) {
            var pageExtension = getPageExtension(page),
                pageLink = page + (pageExtension === extension ? "." + pageExtension : "");

            localStorage.setItem("fromPage", getCurrentPage());
            document.location.href = pageLink;
        }

        /**
         * Returns the current page
         *
         * @memberof! DSS.navigation
         *
         * @returns {String} The name of the current page
         *
         * @example
         * // We are in page1
         * DSS.navigation.getCurrentPage();
         * // returns page 1
         */
        function getCurrentPage() {
            return currentPageName;
        }

        /**
         * Sets the current page name and index
         *
         * @memberof! DSS.navigation
         */
        function setCurrentPage() {
            var currentURL = document.location.pathname,
                startString = currentURL.lastIndexOf("/") + 1,
                endString = currentURL.indexOf("html") - 1,
                currentName = currentURL.substring(startString, endString),
                splitName = currentName.split("_"),
                curIdxVal,
                i = 0;

            // Set page name
            currentPageName = currentName;

            // Set page index
            for (i; i < splitName.length; i += 1) {
                curIdxVal = parseInt(splitName[i], 10);

                if (currentPageIdx.length === 2) {
                    continue;
                }
                if (!isNaN(curIdxVal)) {
                    currentPageIdx.push(curIdxVal);
                }
            }
        }

        /**
         * Disables swiping motion
         *
         * @memberof! DSS.navigation
         */
        function disableSwipe() {
            if (getPageContent().swipe().length > 0) {
                getPageContent().swipe("disable");
            }
        }

        /**
         * Enables swiping motion
         *
         * @memberof! DSS.navigation
         */
        function enableSwipe() {
            if (getPageContent().swipe().length > 0) {
                getPageContent().swipe("enable");
            }
        }
        
        function goToPage(event) {
            event.preventDefault();

            var $link = $(event.currentTarget),
                linkDest = $link.data("url");

            updatePage(linkDest);
        }

        /**
         * Redirects to the next page in the flow if a pageFlowKey exists
         *
         * @see DSS.navigation.setPageFlowKey
         *
         * @memberof! DSS.navigation
         *
         * @example
         * DSS.navigation.gotoNextPage();
         */
        function gotoNextPage() {
            var currentIndex,
                nextIndex = $("#" + getCurrentPage()).data("nextpage");
            
            if (nextIndex === undefined && pageFlowKey) {
                currentIndex = pageFlowKey.indexOf(getCurrentPage());
                console.log($("#" + getCurrentPage()).data());

                if (currentIndex >= 0) {
                    nextIndex = currentIndex + 1;
                } else {
                    nextIndex = currentPageIdx[0];
                }
            } else {
                nextIndex -= 1;
            }

            if (nextIndex < flowLength) {
                updatePage(pageFlowKey[nextIndex]);
            } else {
                updatePage(pageFlowKey[0]);
            }
        }


        /**
         * Redirects to the previous page in the flow if a pageFlowKey exists
         *
         * @see DSS.navigation.setPageFlowKey
         *
         * @memberof! DSS.navigation
         *
         * @example
         * DSS.navigation.gotoPrevPage();
         */
        function gotoPrevPage() {
            var currentIndex,
                prevIndex = $("#" + getCurrentPage()).data("prevpage");

            if (prevIndex === undefined && pageFlowKey) {
                currentIndex = pageFlowKey.indexOf(getCurrentPage());

                if (currentIndex >= 0) {
                    prevIndex = currentIndex - 1;
                } else {
                    prevIndex = currentPageIdx[0] - 1;
                }
            } else {
                prevIndex -= 1;
            }

            if (prevIndex >= 0) {
                updatePage(pageFlowKey[prevIndex]);
            } else {
                updatePage(pageFlowKey[flowLength - 1]);
            }
        }

        exports = {
            setPageFlowKey: setPageFlowKey,
            getCurrentPage: getCurrentPage,
            setCurrentPage: setCurrentPage,
            goToPage: goToPage,
            gotoNextPage: gotoNextPage,
            gotoPrevPage: gotoPrevPage,
            enableSwipe: enableSwipe,
            disableSwipe: disableSwipe
        };

        return exports;

    }());

    /**
     * Contains scroling related functions and methods
     * @namespace scroll
     * @memberof DSS
     */

    DSS.scroll = (function () {

        var exports;

        /**
         * Releases the elements for scrolling
         *
         * @memberof! DSS.scroll
         *
         * @param {Object} el The elements to release
         *
         * @example
         * DSS.navigation.scrollRelease(someElements);
         */
        function scrollRelease(el) {
            el.ontouchmove = function (e) {
                e.stopPropagation();
            };
        }

        exports = {
            scrollRelease: scrollRelease
        };

        return exports;

    }());

}());