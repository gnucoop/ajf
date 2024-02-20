import {
  AjfDateField,
  AjfFieldHost,
  AjfFieldType,
  createField,
  createFieldInstance,
} from '@ajf/core/forms';
import {AjfDateInputFieldComponent} from '@ajf/ionic/forms';
import {AfterViewInit, Component, ViewChild} from '@angular/core';

@Component({
  selector: 'ion-date-input-field-e2e',
  templateUrl: 'date-input-field-e2e.html',
})
export class IonicDateInputFieldE2E implements AfterViewInit {
  @ViewChild(AjfFieldHost, {static: true}) fieldHost!: AjfFieldHost;

  constructor() {}

  ngAfterViewInit(): void {
    const vcr = this.fieldHost.viewContainerRef;
    vcr.clear();
    const componentRef = vcr.createComponent(AjfDateInputFieldComponent);
    const componentInstance = componentRef.instance;
    const dateLimit = new Date(2019, 0, 5);
    const node: AjfDateField = {
      ...createField({
        id: 1,
        parent: 0,
        fieldType: AjfFieldType.DateInput,
        name: 'date_input',
      }),
      minDate: dateLimit,
      maxDate: dateLimit,
    };
    componentInstance.instance = {
      ...createFieldInstance({node}, {}),
      node,
    };
  }
}
