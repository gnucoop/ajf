import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AjfPageSlider, AjfPageSliderModule} from './index';

describe('AjfPageSlider', () => {
  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [
            BrowserAnimationsModule,
            AjfPageSliderModule,
          ],
          declarations: [TestComponent],
        })
        .compileComponents();
  }));

  it('should scroll slides up / down and to specified index', (done) => {
    const fixture = TestBed.createComponent(TestComponent);
    const slider =
        <AjfPageSlider>fixture.debugElement.query(By.directive(AjfPageSlider)).componentInstance;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(slider.currentPage).toBe(0);

      let s = slider.pageScrollFinish.subscribe(() => {
        s.unsubscribe();
        expect(slider.currentPage).toBe(1);

        s = slider.pageScrollFinish.subscribe(() => {
          s.unsubscribe();
          expect(slider.currentPage).toBe(0);

          s = slider.pageScrollFinish.subscribe(() => {
            s.unsubscribe();
            expect(slider.currentPage).toBe(2);

            done();
          });

          slider.slide({to: 2});
        });

        slider.slide({dir: 'up'});
      });
      slider.slide({dir: 'down'});
    });
  });
});

@Component({
  template: `
    <ajf-page-slider [ngStyle]="{'height': '400px'}">
      <ajf-page-slider-item [ngStyle]="{'height': '300px'}">slide 1</ajf-page-slider-item>
      <ajf-page-slider-item [ngStyle]="{'height': '300px'}">slide 2</ajf-page-slider-item>
      <ajf-page-slider-item [ngStyle]="{'height': '300px'}">slide 3</ajf-page-slider-item>
    </ajf-page-slider>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
}
