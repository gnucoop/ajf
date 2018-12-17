import {AjfChoicesOrigin, AjfField, AjfFieldType, AjfForm} from './public-api';


describe('AjfForm', () => {
  it('should have fields and choices origins', () => {
    let form: AjfForm = new AjfForm();

    expect(form.choicesOrigins).toEqual([]);
    expect(form.nodes).toEqual([]);

    let choicesOrigins: AjfChoicesOrigin<string>[] =
        [ AjfChoicesOrigin.create('string', []) ];
    let fields: AjfField[] = [ AjfField.create(AjfFieldType.String) ];
    form = new AjfForm({'choicesOrigins' : choicesOrigins, 'fields' : fields});
    expect(form.choicesOrigins).toEqual(choicesOrigins);
    expect(form.nodes).toEqual(form.nodes);
  });
});
