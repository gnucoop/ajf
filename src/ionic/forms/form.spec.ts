import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// import {map} from 'rxjs/operators';

import {IonButton, IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {AjfForm, AjfFormActionEvent} from '@ajf/core/forms';
import {AjfCalendarModule} from '@ajf/ionic/calendar';
// import {AjfPageSlider, AjfPageSliderItem} from '@ajf/ionic/page-slider';

import {AjfFormRenderer, AjfFormsModule} from './public-api';

import * as testData from './test-data.spec';

describe('AjfFormRenderer', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        AjfFormsModule,
        AjfCalendarModule
      ],
      declarations: [
        TestComponent
      ],
    });
    TestBed.compileComponents();
  }));

  it('constructor: test if formGroup, slides, invalidItemNumber, nSlides,  '
      + 'are defined', async(() => {
    const form = AjfForm.fromJson(testData.jsonForm);
    const fixture = TestBed.createComponent(AjfFormRenderer);
    const formRenderer = <AjfFormRenderer>fixture.componentInstance;

    formRenderer.form = form;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(formRenderer.formGroup).toBeDefined();
      expect(formRenderer.slides).toBeDefined();
      expect(formRenderer.slidesNum).toBeDefined();
    });
  }));

  // it('ngAfterContentInit(): test if _init is set correctly and if number of '
  //     + 'rendered obj is equal to number of form question', async(() => {
  //   const form = AjfForm.fromJson(testData.jsonForm);
  //   const fixture = TestBed.createComponent(AjfFormRenderer);
  //   const formRenderer = <AjfFormRenderer>fixture.componentInstance;

  //   formRenderer.form = form;

  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     const ionSliders = fixture.debugElement.queryAll(By.directive(AjfPageSlider));
  //     const ionSliderItems = fixture.debugElement.queryAll(By.directive(AjfPageSliderItem));

  //     expect(ionSliders.length).toBe(1);
  //     expect(ionSliderItems.length).toBe(2);
  //   });
  // }));

  it('onSave(): test emit ', fakeAsync(() => {
    const form = AjfForm.fromJson(testData.jsonForm);
    const fixture = TestBed.createComponent(AjfFormRenderer);
    const formRenderer = <AjfFormRenderer>fixture.componentInstance;

    formRenderer.form = form;
    formRenderer.saveDisabled = false;

    fixture.detectChanges();
    tick();
    const button = fixture.debugElement.query(By.directive(IonButton));

    let saveEvt: AjfFormActionEvent | null = null;
    const s = formRenderer.formAction
      .subscribe((se) => {
        saveEvt = se;
        s.unsubscribe();
      });

    button.triggerEventHandler('click', {});
    tick(300);

    expect(saveEvt).not.toBeNull();
    expect(saveEvt!.action).toBe('save');
    expect(saveEvt!.source).toBe(formRenderer);
  }));

  // describe('onSubmit()', () => {
  //   it('test emit with form filled, launch emit expect', fakeAsync(() => {
  //     const form = AjfForm.fromJson(testData.jsonForm);
  //     const fixture = TestBed.createComponent(AjfFormRenderer);
  //     const formRenderer = <AjfFormRenderer>fixture.componentInstance;

  //     formRenderer.form = form;
  //     formRenderer.saveDisabled = false;

  //     fixture.detectChanges();
  //     tick();

  //     let fields = fixture.debugElement.queryAll(By.directive(AjfFormField));

  //     fields.forEach(f => {
  //       const ci = <AjfFormField>f.componentInstance;
  //       const fieldName = ci.fieldInstance.field.name;
  //       if (fieldName === 'question_1') {
  //         ci.fieldInstance.value = 'x';
  //       } else if (fieldName === 'question_2') {
  //         ci.fieldInstance.value = 2;
  //       }
  //     });

  //     fixture.detectChanges();
  //     tick();

  //     const button = fixture.debugElement.queryAll(By.directive(IonButton))[1];

  //     let saveEvt: AjfFormActionEvent | null = null;
  //     const s = formRenderer.formAction
  //       .subscribe((se) => {
  //         s.unsubscribe();

  //         saveEvt = se;
  //       });

  //     button.triggerEventHandler('click', {});
  //     fixture.detectChanges();
  //     tick(300);

  //     expect(saveEvt).not.toBe(null);
  //     expect(saveEvt!.action).toBe('send');
  //   }));
  // });

  // it('test emit with empty form, no launch emit expect', (done) => {
  //   const form = AjfForm.fromJson(testData.jsonForm);
  //   const fixture = TestBed.createComponent(AjfFormRenderer);
  //   const formRenderer = <AjfFormRenderer>fixture.componentInstance;

  //   formRenderer.form = form;
  //   formRenderer.saveDisabled = false;

  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     const s = formRenderer.errors.pipe(map(e => e > 0))
  //       .subscribe(() => {
  //         if (s && !s.closed) { s.unsubscribe(); }

  //         fixture.detectChanges();
  //         fixture.whenStable().then(() => {
  //           const button = fixture.debugElement.queryAll(By.directive(IonButton))[1];
  //           expect(button.nativeElement.disabled).toBeTruthy();

  //           done();
  //         });
  //       });
  //   });
  // });
});


@Component({
  moduleId: module.id,
  selector: '',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
class TestComponent { }
