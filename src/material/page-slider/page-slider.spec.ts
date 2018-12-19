import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {AjfPageSlider, AjfPageSliderModule} from './public-api';


describe('AjfPageSlider', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AjfPageSliderModule],
      declarations: [TestComponent]
    }).compileComponents();
  }));

  it('should scroll slides up / down and to specified index', (done) => {
    const fixture = TestBed.createComponent(TestComponent);
    const slider = <AjfPageSlider>fixture.debugElement
      .query(By.directive(AjfPageSlider)).componentInstance;

    let currentSlide: number = -1;

    slider.currentItemPosition.subscribe(p => currentSlide = p);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(currentSlide).toBe(0);

      let s = slider.pageScrollFinish.subscribe(() => {
        s.unsubscribe();
        expect(currentSlide).toBe(1);

        s = slider.pageScrollFinish.subscribe(() => {
          s.unsubscribe();
          expect(currentSlide).toBe(0);

          s = slider.pageScrollFinish.subscribe(() => {
            s.unsubscribe();
            expect(currentSlide).toBe(2);

            done();
          });

          slider.scrollTo(undefined, 2);
        });

        slider.scrollTo(false);
      });
      slider.scrollTo(true);
    });
  });
});


@Component({
  moduleId: module.id,
  template: `
    <ajf-page-slider [ngStyle]="{'height': '400px'}">
      <div ajfPageSliderBody>
        <ajf-page-slider-item [ngStyle]="{'height': '300px'}">slide 1</ajf-page-slider-item>
        <ajf-page-slider-item [ngStyle]="{'height': '300px'}">slide 2</ajf-page-slider-item>
        <ajf-page-slider-item [ngStyle]="{'height': '300px'}">slide 3</ajf-page-slider-item>
      </div>
    </ajf-page-slider>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent { }
