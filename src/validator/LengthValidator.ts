
export default class LengthValidator {

    constructor(private minLength: Number, private maxLength?: Number) {}

    validate(value: string): boolean {
        return value.length >= this.minLength && value.length <= (this.maxLength ?? Number.MAX_SAFE_INTEGER); 
    }

}