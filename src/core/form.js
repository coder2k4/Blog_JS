export class Form {
    constructor(form, controls) {
        this.form = form;
        this.controls = controls;
    }

    value() {
        const value = {};

        Object.keys(this.controls).forEach(control => {
            value[control] = this.form[control].value;
        });

        return value;
    }

    isValid() {
        let isFormValid = true;
        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control];
            let isValid = true;
            validators.forEach(validator => {
                isValid = validator(this.form[control].value) && isValid;
                console.log(validators.error);
            });

            isValid ? this.clearError(this.form[control]) : this.setError(this.form[control]);

            isFormValid = isFormValid && isValid;
        });

        return isFormValid;
    }

    setError($control) {
        this.clearError($control);
        const error = `<p class="validation-error">Ошибка валидации </p>`;
        $control.classList.add('invalid');
        $control.insertAdjacentHTML('afterend', error);

    }

    clearError($control) {
        $control.classList.remove('invalid');
        if ($control.nextSibling) {
            $control.closest('.form-control').removeChild($control.nextSibling)
        }
    }

    clearData(){
        Object.keys(this.controls).forEach(control => {
            this.form[control].value = '';
        });
    }

}