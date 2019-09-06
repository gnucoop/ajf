import {addDays, format, subDays} from 'date-fns';
import {browser, by, element} from 'protractor';

describe('ajf-date-input-field', () => {

  beforeEach(async () => await browser.get('/date-input-field'));

  it('should show a date input field', async () => {
    expect(await element(by.css('input[type=date]'))).toBeDefined();
  });

  it('should prevent selecting dates before minDate and after maxDate', async () => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const yesterday = subDays(today, 1);
    const input = await element(by.css('input[type=date]'));
    await input.sendKeys(format(today, 'DD'));
    expect(await input.getAttribute('value')).toBe(format(today, 'YYYY-MM-DD'));
    await input.sendKeys(format(tomorrow, 'DD'));
    expect(await input.getAttribute('value')).toBe('');
    await input.sendKeys(format(yesterday, 'DD'));
    expect(await input.getAttribute('value')).toBe('');
  });

});
