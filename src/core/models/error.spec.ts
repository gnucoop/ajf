import {AjfError} from './error';


describe('AjfError', () => {

    it('should construct without message', () => {
        let error: AjfError = new AjfError();
        expect(error).toBeDefined();
    });

    it('should construct with message', () => {
        const msg = '__foo_bar_test_error_message';
        let error: AjfError = new AjfError(msg);
        expect(error).toBeDefined();
    });

    it('instances should have the correct name', () => {
        let error: AjfError = new AjfError();

        expect(error.name).toEqual('AjfError');
    });

    it('instances should have the correct message', () => {
        const msg = '__foo_bar_test_error_message';

        let error: AjfError = new AjfError(msg);

        expect(error.message).toEqual(msg);
    });

});
