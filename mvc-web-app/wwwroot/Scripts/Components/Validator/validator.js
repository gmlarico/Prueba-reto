ns('Resinplast.Indicadores.Web.Components.Validator');
Resinplast.Indicadores.Web.Components.Validator = function (opts) {
    this.init(opts);
};

Resinplast.Indicadores.Web.Components.Validator.prototype = {
    form: null,
    messages: null,
    validator: null,
    init: function (opts) {
        if (opts) {
            this.form = opts.form ? $('#' + opts.form) : null;
            this.messages = opts.messages ? opts.messages : null;

            if (this.form != null) {
                this.validator = this.form.validate();

                var localLanguage = Resinplast.Indicadores.Web.Global.Format.Language.toLowerCase();
                if (typeof localLanguage !== 'undefined') {
                    $.extend($.validator.messages, $.validator.messages[localLanguage]);
                }

                //this.validator.settings.success = 'valid';
                this.validator.settings.errorClass = 'invalid-feedback animated fadeInDown';
                this.validator.settings.errorElement = 'div';

                this.validator.settings.errorPlacement = function (error, element) {
                    $(element).parents('.form-group > div').append(error);
                };

                this.validator.settings.highlight = function (element) {
                    $(element).closest('.form-group > div').addClass('is-invalid');
                };

                this.validator.settings.unhighlight = function (element) {
                    $(element).closest('.form-group > div').removeClass('is-invalid');
                };

                this.validator.settings.success = function (element) {
                    $(element).closest('.form-group').removeClass('is-invalid');
                    $(element).remove();
                };

                this.configure();
            }
        }
    },

    configure: function () {
        var base = this;
        var rules = {};
        var messages = {};

        base.form.find('[validable]').each(function () {
            var nameControl = $(this).attr('name');

            if (nameControl == undefined) {
                var id = $(this).attr('id');
                $(this).attr('name', id);
                nameControl = $(this).attr('name');
            }

            var message = Resinplast.Indicadores.Web.Shared.Message.Resources.ValidacionDebeIngresar + ' ';
            var newMessage = message ? message : "Por favor, debe ingresar ";

            var settingsControl = {};
            var settingsMessage = {};
            var validations = $(this).attr('validable').split(',');

            for (var i = 0; i < validations.length; i++) {
                var attributes = $.trim(validations[i]).split(' ');
                var typeValidation = $.trim(attributes[0]);
                var newValue = (typeValidation == 'required');
                var value = $.trim(attributes[1]);
                var codeMessage;

                if (value == 'true') {
                    var newValue = true;
                } else if (value == 'false') {
                    var newValue = false;
                } else if ($.isNumeric(value)) {
                    var newValue = parseFloat(value);
                } else {
                    codeMessage = value;
                }

                if (attributes.length > 2) {
                    codeMessage = $.trim(attributes[2]);
                }

                settingsControl[typeValidation] = newValue;
                settingsMessage[typeValidation] = newMessage + base.messages[codeMessage];
            }

            rules[nameControl] = settingsControl;
            messages[nameControl] = settingsMessage;
        });

        base.validator.settings.rules = rules;
        base.validator.settings.messages = messages;
    },

    isValid: function () {
        var valid = true;

        this.validator.form();
        valid = this.validator.valid();

        if (!valid) {
            this.validator.focusInvalid();
        }

        return valid;
    },

    reset: function () {
        this.validator.resetForm();
        this.validator.reset();
    }
}