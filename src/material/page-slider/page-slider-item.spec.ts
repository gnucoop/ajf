import {
  Component, ChangeDetectionStrategy, ViewChild, ViewEncapsulation
} from '@angular/core';
import {async, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {MatCard} from '@angular/material/card';
import {By} from '@angular/platform-browser';

import {AjfPageSliderItem, AjfPageSliderModule} from './public-api';


describe('MatPageSliderItem', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AjfPageSliderModule],
      declarations: [TestComponent]
    }).compileComponents();
  }));

  it('should emit true on parentscroll stream if swiped down more than its height', async(() => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    const testComponent = fixture.componentInstance;
    const sliderItem = testComponent.sliderItem;
    const card = fixture.debugElement.query(By.directive(MatCard));

    expect(sliderItem).not.toBeNull();
    expect(card).not.toBeNull();

    const evt = new MouseEvent('swipe');
    (<any>evt).deltaY = -2000;
    card.triggerEventHandler('swipe', evt);

    sliderItem.parentScroll.subscribe((r: boolean) => {
      expect(r).toBeTruthy();
    });
  }));

  it('should emit false on parentscroll stream if swiped up more than its top', async(() => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    const testComponent = fixture.componentInstance;
    const sliderItem = testComponent.sliderItem;
    const card = fixture.debugElement.query(By.directive(MatCard));

    expect(sliderItem).not.toBeNull();
    expect(card).not.toBeNull();

    const evt = new MouseEvent('swipe');
    (<any>evt).deltaY = 100;
    card.triggerEventHandler('swipe', evt);

    sliderItem.parentScroll.subscribe((r: boolean) => {
      expect(r).toBeFalsy();
    });
  }));

  it('should emit true on parentscroll stream if mouse wheeled down more than its height',
  async(() => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    const testComponent = fixture.componentInstance;
    const sliderItem = testComponent.sliderItem;
    const card = fixture.debugElement.query(By.directive(MatCard));

    expect(sliderItem).not.toBeNull();
    expect(card).not.toBeNull();

    const evt = new MouseEvent('mousewheel');
    (<any>evt).deltaY = 2000;
    card.triggerEventHandler('mousewheel', evt);

    sliderItem.parentScroll.subscribe((r: boolean) => {
      expect(r).toBeTruthy();
    });
  }));

  it('should emit false on parentscroll stream if mouse wheeled up more than its top', async(() => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    const testComponent = fixture.componentInstance;
    const sliderItem = testComponent.sliderItem;
    const card = fixture.debugElement.query(By.directive(MatCard));

    expect(sliderItem).not.toBeNull();
    expect(card).not.toBeNull();

    const evt = new MouseEvent('mousewheel');
    (<any>evt).deltaY = -100;
    card.triggerEventHandler('mousewheel', evt);

    sliderItem.parentScroll.subscribe((r: boolean) => {
      expect(r).toBeFalsy();
    });
  }));

  it('should emit true on parentscroll stream if panned down more than its height', async(() => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    const testComponent = fixture.componentInstance;
    const sliderItem = testComponent.sliderItem;
    const card = fixture.debugElement.query(By.directive(MatCard));

    expect(sliderItem).not.toBeNull();
    expect(card).not.toBeNull();

    const evt = new MouseEvent('pan');
    (<any>evt).deltaY = 2000;
    card.triggerEventHandler('pan', evt);

    sliderItem.parentScroll.subscribe((r: boolean) => {
      expect(r).toBeTruthy();
    });
  }));

  it('should emit false on parentscroll stream if panned up more than its top', async(() => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    const testComponent = fixture.componentInstance;
    const sliderItem = testComponent.sliderItem;
    const card = fixture.debugElement.query(By.directive(MatCard));

    expect(sliderItem).not.toBeNull();
    expect(card).not.toBeNull();

    const evt = new MouseEvent('pan');
    (<any>evt).deltaY = -100;
    card.triggerEventHandler('pan', evt);

    sliderItem.parentScroll.subscribe((r: boolean) => {
      expect(r).toBeFalsy();
    });
  }));

  it('should adjust its height according to a parameter', fakeAsync(() => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    const testComponent = fixture.componentInstance;
    const sliderItem = testComponent.sliderItem;

    fixture.detectChanges();
    tick();

    const height = sliderItem.el.nativeElement.clientHeight;
    const padding = height - 400;

    sliderItem.adjustMargin(300);

    fixture.detectChanges();
    tick();

    expect(sliderItem.el.nativeElement.clientHeight).toBe(300 + padding);
  }));
});


@Component({
  moduleId: module.id,
  template: `
    <ajf-page-slider-item [ngStyle]="{'height': '400px'}">
      <div [ngStyle]="{'height': '1000px'}"></div>
    </ajf-page-slider-item>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
  @ViewChild(AjfPageSliderItem) sliderItem: AjfPageSliderItem;
}
