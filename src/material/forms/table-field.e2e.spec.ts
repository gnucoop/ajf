import {browser, by, element, ExpectedConditions, Key} from 'protractor';

describe('ajf-table-field', () => {
  beforeEach(async () => await browser.get('/mat-table-field'));

  it('should show a table field', async () => {
    expect(await element(by.className('ajf-table-field'))).toBeDefined();
    const cells = await element.all(by.tagName('td'));
    expect(cells.length).toBe(12);
    expect(cells[0].getText()).toBe('Labels');
    expect(cells[1].getText()).toBe('Label 1');
    expect(cells[2].getText()).toBe('Label 2');
    expect(cells[3].getText()).toBe('Label 3');
  });

  it('should show an input on data cell click', async () => {
    const cells = await element.all(by.tagName('td'));
    await cells[0].click();
    await browser.wait(
        ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.css('input')))));
    await cells[5].click();
    await browser.wait(ExpectedConditions.presenceOf(element(by.css('input'))));
  });

  it('should go to next cell when pressed the tab key in input', async () => {
    const cells = await element.all(by.tagName('td'));
    await cells[5].click();
    await browser.wait(ExpectedConditions.presenceOf(
        element(by.css('tr:nth-of-type(2) td:nth-of-type(2) input'))));
    let input = await element(by.css('input'));
    expect(await input.isPresent()).toBe(true);
    await input.sendKeys(Key.TAB);
    await browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(
        element(by.css('tr:nth-of-type(2) td:nth-of-type(2) input')))));
    await browser.wait(ExpectedConditions.presenceOf(
        element(by.css('tr:nth-of-type(2) td:nth-of-type(3) input'))));
  });
});
