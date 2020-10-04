import LengthValidator from "../../src/validator/LengthValidator";

test('String validation fail', () => {
    const validator = new LengthValidator(10, 20);
    const strings = ["A", "AAAAAAAAA", "AAAAAAAAAAAAAAAAAAAAA"];
    const result = strings
        .map(str => validator.validate(str))
        .reduce((priev, next) => priev || next);

    expect(result).toBeFalsy;
});

test('String validation succeed', () => {
    const validator = new LengthValidator(1, 10);
    const strings = ["A", "AAAA", "AAAAAAAAAA"];
    const result = strings
        .map(str => validator.validate(str))
        .reduce((priev, next) => priev || next);

    expect(result).toBeTruthy;
});

test('Long string validation succeed for validator with empty maxLength parameter', () => {
    const validator = new LengthValidator(1);
    const value = `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem`;
    const result = validator.validate(value);

    expect(result).toBeTruthy;
});