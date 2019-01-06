class FormValidator {

    constructor(validations) {
        this.validations = validations;
    }

    validate(ticket) {
        let formValidation = {
            isFormValid: true,
            validationResults: {}
        };

        this.validations.forEach(validator => {
            const isValid = validator.method(ticket[validator.field]) === validator.validWhen;
            let validationResult = {
                isValid: isValid,
                message: ''
            };

            if (!isValid) {
                formValidation.isFormValid = false;
                validationResult.message = validator.message;
            }

            formValidation.validationResults[validator.field] = validationResult;
        });

        return formValidation;
    }

}

export default FormValidator;