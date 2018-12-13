import {browser} from 'protractor';

describe('hello, protractor', () => {
  describe('index', () => {
    browser.get('/');
    it('should have a title', async () => {
      expect(await browser.getTitle()).toBe('Advanced JSON forms');
    });
  });
});
