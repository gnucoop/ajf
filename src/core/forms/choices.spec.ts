import {Observable, Subject} from 'rxjs';

import {
  AjfChoice,
  createChoicesFixedOrigin,
  createChoicesFunctionOrigin,
  createChoicesObservableArrayOrigin,
  createChoicesObservableOrigin,
  createChoicesOrigin,
  createChoicesPromiseOrigin,
  initChoicesOrigin,
  isChoicesFixedOrigin,
} from './public-api';

describe('createChoicesOrigin', () => {
  it('should have a name, a label and a choices type', () => {
    let choicesOrigin = createChoicesOrigin({type: 'fixed', name: 'foo'});

    expect(choicesOrigin.name).toEqual('foo');
    expect(choicesOrigin.label).toEqual('');
    expect(choicesOrigin.choices).toEqual([]);

    choicesOrigin =
        createChoicesOrigin({type: 'fixed', name: 'foo', choices: [{label: 'baz', value: 'baz'}]});

    let choices = choicesOrigin.choices;
    expect(choices.length).toEqual(1);
    expect(choices[0].value).toEqual('baz');
  });
});

describe('createChoicesFixedOrigin', () => {
  it('should have choices from a given array', () => {
    let choicesOrigin = createChoicesFixedOrigin({
      name: 'foo',
      choices: [{label: '3', value: 3}, {label: '6', value: 6}, {label: '9', value: 9}]
    });

    let choices = choicesOrigin.choices.map(c => c.value);
    expect(choices).toContain(3);
    expect(choices).toContain(6);
    expect(choices).toContain(9);
  });
});

describe('createChoicesFunctionOrigin', () => {
  it('should have choices from a given function', async () => {
    let choicesOrigin = createChoicesFunctionOrigin({
      name: 'foo',
      generator: () => {
        return [{label: '3', value: 3}, {label: '6', value: 6}, {label: '9', value: 9}];
      }
    });

    await initChoicesOrigin(choicesOrigin);

    let choices = choicesOrigin.choices;
    expect(choices.filter((c: any) => c.value === 3).length).toBe(1);
    expect(choices.filter((c: any) => c.value === 6).length).toBe(1);
    expect(choices.filter((c: any) => c.value === 9).length).toBe(1);
  });
});

describe('createChoicesObservableArrayOrigin', () => {
  it('should have choices from a given observable', (done) => {
    let subject = new Subject<AjfChoice<number>[]>();
    let choicesOrigin = createChoicesObservableArrayOrigin(
        {name: 'foo', generator: subject as Observable<AjfChoice<number>[]>});

    let choices = choicesOrigin.choices;

    expect(choices).toEqual([]);

    initChoicesOrigin(choicesOrigin).then(() => {
      choices = choicesOrigin.choices;

      expect(choices.filter(c => c.value === 3).length).toBe(1);
      expect(choices.filter(c => c.value === 6).length).toBe(1);
      expect(choices.filter(c => c.value === 9).length).toBe(1);

      done();
    });

    subject.next([
      {label: '3', value: 3},
      {label: '6', value: 6},
      {label: '9', value: 9},
    ]);
  });
});

describe('createChoicesObservableOrigin', () => {
  it('should have choices from a given observable', (done) => {
    let subject = new Subject<AjfChoice<number>>();
    let choicesOrigin = createChoicesObservableOrigin({
      name: 'foo',
      generator: subject as Observable<AjfChoice<number>>,
    });

    initChoicesOrigin(choicesOrigin).then(() => {
      let choices = choicesOrigin.choices;

      expect(choices.filter(c => c.value === 3).length).toBe(1);
      expect(choices.filter(c => c.value === 6).length).toBe(1);
      expect(choices.filter(c => c.value === 9).length).toBe(1);

      done();
    });

    subject.next({label: '3', value: 3});
    subject.next({label: '6', value: 6});
    subject.next({label: '9', value: 9});
    subject.complete();
  });
});

describe('createChoicesPromiseOrigin', () => {
  it('should have choices from a given promise', async () => {
    let promise =
        Promise.resolve([{label: '3', value: 3}, {label: '6', value: 6}, {label: '9', value: 9}]);
    let choicesOrigin = createChoicesPromiseOrigin({name: 'foo', generator: promise});

    let choices = choicesOrigin.choices;
    expect(choices).toEqual([]);

    await initChoicesOrigin(choicesOrigin);

    choices = choicesOrigin.choices;

    expect(choices.filter(c => c.value === 3).length).toBe(1);
    expect(choices.filter(c => c.value === 6).length).toBe(1);
    expect(choices.filter(c => c.value === 9).length).toBe(1);
  });
});

describe('isChoicesOrigin', () => {
  it('should return true if parameter is AjfChoicesOrigin', () => {
    let co = createChoicesFixedOrigin<any>({name: 'name'});

    expect(isChoicesFixedOrigin(co)).toBe(true);

    co = createChoicesFixedOrigin<any>({name: ''});
    expect(isChoicesFixedOrigin(co)).toBe(true);
  });

  it('should return false if parameter is not an AjfChoicesOrigin', () => {
    expect(isChoicesFixedOrigin('nosense' as any)).toBe(false);
    expect(isChoicesFixedOrigin(1 as any)).toBe(false);
    expect(isChoicesFixedOrigin({} as any)).toBe(false);
    expect(isChoicesFixedOrigin(null as any)).toBe(false);
    expect(isChoicesFixedOrigin(undefined as any)).toBe(false);
  });
});

describe('isChoicesFixedOrigin', () => {
  it('should return false if parameter is not an AjfChoicesOrigin of type "fixed"', () => {
    const choicesNoFixedOrigin = createChoicesOrigin<any>({name: 'name', type: 'promise'});

    expect(isChoicesFixedOrigin(choicesNoFixedOrigin)).toBe(false);
  });
});
