import {browser, by, element} from 'protractor';

describe('ajf-table-field', () => {
  beforeEach(async () => await browser.get('/ion-table-field'));

  it('should show a table field', async () => {
    expect(await element(by.className('ajf-table-field')).isPresent()).toBe(true);
    const cells = await element.all(by.tagName('td')).getWebElements();
    const cellsNum = cells.length;
    expect(cellsNum).toBe(12);
    const cellsValues = [] as string[];
    for (let i = 0; i < cellsNum; i++) {
      const cell = cells[i];
      cellsValues.push(await cell.getText());
      console.log(`cell ${i}: ${cellsValues[i]}`);
    }
    expect(cellsValues[0]).toBe('2.1');
    expect(cellsValues[4]).toBe('Row 1');
    expect(cellsValues[8]).toBe('Row 2');
  });

  it('should show table header', async () => {
    const cells = await element.all(by.tagName('td')).getWebElements();
    const cellsNum = cells.length;
    expect(cellsNum).toBe(12);
    const cellsValues = [] as string[];
    for (let i = 0; i < cellsNum; i++) {
      const cell = cells[i];
      cellsValues.push(await cell.getText());
      console.log(`cell ${i}: ${cellsValues[i]}`);
    }
    expect(cellsValues[1]).toBe('Label 1');
    expect(cellsValues[2]).toBe('Label 2');
    expect(cellsValues[3]).toBe('Label 3');
  });
});
