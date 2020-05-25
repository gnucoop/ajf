import {expectToExist} from '@ajf/core/testing/private/e2e';
import {browser} from 'protractor';

describe('ajf-file-input', () => {
  beforeEach(async () => await browser.get('/file-input'));

  it('should render a file input', async () => {
    await expectToExist('ajf-file-input');
  });
});
