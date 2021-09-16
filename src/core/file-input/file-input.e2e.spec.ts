import {browser} from 'protractor';

import {expectToExist} from '../testing/private/e2e';

describe('ajf-file-input', () => {
  beforeEach(async () => await browser.get('/file-input'));

  it('should render a file input', async () => {
    await expectToExist('ajf-file-input');
  });
});
