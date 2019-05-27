/*global window */

(function (exports) {
    "use strict";

    var PatientPhotos;

    /**
     * Patient Photos Modal Object
     * @class
     * @memberof IVA
     * @param {Modal}     modalObj     The modal
     * @param {Accordion} AccordionObj The accordion
     */

    PatientPhotos = function (modalObj, AccordionObj) {
        var self = this;

        self.objects = {
            modal: modalObj,
            accordion: AccordionObj
        };

        self.$els = {
            modal: self.objects.modal.elements.modal,
            accordionPanel: self.objects.accordion.elements.accordionPanel,
            accordionCapsules: self.objects.accordion.elements.accordionCapsules
        };

        self.$els.timeIndicator = self.$els.modal.find(".time-indicator");

        self.$els.accordionPanel.on('accordionAction', function (e) {
            var duration = e.properties.duration,
                capsuleId = e.properties.capsuleId;

            switch (capsuleId) {
            case 'subject009':
            case 'subject008':
                self.accordionActionHandler(capsuleId, 0, duration);
                break;
            case 'subject005':
            case 'subject012':
                self.accordionActionHandler(capsuleId, -60, duration);
                break;
            }
        });

        // Initialize Accordion
        self.objects.accordion.accordionAction(self.$els.accordionCapsules.last(), 0);
    };

    /**
     * accordionActionHandler containes actions to take if accordion moves
     * @memberof! IVA.PatientPhotosModal
     * @param {String} capsuleId the capsule in question
     * @param {Number} x         how much to move the indicator
     * @param {Number} duration  the animation duration
     */
    PatientPhotos.prototype.accordionActionHandler = function (capsuleId, x, duration) {
        var self = this,
            $otherCapsules = self.$els.accordionCapsules.not('#' + capsuleId),
            $thisCapsule = self.$els.accordionCapsules.filter('#' + capsuleId),
            delay = duration / 2,
            quickDuration = duration * 1.5;
        self.$els.timeIndicator.transition({
            x: x,
            delay: delay
        }, quickDuration, 'snap');
        $otherCapsules.find(".subject-notes").transition({
            opacity: 0
        }, duration);
        $thisCapsule.find(".subject-notes").transition({
            opacity: 1
        }, duration);
        $otherCapsules.find(".subject-indicator").transition({
            rotate: 90,
            delay: delay
        }, quickDuration).find(".plus").transition({
            opacity: 1,
            delay: delay
        }, quickDuration);
        $thisCapsule.find(".subject-indicator").transition({
            rotate: 0,
            delay: delay
        }, quickDuration).find(".plus").transition({
            opacity: 0,
            delay: delay
        }, quickDuration);
    };

    exports.PatientPhotos = PatientPhotos;

}(window));