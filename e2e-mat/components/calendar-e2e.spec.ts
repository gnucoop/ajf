import {browser, by, element} from 'protractor';

describe('calendar', () => {

  describe('dummy', () => {

    beforeEach(async () => await browser.get('/calendar'));

    it('test', async () => {
      expect(element(by.id('calendar'))).toBeDefined();
    });
  });
});
