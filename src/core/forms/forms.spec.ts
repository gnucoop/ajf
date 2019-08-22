import {createForm} from './public-api';

describe('createForm', () => {
  it('should create a valid form', () => {
    let form = createForm();

    expect(form.choicesOrigins).toEqual([]);
    expect(form.nodes).toEqual([]);
  });
});
