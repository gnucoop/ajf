import {AjfJsonSerializable} from './json';


describe('AjfJsonSerializable', () => {

    it('should construct when extended', () => {
        class TestSerializable extends AjfJsonSerializable {
        }

        let t: TestSerializable = new TestSerializable();

        expect(t).toBeDefined();
    });

    it('should serialize registered properties (and only them) when extended', () => {
        class TestSerializable extends AjfJsonSerializable {

            get alsoFoo() {
                return this.foo;
            }

            getAgainFoo() {
                return this.foo;
            }

            constructor (
                    public foo: string = 'bar',
                    public baz: number = 42,
                    public batArray: boolean[] = [true, false]
                ) {
                super();

                this.jsonExportedMembers = this.jsonExportedMembers.concat([
                    'foo',
                    'batArray',
                    'alsoFoo',
                    'againFoo'
                ]);
            }
        }

        let t: TestSerializable = new TestSerializable();
        let ob = t.toJson();

        expect(ob).toBeDefined();

        expect(ob.foo).toEqual('bar');
        expect(ob.alsoFoo).toEqual('bar');
        expect(ob.againFoo).toEqual('bar');

        expect(ob.baz).toBeUndefined();

        expect(ob.batArray).toBeDefined();
        expect(ob.batArray.length).toEqual(2);
    });

    it('should throw when trying to deserialize', () => {
        expect(AjfJsonSerializable.fromJson).toThrow();
    });

});
