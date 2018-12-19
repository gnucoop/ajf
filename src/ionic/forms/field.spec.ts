import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormBuilder, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';

import {IonInput, IonicModule, IonTextarea, IonToggle} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {
  AjfChoicesOrigin, AjfField, AjfFieldInstance,
  AjfFieldWithChoices, AjfFieldWithChoicesInstance,
  AjfFormRendererService, AjfFieldType
} from '@ajf/core/forms';
import {AjfCheckboxGroupItem} from '@ajf/ionic/checkbox-group';

import {AjfFormField, AjfFormsModule} from './public-api';

import {AjfFormRendererServiceMock} from './mocks.spec';
import * as testData from './test-data.spec';

describe('AjfFormField', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        IonicModule.forRoot(),
        AjfFormsModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule
      ],
      declarations: [
        SingleChoiceTestComponent,
      ],
      providers: [
        {provide: AjfFormRendererService, useClass: AjfFormRendererServiceMock, deps: [FormBuilder]}
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render a text input for a field of type string', async(() => {
    const fixture = TestBed.createComponent(AjfFormField);
    const fieldRenderer = <AjfFormField>fixture.componentInstance;

    const field = AjfField.fromJson(testData.jsonFieldString, [], [], {});
    const fieldInstance = new AjfFieldInstance({node: field});

    fieldRenderer.fieldInstance = fieldInstance;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const ionInputDe = fixture.debugElement.query(By.directive(IonInput));
      const ionInput = ionInputDe.componentInstance;

      expect(fieldRenderer.fieldInstance.field.fieldType).toBe(AjfFieldType.String);
      expect(fieldRenderer.fieldInstance.completeName).toBe('question_string');
      expect(fieldRenderer.fieldInstance.field.label).toBe('Question string');
      expect(ionInput).toBeDefined();
      expect(ionInput.type).toBe('text');
    });
  }));

  it('field type text', async(() => {
    const fixture = TestBed.createComponent(AjfFormField);
    const fieldRenderer = <AjfFormField>fixture.componentInstance;

    const field = AjfField.fromJson(testData.jsonFieldText, [], [], {});
    const fieldInstance = new AjfFieldInstance({node: field});

    fieldRenderer.fieldInstance = fieldInstance;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const ionInputDe = fixture.debugElement.query(By.directive(IonTextarea));

      expect(fieldRenderer.fieldInstance.field.fieldType).toBe(AjfFieldType.Text);
      expect(fieldRenderer.fieldInstance.completeName).toBe('question_text');
      expect(fieldRenderer.fieldInstance.field.label).toBe('Question text');
      expect(ionInputDe).toBeDefined();
    });
  }));

  it('field type number', async(() => {
    const fixture = TestBed.createComponent(AjfFormField);
    const fieldRenderer = <AjfFormField>fixture.componentInstance;

    const field = AjfField.fromJson(testData.jsonFieldNumber, [], [], {});
    const fieldInstance = new AjfFieldInstance({node: field});

    fieldRenderer.fieldInstance = fieldInstance;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let ionInput = fixture.debugElement
        .query(By.directive(IonInput)).componentInstance;

      expect(fieldRenderer.fieldInstance.field.fieldType).toBe(AjfFieldType.Number);
      expect(fieldRenderer.fieldInstance.completeName).toBe('question_number');
      expect(fieldRenderer.fieldInstance.field.label).toBe('Question number');
      expect(ionInput).toBeDefined();
      expect(ionInput.type).toBe('number');
    });
  }));

  it('field type boolean', async(() => {
    const fixture = TestBed.createComponent(AjfFormField);
    const fieldRenderer = <AjfFormField>fixture.componentInstance;

    const field = AjfField.fromJson(testData.jsonFieldBoolean, [], [], {});
    const fieldInstance = new AjfFieldInstance({node: field});

    fieldRenderer.fieldInstance = fieldInstance;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let ionToggle = fixture.debugElement.query(By.directive(IonToggle))
          .componentInstance;

      expect(fieldRenderer.fieldInstance.field.fieldType).toBe(AjfFieldType.Boolean);
      expect(fieldRenderer.fieldInstance.completeName).toBe('question_boolean');
      expect(fieldRenderer.fieldInstance.field.label).toBe('Question boolean');
      expect(ionToggle).toBeDefined();
      expect(ionToggle.checked).toBe(false);
    });
  }));

  // describe('field type single choice', () => {
  //   it('test field value', async(() => {
  //     const fixture = TestBed.createComponent(SingleChoiceTestComponent);

  //     fixture.detectChanges();
  //     fixture.whenStable().then(() => {
  //       const fieldRenderer = <AjfFormField>fixture.debugElement
  //         .query(By.directive(AjfFormField)).componentInstance;
  //       const fieldInstance = fixture.componentInstance.fieldInstance;
  //       const fieldWc = <AjfFieldWithChoices>fieldRenderer.fieldInstance.field;
  //       expect(fieldWc.fieldType).toBe(AjfFieldType.SingleChoice);
  //       expect(fieldInstance.completeName).toBe('question_single_choice');
  //       expect(fieldWc.label).toBe('Question single choice');
  //       expect(fieldWc.choices.length).toBe(2);
  //       expect(fieldWc.choices[0].label).toBe('choice 1');
  //       expect(fieldWc.choices[0].value).toBe('choice 1');
  //       expect(fieldWc.choices[1].label).toBe('choice 2');
  //       expect(fieldWc.choices[1].value).toBe('choice 2');
  //       expect(fieldWc.choicesOriginRef).toBe('test_choices');
  //       expect(fieldWc.hasChoices).toBe(true);
  //       expect(fieldWc.choicesOrigin).toBeDefined();
  //     });
  //   }));

  //   it('test if only one choice is selected', fakeAsync(() => {
  //     const choicesOrigins = testData.jsonChoicesOrigins.map(c => AjfChoicesOrigin.fromJson(c));

  //     const fixture = TestBed.createComponent(AjfFormField);
  //     const fieldRenderer = <AjfFormField>fixture.componentInstance;

  //     const field = AjfField.fromJson(testData.jsonFieldSingleChoice, choicesOrigins, [], {});
  //     const fieldInstance = new AjfFieldWithChoicesInstance({node: field});

  //     fieldRenderer.fieldInstance = fieldInstance;

  //     fixture.detectChanges();
  //     tick();

  //     const ionRadio = fixture.debugElement.queryAll(By.directive(IonRadio));

  //     ionRadio[0].componentInstance.checked = true;

  //     fixture.detectChanges();
  //     tick();

  //     expect(ionRadio[0].componentInstance.checked).toBe(true);
  //     expect(ionRadio[1].componentInstance.checked).toBe(false);
  //   }));
  // });

  it('field type multiple choice', async(() => {
    const choicesOrigins = testData.jsonChoicesOrigins.map(c => AjfChoicesOrigin.fromJson(c));

    const fixture = TestBed.createComponent(AjfFormField);
    const fieldRenderer = <AjfFormField>fixture.componentInstance;

    const field = AjfField.fromJson(testData.jsonFieldMultipleChoice, choicesOrigins, [], {});
    const fieldInstance = new AjfFieldWithChoicesInstance({node: field});

    fieldRenderer.fieldInstance = fieldInstance;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const fieldWc = <AjfFieldWithChoices>fieldRenderer.fieldInstance.field;
      expect(fieldWc.fieldType).toBe(AjfFieldType.MultipleChoice);
      expect(fieldRenderer.fieldInstance.completeName).toBe('question_multiple_choice');
      expect(fieldWc.label).toBe('Question multiple choice');
      expect(fieldWc.choices.length).toBe(2);
      expect(fieldWc.choices[0].label).toBe('choice 1');
      expect(fieldWc.choices[0].value).toBe('choice 1');
      expect(fieldWc.choices[1].label).toBe('choice 2');
      expect(fieldWc.choices[1].value).toBe('choice 2');
      expect(fieldWc.choicesOriginRef).toBe('test_choices');
      expect(fieldWc.hasChoices).toBe(true);
      expect(fieldWc.choicesOrigin).toBeDefined();

      const ionCheckbox = fixture.debugElement.queryAll(By.directive(AjfCheckboxGroupItem));

      ionCheckbox[0].componentInstance.checked = true;

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(ionCheckbox[0].componentInstance.checked).toBe(true);
        expect(ionCheckbox[1].componentInstance.checked).toBe(false);
      });
    });
  }));

  it('field type formula', async(() => {
    const fixture = TestBed.createComponent(AjfFormField);
    const fieldRenderer = <AjfFormField>fixture.componentInstance;

    const field = AjfField.fromJson(testData.jsonFieldFormula, [], [], {});
    const fieldInstance = new AjfFieldInstance({node: field});

    fieldRenderer.fieldInstance = fieldInstance;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fieldRenderer.fieldInstance.field.fieldType).toBe(AjfFieldType.Formula);
      expect(fieldRenderer.fieldInstance.completeName).toBe('question_formula');
      expect(fieldRenderer.fieldInstance.field.label).toBe('Question formula');
      expect(fieldRenderer.fieldInstance.field.formula!.formula).toBe('sum(1)');
    });
  }));

  it('field type empty', async(() => {
    const fixture = TestBed.createComponent(AjfFormField);
    const fieldRenderer = <AjfFormField>fixture.componentInstance;

    const field = AjfField.fromJson(testData.jsonFieldEmpty, [], [], {});
    const fieldInstance = new AjfFieldInstance({node: field});

    fieldRenderer.fieldInstance = fieldInstance;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fieldRenderer.fieldInstance.field.fieldType).toBe(AjfFieldType.Empty);
      expect(fieldRenderer.fieldInstance.completeName).toBe('question_empty');
      expect(fieldRenderer.fieldInstance.field.label).toBe('Question empty');
    });
  }));

  it('field type date', async(() => {
    const fixture = TestBed.createComponent(AjfFormField);
    const fieldRenderer = <AjfFormField>fixture.componentInstance;

    const field = AjfField.fromJson(testData.jsonFieldDate, [], [], {});
    const fieldInstance = new AjfFieldInstance({node: field});

    fieldRenderer.fieldInstance = fieldInstance;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fieldRenderer.fieldInstance.field.fieldType).toBe(AjfFieldType.DateInput);
      expect(fieldRenderer.fieldInstance.completeName).toBe('question_date');
      expect(fieldRenderer.fieldInstance.field.label).toBe('Question date');
    });
  }));
});

@Component({
  template: '<form [formGroup]=""><ajf-field [fieldInstance]="fieldInstance"></ajf-field></form>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
class SingleChoiceTestComponent {
  fieldInstance: AjfFieldWithChoicesInstance;
  formGroup: FormGroup;

  constructor(service: AjfFormRendererService) {
    this.formGroup = (service as any).form;
    const choicesOrigins = testData.jsonChoicesOrigins.map(c => AjfChoicesOrigin.fromJson(c));
    const field = AjfField.fromJson(testData.jsonFieldSingleChoice, choicesOrigins, [], {});
    this.fieldInstance = new AjfFieldWithChoicesInstance({node: field});
  }
}
