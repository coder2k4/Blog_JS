export class Validators {
    static required(controlValue = '') {
        Validators.error = 'Поле не должно быть пустым';
        return controlValue && controlValue.trim();
    }

    static minLength(length){
        Validators.error = `Минимальная длинна ${length}`;
        return value =>
        {
            return value.length >= length;
        }
    }
}