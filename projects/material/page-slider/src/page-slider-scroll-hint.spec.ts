/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AjfPageSlider, AjfPageSliderModule} from './public_api';

/**
 * A page taller than the slider scrolls, and the only thing saying so is a thin
 * scrollbar the reader may never look at. These cover the hint that says it
 * outright: when it shows, when it stops, and what it does when clicked.
 */
describe('AjfPageSlider scroll hint', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, AjfPageSliderModule],
      declarations: [TestComponent, ShortTestComponent],
    }).compileComponents();
  }));

  const slider = (): AjfPageSlider =>
    fixture.debugElement.query(By.directive(AjfPageSlider)).componentInstance;

  const hint = (): HTMLElement =>
    fixture.debugElement.query(By.css('.ajf-scroll-hint')).nativeElement;

  const page = (): HTMLElement =>
    fixture.debugElement.query(By.css('ajf-page-slider-item')).nativeElement;

  /** The hint is computed off a laid-out page, one task after the view. */
  async function settle(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise<void>(resolve => setTimeout(resolve, 50));
    fixture.detectChanges();
  }

  it('shows the hint while the page has more below the fold', async () => {
    fixture = TestBed.createComponent(TestComponent);
    await settle();

    expect(slider().showScrollHint).toBe(true);
    expect(hint().classList).toContain('ajf-visible');
    // And the bar says the same thing, quietly: it takes room, rather than
    // being left to the platform and its disappearing overlay one.
    expect(page().offsetWidth - page().clientWidth).toBeGreaterThan(0);
  });

  it('drops it once the page is scrolled to the end', async () => {
    fixture = TestBed.createComponent(TestComponent);
    await settle();

    const el = page();
    el.scrollTop = el.scrollHeight;
    // The listener is in the capture phase: a scroll event does not bubble.
    el.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(slider().showScrollHint).toBe(false);
    expect(hint().classList).not.toContain('ajf-visible');
  });

  it('pages down by most of a screenful when clicked', async () => {
    fixture = TestBed.createComponent(TestComponent);
    await settle();

    const el = page();
    // Typed loosely: `scrollBy` is overloaded, and the options form is the one
    // under test here.
    const scrollBy = spyOn(el, 'scrollBy') as jasmine.Spy;
    (hint().querySelector('button') as HTMLButtonElement).click();

    expect(scrollBy.calls.mostRecent().args[0]).toEqual({
      top: Math.round(el.clientHeight * 0.8),
      behavior: 'smooth',
    });
  });

  it('stays out of the way on a page that fits', async () => {
    fixture = TestBed.createComponent(ShortTestComponent);
    await settle();

    expect(slider().showScrollHint).toBe(false);
    expect(hint().classList).not.toContain('ajf-visible');
  });
});

@Component({
  template: `
    <ajf-page-slider [ngStyle]="{'height': '200px'}">
      <ajf-page-slider-item>
        <div [ngStyle]="{'height': '2000px'}">a very long slide</div>
      </ajf-page-slider-item>
    </ajf-page-slider>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {}

@Component({
  template: `
    <ajf-page-slider [ngStyle]="{'height': '400px'}">
      <ajf-page-slider-item>
        <div [ngStyle]="{'height': '50px'}">a short slide</div>
      </ajf-page-slider-item>
    </ajf-page-slider>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ShortTestComponent {}
