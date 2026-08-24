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

  it('should size the body for the pages it already has', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    // Three pages laid out side by side, so the body is three pages wide. This
    // used to be driven only by `pages.changes`, which never fires when the
    // pages are created in the same pass as the slider, leaving every page
    // sharing the width of one.
    const body = fixture.debugElement.query(By.css('.ajf-page-slider-body'))
      .nativeElement as HTMLElement;
    expect(body.style.width).toBe('300%');
  });

  it('should scroll slides up / down and to specified index', async () => {
    const fixture = TestBed.createComponent(TestComponent);
    const slider = <AjfPageSlider>(
      fixture.debugElement.query(By.directive(AjfPageSlider)).componentInstance
    );

    fixture.detectChanges();
    await fixture.whenStable();

    // The slider settles on its first page once it knows how many it has.
    expect(slider.currentPage).toBe(0);

    slider.slide({dir: 'down'});
    expect(slider.currentPage).toBe(1);

    slider.slide({dir: 'forward'});
    expect(slider.currentPage).toBe(2);

    slider.slide({dir: 'up'});
    expect(slider.currentPage).toBe(1);

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
