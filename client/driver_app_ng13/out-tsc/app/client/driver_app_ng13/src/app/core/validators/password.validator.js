export class PasswordValidator {
    // If our validation fails, we return an object with a key for the error name and a value of true.
    // Otherwise, if the validation passes, we simply return null because there is no error.
    static areNotEqual(formGroup) {
        let firstControlValue;
        let valid = true;
        for (const key in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(key)) {
                const control = formGroup.controls[key];
                if (firstControlValue === undefined) {
                    firstControlValue = control.value;
                }
                else {
                    // check if the value of the first control is equal to the value of the second control
                    if (firstControlValue !== control.value) {
                        valid = false;
                        break;
                    }
                }
            }
        }
        if (valid) {
            return null;
        }
        return {
            areNotEqual: true
        };
    }
}