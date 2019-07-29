import {browser, by, element} from 'protractor';

describe('ajf-calendar', () => {

  beforeEach(async () => await browser.get('/calendar'));

  it('should show a calendar', async () => {
    expect(await element(by.tagName('ajf-calendar'))).toBeDefined();
  });

});
