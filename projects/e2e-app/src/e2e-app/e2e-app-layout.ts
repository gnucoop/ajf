import {Component, ViewEncapsulation} from '@angular/core';

@Component({selector: 'home', template: `<p>e2e website!</p>`})
export class Home {}

@Component({
  selector: 'e2e-app-layout',
  templateUrl: 'e2e-app-layout.html',
  encapsulation: ViewEncapsulation.None,
})
export class E2eAppLayout {
  showLinks = false;

  navLinks = [
    {path: 'file-input', title: 'File Input'},
    {path: 'transloco', title: 'Transloco'},
    {path: 'ion-calendar', title: 'Ionic - Calendar'},
    {path: 'ion-date-input-field', title: 'Ionic - Date Input Field'},
    {path: 'ion-form', title: 'Ionic - Form'},
    {path: 'ion-report', title: 'Ionic - Report'},
    {path: 'ion-table-field', title: 'Ionic - Table Field'},
    {path: 'mat-calendar', title: 'Material - Calendar'},
    {path: 'mat-date-input-field', title: 'Material - Date Input Field'},
    {path: 'mat-form', title: 'Material - Form'},
    {path: 'mat-report', title: 'Material - Report'},
    {path: 'mat-report-with-filter', title: 'Material - Report with filter'},
    {path: 'mat-table-field', title: 'Material - Table Field'},
  ];
}
