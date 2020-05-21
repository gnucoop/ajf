import {browser, by, element} from 'protractor';

describe('ajf-calendar', () => {
  beforeEach(async () => await browser.get('/mat-calendar'));

  it('should show a calendar', async () => {
    expect(await element(by.tagName('ajf-calendar')).isPresent()).toBe(true);
  });
});
