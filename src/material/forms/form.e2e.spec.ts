import {browser, by, element} from 'protractor';

describe('ajf-form test top toolbar input', () => {
  it(`topbar input is true and hideTopToolbar is not defined:
  should show three mat toolbars(topBar buttonsBar pageSliderToolBar)`, async () => {
    await browser.get('/mat-form/?topbar=true');
    const toolbars = await element.all(by.tagName('mat-toolbar')).getWebElements();
    expect(toolbars.length).toBe(3);

    const topBar = toolbars[0];
    expect(await topBar.getText()).toBe('Number Field Example');
    const buttonsBar = toolbars[1];
    expect(await buttonsBar.getText()).toBe('Save');
  });
  it(`topbar input is true and hideTopToolbar is false:
  should show one mat toolbar(pageSliderToolBar)`, async () => {
    await browser.get('/mat-form/?topbar=true&hidetoolbar=false');
    const toolbars = await element.all(by.tagName('mat-toolbar')).getWebElements();
    expect(toolbars.length).toBe(3);

    const topBar = toolbars[0];
    expect(await topBar.getText()).toBe('Number Field Example');
    const buttonsBar = toolbars[1];
    expect(await buttonsBar.getText()).toBe('Save');
  });
  it(`topbar input is true and hideTopToolbar is true:
  should show one mat toolbar(pageSliderToolBar)`, async () => {
    await browser.get('/mat-form/?topbar=true&hidetoolbar=true');
    const toolbars = await element.all(by.tagName('mat-toolbar')).getWebElements();
    expect(toolbars.length).toBe(1);
  });
  it(`topbar input is false and hideTopToolbar is not defined:
  should show two mat toolbars(buttonsBar pageSliderToolBar)`, async () => {
    await browser.get('/mat-form/?topbar=false');
    const toolbars = await element.all(by.tagName('mat-toolbar')).getWebElements();
    expect(toolbars.length).toBe(2);

    const buttonsBar = toolbars[0];
    expect(await buttonsBar.getText()).toBe('Save');
  });
  it(`topbar input is false and hideTopToolbar is false:
  should show two mat toolbars(buttonsBar pageSliderToolBar)`, async () => {
    await browser.get('/mat-form/?topbar=false&hidetoolbar=false');
    const toolbars = await element.all(by.tagName('mat-toolbar')).getWebElements();
    expect(toolbars.length).toBe(2);

    const buttonsBar = toolbars[0];
    expect(await buttonsBar.getText()).toBe('Save');
  });
  it(`topbar input is false and hideTopToolbar is true:
  should show one mat toolbar(pageSliderToolBar)`, async () => {
    await browser.get('/mat-form/?topbar=true&hidetoolbar=true');
    const toolbars = await element.all(by.tagName('mat-toolbar')).getWebElements();
    expect(toolbars.length).toBe(1);
  });
  it(`topbar input is not defined and hideTopToolbar is not defined:
  should show two mat toolbars(buttonsBar pageSliderToolBar)`, async () => {
    await browser.get('/mat-form/');
    const toolbars = await element.all(by.tagName('mat-toolbar')).getWebElements();
    expect(toolbars.length).toBe(2);

    const buttonsBar = toolbars[0];
    expect(await buttonsBar.getText()).toBe('Save');
  });
  it(`topbar input is not defined and hideTopToolbar is false:
  should show two mat toolbars(buttonsBar pageSliderToolBar)`, async () => {
    await browser.get('/mat-form/?hidetoolbar=false');
    const toolbars = await element.all(by.tagName('mat-toolbar')).getWebElements();
    expect(toolbars.length).toBe(2);

    const buttonsBar = toolbars[0];
    expect(await buttonsBar.getText()).toBe('Save');
  });
  it(`topbar input is not defined and hideTopToolbar is true:
  should show one mat toolbar(pageSliderToolBar)`, async () => {
    await browser.get('/mat-form/?hidetoolbar=true');
    const toolbars = await element.all(by.tagName('mat-toolbar')).getWebElements();
    expect(toolbars.length).toBe(1);
  });
  it(`topbar input is not defined and hideTopToolbar is true:
     should show one mat toolbar(pageSliderToolBar)`, async () => {
    await browser.get('/mat-form/?hidetoolbar=true');
    const toolbars = await element.all(by.tagName('mat-toolbar')).getWebElements();
    expect(toolbars.length).toBe(1);
  });
});
