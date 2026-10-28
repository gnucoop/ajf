import {Component, ChangeDetectionStrategy} from '@angular/core';

import {TableFieldE2E} from '../table-field';

@Component({
  selector: 'table-field-e2e',
  templateUrl: 'table-field-e2e.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class MaterialTableFieldE2E extends TableFieldE2E {}
