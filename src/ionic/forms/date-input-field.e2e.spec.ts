import {addDays, format, subDays} from 'date-fns';
import {browser, by, element} from 'protractor';

describe('ajf-date-input-field', () => {
  beforeEach(async () => await browser.get('/ion-date-input-field'));

  it('should show a date input field', async () => {
    expect(await element(by.css('input[type=date]')).isPresent()).toBe(true);
  });

  it('should prevent selecting dates before minDate', async () => {
    const today = new Date(2019, 0, 5);
    const tomorrow = addDays(today, 1);
    const input = element(by.css('input[type=date]'));
    await input.sendKeys(format(today, 'dd'));
    expect(await input.getAttribute('value')).toBe(format(today, 'yyyy-MM-dd'));
    await input.sendKeys(format(tomorrow, 'dd'));
  });

  it('should prevent selecting dates after maxDate', async () => {
    const today = new Date(2019, 0, 5);
    const yesterday = subDays(today, 1);
    const input = element(by.css('input[type=date]'));
    await input.sendKeys(format(today, 'dd'));
    expect(await input.getAttribute('value')).toBe(format(today, 'yyyy-MM-dd'));
    await input.sendKeys(format(yesterday, 'dd'));
    expect(await input.getAttribute('value')).toBe('');
  });
});
