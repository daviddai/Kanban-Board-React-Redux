class TicketFormValidator {

    constructor(validations) {
        this.validations = validations;
    }

    validate(ticket) {
        let validationResults = {};

        this.validations.forEach(validator => {
            const isValid = validator.method(ticket[validator.field]) === validator.validWhen;
            let validationResult = {
                isValid: isValid,
                message: ''
            };

            if (!isValid) {
                validationResult.message = validator.message;
            }

            validationResults[validator.field] = validationResult;
        });

        return validationResults;
    }

}

export default TicketFormValidator;