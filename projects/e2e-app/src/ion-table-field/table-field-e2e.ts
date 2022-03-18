import {Component, ViewEncapsulation} from '@angular/core';

import {TableFieldE2E} from '../table-field';

@Component({
  selector: 'ion-table-field-e2e',
  templateUrl: 'table-field-e2e.html',
  styles: [
    `
    .ajf-slider-container {
      min-height: 400px;
    }`,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class IonicTableFieldE2E extends TableFieldE2E {}
