import * as funcs from './validation-functions';


describe('Validation Function', () => {

    it('digitCount should return length in digits', () => {
        let msg = '';

        msg = 'null has no digits';
        expect(funcs.digitCount(<any>null)).toBe(0, msg);

        msg = 'undefined has no digits';
        expect(funcs.digitCount(<any>undefined)).toBe(0, msg);

        msg = 'NaN has no digits';
        expect(funcs.digitCount(NaN)).toBe(0, msg);

        msg = 'not numbers have no digits';
        expect(funcs.digitCount(<any>'foo')).toBe(0, msg);
        expect(funcs.digitCount(<any>[])).toBe(0, msg);
        expect(funcs.digitCount(<any>{foo: 'bar'})).toBe(0, msg);

        msg = '0 has one digit';
        expect(funcs.digitCount(0)).toBe(1, msg);

        msg = '1 has one digit';
        expect(funcs.digitCount(1)).toBe(1, msg);

        msg = '42 has two digits';
        expect(funcs.digitCount(42)).toBe(2, msg);

        msg = '-42 has two digits';
        expect(funcs.digitCount(-42)).toBe(2, msg);

        msg = '0.42 has three digits';
        expect(funcs.digitCount(0.42)).toBe(3, msg);

        msg = 'Infinite values have infinite digits';
        expect(funcs.digitCount(Number.POSITIVE_INFINITY)).toBe(Infinity, msg);
        expect(funcs.digitCount(Number.NEGATIVE_INFINITY)).toBe(Infinity, msg);
    });

});
