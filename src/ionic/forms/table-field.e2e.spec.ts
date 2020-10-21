import {browser, by, element} from 'protractor';

describe('ajf-table-field', () => {
  beforeEach(async () => await browser.get('/ion-table-field'));

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
});
