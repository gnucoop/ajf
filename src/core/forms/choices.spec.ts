import {Subject, timer} from 'rxjs';

import {
  AjfChoice,
  AjfChoicesFixedOrigin,
  AjfChoicesFunctionOrigin,
  AjfChoicesObservableArrayOrigin,
  AjfChoicesObservableOrigin,
  AjfChoicesOrigin,
  AjfChoicesPromiseOrigin
} from './index';

describe('AjfChoicesOrigin', () => {
  it('should have a name, a label and a choices type', () => {
    let choicesOrigin: AjfChoicesOrigin<string> =
        AjfChoicesOrigin.create('string');

    expect(choicesOrigin.getName()).toBeNull();
    expect(choicesOrigin.getLabel()).toBeNull();
    expect(choicesOrigin.getChoicesType()).toBeNull();
    expect(choicesOrigin.getChoices()).toEqual([]);

    choicesOrigin = AjfChoicesOrigin.create(
        'string',
        {'name' : 'foo', 'label' : 'bar', 'choices' : [ {label: 'baz', value: 'baz'}]});

    expect(choicesOrigin.getName()).toEqual('foo');
    expect(choicesOrigin.getLabel()).toEqual('bar');
    expect(choicesOrigin.getChoicesType()).toEqual('string');
    let choices = choicesOrigin.getChoices();
    expect(choices.length).toEqual(1);
    expect(choices[0].value).toEqual('baz');
  });
});

describe('AjfChoicesFixedOrigin', () => {
  it('should have choices from a given array', () => {
    let choicesOrigin: AjfChoicesFixedOrigin<number> =
        new AjfChoicesFixedOrigin<number>({'choices' : [
          {label: '3', value: 3},
          {label: '6', value: 6},
          {label: '9', value: 9}
        ]});

    let choices = choicesOrigin.getChoices().map(c => c.value);
    expect(choices).toContain(3);
    expect(choices).toContain(6);
    expect(choices).toContain(9);
  });
});

describe('AjfChoicesFunctionOrigin', () => {
  it('should have choices from a given function', () => {
    let choicesOrigin: AjfChoicesFunctionOrigin<number> =
        new AjfChoicesFunctionOrigin<number>((): AjfChoice<number>[] => {
          return [
            new AjfChoice<number>({label : '3', value : 3}),
            new AjfChoice<number>({label : '6', value : 6}),
            new AjfChoice<number>({label : '9', value : 9})
          ];
        });

    let choices = choicesOrigin.getChoices();
    expect(choices.filter((c: any) => c.value === 3).length).toBe(1);
    expect(choices.filter((c: any) => c.value === 6).length).toBe(1);
    expect(choices.filter((c: any) => c.value === 9).length).toBe(1);
  });
});

describe('AjfChoicesObservableOrigin', () => {
  it('should have choices accumulated from a given observable', () => {
    let subject: Subject<AjfChoice<number>> =
        new Subject<AjfChoice<number>>();
    let choicesOrigin: AjfChoicesObservableOrigin<number> =
        new AjfChoicesObservableOrigin<number>(subject.asObservable());

    let choices = choicesOrigin.getChoices();

    expect(choices).toEqual([]);

    subject.next(new AjfChoice<number>({label : '3', value : 3}));
    subject.next(new AjfChoice<number>({label : '6', value : 6}));
    subject.next(new AjfChoice<number>({label : '9', value : 9}));

    choices = choicesOrigin.getChoices();

    expect(choices.filter((c: any) => c.value === 3).length).toBe(1);
    expect(choices.filter((c: any) => c.value === 6).length).toBe(1);
    expect(choices.filter((c: any) => c.value === 9).length).toBe(1);
  });
});

describe('AjfChoicesObservableArrayOrigin', () => {
  it('should have choices from a given observable', () => {
    let subject: Subject<AjfChoice<number>[]> =
        new Subject<AjfChoice<number>[]>();
    let choicesOrigin: AjfChoicesObservableArrayOrigin<number> =
        new AjfChoicesObservableArrayOrigin<number>(subject.asObservable());

    subject.next([
      new AjfChoice<number>({label : '3', value : 3}),
      new AjfChoice<number>({label : '6', value : 6}),
      new AjfChoice<number>({label : '6', value : 9})
    ]);

    let choices = choicesOrigin.getChoices();

    expect(choices.filter((c: any) => c.value === 3).length).toBe(1);
    expect(choices.filter((c: any) => c.value === 6).length).toBe(1);
    expect(choices.filter((c: any) => c.value === 9).length).toBe(1);
  });
});

describe('AjfChoicesPromiseOrigin', () => {
  it('should have choices from a given promise', (done) => {
    let promise: Promise<AjfChoice<number>[]> =
        new Promise<AjfChoice<number>[]>((resolve) => {
          resolve([
            new AjfChoice<number>({label : '3', value : 3}),
            new AjfChoice<number>({label : '6', value : 6}),
            new AjfChoice<number>({label : '6', value : 9})
          ]);
        });
    let choicesOrigin: AjfChoicesPromiseOrigin<number> =
        new AjfChoicesPromiseOrigin<number>(promise);

    let choices = choicesOrigin.getChoices();

    expect(choices).toEqual([]);

    timer(10).subscribe(() => {
      choices = choicesOrigin.getChoices();

      expect(choices.filter((c: any) => c.value === 3).length).toBe(1);
      expect(choices.filter((c: any) => c.value === 6).length).toBe(1);
      expect(choices.filter((c: any) => c.value === 9).length).toBe(1);

      done();
    });
  });
});
