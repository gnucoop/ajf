import {browser, by, element} from 'protractor';

describe('ajf-report test with local filter', () => {
  beforeEach(async () => await browser.get('/mat-report/?filter=filter'));
  it(`expected default values`, async () => {
    const text = element(by.className('ajf-text-container'));
    expect(await text.getText()).toBe('defaultLabelA,defaultLabelB,defaultLabelC');
  });
  it(`expected first values`, async () => {
    const radioBtns = await element.all(by.tagName('mat-radio-button')).getWebElements();
    await radioBtns[0].click();
    const text = element(by.className('ajf-text-container'));
    expect(await text.getText()).toBe('firstLabelA,firstLabelB,firstLabelC');
  });
  it(`expected second values`, async () => {
    const radioBtns = await element.all(by.tagName('mat-radio-button')).getWebElements();
    await radioBtns[1].click();
    const text = element(by.className('ajf-text-container'));
    expect(await text.getText()).toBe('secondLabelA,secondLabelB,secondLabelC');
  });
});

describe('ajf-report test with global filter:', () => {
  beforeEach(async () => await browser.get('/mat-report/?filter=global'));
  it(`no selection`, async () => {
    const globalText = element(by.className('global'));
    expect(await globalText.getText()).toBe('nullnull');
    const localText = element(by.className('local'));
    expect(await localText.getText()).toBe('null');
  });
  it(`select Global zone with 'first' value activate subzones filter(global and local)`, async () => {
    let radioBtns = await element.all(by.tagName('mat-radio-button')).getWebElements();
    expect(radioBtns.length).toBe(2);
    await radioBtns[0].click();
    radioBtns = await element.all(by.tagName('mat-radio-button')).getWebElements();
    expect(radioBtns.length).toBe(8);
  });
  it(`global filter: with (global zones)=> 'first' and (Sub Zones) => 1a, first text widget should be showed 'first1a' text widget with filter should be showed '1a'`, async () => {
    let startRadioBtns = await element.all(by.tagName('mat-radio-button')).getWebElements();
    await startRadioBtns[0].click();
    let afterRadioBtns = await element.all(by.tagName('mat-radio-button')).getWebElements();
    await afterRadioBtns[2].click();
    let globalText = element(by.className('global'));
    let localText = element(by.className('local'));
    expect(await globalText.getText()).toBe('first1a');
    expect(await localText.getText()).toBe('1a');
  });
  it(`variation of filter related to second text widget dont change other widgets`, async () => {
    let radioBtns = await element.all(by.tagName('mat-radio-button')).getWebElements();
    await radioBtns[0].click();
    radioBtns = await element.all(by.tagName('mat-radio-button')).getWebElements();
    await radioBtns[2].click();
    radioBtns = await element.all(by.tagName('mat-radio-button')).getWebElements();
    await radioBtns[7].click();
    let globalText = element(by.className('global'));
    let localText = element(by.className('local'));
    expect(await globalText.getText()).toBe('first1a');
    expect(await localText.getText()).toBe('1c');
  });
});
