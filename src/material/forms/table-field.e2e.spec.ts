
import {browser, by, element, ExpectedConditions, Key} from 'protractor';

describe('ajf-table-field', () => {
  beforeEach(async () => await browser.get('/mat-table-field'));

  it('should show a table field', async () => {
    expect(await element(by.className('ajf-table-field')).isPresent()).toBe(true);
    const cells = await element.all(by.tagName('td')).getWebElements();
    expect(cells.length).toBe(12);
    cells.forEach(async cell => console.log(await cell.getText()));
    expect(await cells[0].getText()).toBe('2.1');
    expect(await cells[4].getText()).toBe('Row 1');
    expect(await cells[8].getText()).toBe('Row 2');
  });

  it('should show table header', async () => {
    const cells = await element.all(by.tagName('td')).getWebElements();
    cells.forEach(async cell => console.log(await cell.getText()));
    expect(await cells[1].getText()).toBe('Label 1');
    expect(await cells[2].getText()).toBe('Label 2');
    expect(await cells[3].getText()).toBe('Label 3');
  });

  it('should show an input on data cell click', async () => {
    const cells = await element.all(by.tagName('td')).getWebElements();
    await cells[0].click();
    await browser.wait(
        ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.css('input')))));
    await cells[5].click();
    await browser.wait(ExpectedConditions.presenceOf(element(by.css('input'))));
  });

  it('should go to next cell when pressed the tab key in input', async () => {
    const cells = await element.all(by.tagName('td')).getWebElements();
    await cells[5].click();
    await browser.wait(ExpectedConditions.presenceOf(
        element(by.css('tr:nth-of-type(2) td:nth-of-type(2) input'))));
    let input = element(by.css('input'));
    expect(await input.isPresent()).toBe(true);
    await input.sendKeys(Key.TAB);
    await browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(
        element(by.css('tr:nth-of-type(2) td:nth-of-type(2) input')))));
    await browser.wait(ExpectedConditions.presenceOf(
        element(by.css('tr:nth-of-type(2) td:nth-of-type(3) input'))));
  });

  it('should types two input values and check the formula sum result', async () => {
    await browser.get('/mat-table-field/?formulas=true');  // use formulas schema
    const cells = await element.all(by.tagName('td')).getWebElements();
    await cells[5].click();  // click on the first cell value
    let input = element(by.css('input'));
    expect(await input.isPresent()).toBe(true);
    await input.sendKeys(1);        // write 1 in the input value
    await input.sendKeys(Key.TAB);  // remove focus
    await cells[6].click();         // click on the second cell value
    input = element(by.css('input'));
    expect(await input.isPresent()).toBe(true);
    await input.sendKeys(1);        // write 1 in the input value
    await input.sendKeys(Key.TAB);  // remove focus
    expect(await cells[7].getText()).toBe('2');
  });
});
