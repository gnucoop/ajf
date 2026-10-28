import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'calendar-e2e',
  templateUrl: 'calendar-e2e.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class MaterialCalendarE2E {
  isDisabled: boolean = false;
  clickCounter: number = 0;
}
