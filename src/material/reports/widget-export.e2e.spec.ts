import {format} from 'date-fns';
import {existsSync} from 'fs';
import {browser, by, element} from 'protractor';

describe('ajf-widget-export', () => {
  beforeEach(async () => await browser.get('/mat-report'));

  it('should show the export menu for an exportable widget', async () => {
    const widgetExport = element(by.tagName('ajf-widget-export'));
    expect(await widgetExport.isPresent()).toBe(true);
    const widgetExportMenu = element(by.className('ajf-export-menu'));
    expect(await widgetExportMenu.isPresent()).toBe(true);
    expect(await widgetExportMenu.isDisplayed()).toBe(false);
    await browser.actions().mouseMove(widgetExport).perform();
    expect(await widgetExportMenu.isDisplayed()).toBe(true);
  });

  it('should download widget data in csv', async () => {
    const widgetExport = element(by.tagName('ajf-widget-export'));
    await browser.actions().mouseMove(widgetExport).perform();
    const csvButton = element(by.buttonText('CSV'));
    await csvButton.click();
    const fileName = `Chart ${format(new Date(), `yyyy-MM-dd`)}.csv`;
    await browser.wait(() => existsSync(fileName), 3000);
  });

  it('should download widget data in xlsx', async () => {
    const widgetExport = element(by.tagName('ajf-widget-export'));
    await browser.actions().mouseMove(widgetExport).perform();
    const csvButton = element(by.buttonText('XLSX'));
    await csvButton.click();
    const fileName = `Chart ${format(new Date(), `yyyy-MM-dd`)}.xlsx`;
    await browser.wait(() => existsSync(fileName), 3000);
  });
});
