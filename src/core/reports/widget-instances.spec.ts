import {AjfTextWidgetInstance, AjfWidgetType, createWidget,
  widgetToWidgetInstance} from './public-api';

class TsMock {
  instant(str: string): string {
    return str;
  }
}

describe('widgetToWidgetInstance', () => {
  it('should replace interpolated context variables in ', () => {
    const tsMock = new TsMock() as any;

    const widget = createWidget({
      widgetType: AjfWidgetType.Text,
      htmlText: 'Test string [[foo]] - bar [[baz]]'
    } as any);
    const instance = widgetToWidgetInstance(
      widget, {foo: 'quz', baz: 'qux'}, tsMock) as AjfTextWidgetInstance;

    expect(instance.htmlText).toEqual('Test string quz - bar qux');
  });
});
