import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {waitForAsync, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AjfPageSlider, AjfPageSliderModule} from './public_api';

describe('AjfPageSlider', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule, AjfPageSliderModule],
        declarations: [TestComponent],
      }).compileComponents();
    }),
  );

  it('should scroll slides up / down and to specified index', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    const slider = <AjfPageSlider>(
      fixture.debugElement.query(By.directive(AjfPageSlider)).componentInstance
    );

    fixture.detectChanges();
    await fixture.whenStable();

    expect(slider.currentPage).toBe(-1);

    slider.slide({dir: 'down'});
    expect(slider.currentPage).toBe(0);

    slider.slide({dir: 'forward'});
    expect(slider.currentPage).toBe(1);

    slider.slide({dir: 'up'});
    expect(slider.currentPage).toBe(0);

    slider.slide({to: slider.pages.length - 1});
    expect(slider.currentPage).toBe(2);
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {}
