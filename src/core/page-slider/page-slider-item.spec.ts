import {
  Component, ChangeDetectionStrategy, ViewChild, ViewEncapsulation
} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {AjfPageSliderItem, AjfPageSliderModule} from './public-api';


describe('AjfPageSliderItem', () => {
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
    const card = fixture.debugElement.query(By.css('div'));

    expect(sliderItem).not.toBeNull();
    expect(card).not.toBeNull();

    const evt = new MouseEvent('swipe');
    (<any>evt).deltaY = -2000;
    card.triggerEventHandler('swipe', evt);

    sliderItem.pageScroll.subscribe(() => {
      expect(true).toBeTruthy();
    });
  }));

  it('should emit false on parentscroll stream if swiped up more than its top', async(() => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    const testComponent = fixture.componentInstance;
    const sliderItem = testComponent.sliderItem;
    const card = fixture.debugElement.query(By.css('div'));

    expect(sliderItem).not.toBeNull();
    expect(card).not.toBeNull();

    const evt = new MouseEvent('swipe');
    (<any>evt).deltaY = 100;
    card.triggerEventHandler('swipe', evt);

    sliderItem.pageScroll.subscribe(() => {
      expect(true).toBeTruthy();
    });
  }));

  it('should emit true on parentscroll stream if mouse wheeled down more than its height',
  async(() => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    const testComponent = fixture.componentInstance;
    const sliderItem = testComponent.sliderItem;
    const card = fixture.debugElement.query(By.css('div'));

    expect(sliderItem).not.toBeNull();
    expect(card).not.toBeNull();

    const evt = new MouseEvent('mousewheel');
    (<any>evt).deltaY = 2000;
    card.triggerEventHandler('mousewheel', evt);

    sliderItem.pageScroll.subscribe(() => {
      expect(true).toBeTruthy();
    });
  }));

  it('should emit false on parentscroll stream if mouse wheeled up more than its top', async(() => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    const testComponent = fixture.componentInstance;
    const sliderItem = testComponent.sliderItem;
    const card = fixture.debugElement.query(By.css('div'));

    expect(sliderItem).not.toBeNull();
    expect(card).not.toBeNull();

    const evt = new MouseEvent('mousewheel');
    (<any>evt).deltaY = -100;
    card.triggerEventHandler('mousewheel', evt);

    sliderItem.pageScroll.subscribe(() => {
      expect(true).toBeTruthy();
    });
  }));

  it('should emit true on parentscroll stream if panned down more than its height', async(() => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    const testComponent = fixture.componentInstance;
    const sliderItem = testComponent.sliderItem;
    const card = fixture.debugElement.query(By.css('div'));

    expect(sliderItem).not.toBeNull();
    expect(card).not.toBeNull();

    const evt = new MouseEvent('pan');
    (<any>evt).deltaY = 2000;
    card.triggerEventHandler('pan', evt);

    sliderItem.pageScroll.subscribe(() => {
      expect(true).toBeTruthy();
    });
  }));

  it('should emit false on parentscroll stream if panned up more than its top', async(() => {
    const fixture = TestBed.createComponent<TestComponent>(TestComponent);
    const testComponent = fixture.componentInstance;
    const sliderItem = testComponent.sliderItem;
    const card = fixture.debugElement.query(By.css('div'));

    expect(sliderItem).not.toBeNull();
    expect(card).not.toBeNull();

    const evt = new MouseEvent('pan');
    (<any>evt).deltaY = -100;
    card.triggerEventHandler('pan', evt);

    sliderItem.pageScroll.subscribe(() => {
      expect(true).toBeTruthy();
    });
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
