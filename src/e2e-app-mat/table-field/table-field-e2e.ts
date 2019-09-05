import {AjfFieldHost, AjfFieldType, AjfTableField, createField,
    createFieldInstance} from '@ajf/core/forms';
import {AjfTableFieldComponent} from '@ajf/material/forms';
import {AfterViewInit, Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'table-field-e2e',
  templateUrl: 'table-field-e2e.html',
})
export class TableFieldE2E implements AfterViewInit {
  @ViewChild(AjfFieldHost, {static: true}) fieldHost: AjfFieldHost;

  constructor(private _cfr: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    const vcr = this.fieldHost.viewContainerRef;
    vcr.clear();
    const componentFactory = this._cfr.resolveComponentFactory(AjfTableFieldComponent);
    const componentRef = vcr.createComponent(componentFactory);
    const componentInstance = componentRef.instance;
    const node = {
      ...createField({
        id: 1,
        parent: 0,
        fieldType: AjfFieldType.Table,
        name: 'table',
        editable: true,
      }),
      rows: [],
      columnLabels: [],
      rowLabels: [],
      hideEmptyRows: false
    } as AjfTableField;
    componentInstance.instance = {
      ...createFieldInstance({node}, {}),
      node,
      hideEmptyRows: false,
      controls: [
        ['Labels', ['Label 1', 'Label 2', 'Label 3']],
        ['Row 1', [new FormControl(), new FormControl(), new FormControl()]],
        ['Row 2', [new FormControl(), new FormControl(), new FormControl()]],
      ],
      context: {}
    };
  }
}
