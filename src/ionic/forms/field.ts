/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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

import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject,
  OnDestroy, OnInit, Optional, ViewChild, ViewEncapsulation
} from '@angular/core';

import {Observable, Subscriber} from 'rxjs';

import {AlertController} from '@ionic/angular';

import {
  AjfFieldWithChoicesInstance, AjfFormField as AjfCoreFormField,
  AjfFormFieldWarningAlertResult, AjfFormRendererService
} from '@ajf/core/forms';

import {AJF_SEARCH_ALERT_TRESHOLD} from './tokens';


@Component({
  moduleId: module.id,
  selector: 'ajf-field',
  templateUrl: 'field.html',
  styleUrls: ['field.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: [
    'fieldInstance'
  ],
  outputs: [
    'valueChanged'
  ],
  queries: {
    singleChoiceSelect: new ViewChild('singleChoiceSelect'),
    multipleChoiceSelect: new ViewChild('multipleChoiceSelect')
  }
})
export class AjfFormField extends AjfCoreFormField implements OnDestroy, OnInit {
  alert: HTMLIonAlertElement | null;

  get searchTreshold(): number { return this._searchTreshold; }

  constructor(
    _rendererService: AjfFormRendererService,
    _changeDetectionRef: ChangeDetectorRef,
    private _alertCtrl: AlertController,
    @Optional() @Inject(AJF_SEARCH_ALERT_TRESHOLD) private _searchTreshold: number
  ) {
    super(_rendererService, _changeDetectionRef);
    if (this._searchTreshold == null) {
      this._searchTreshold = 5;
    }
  }

  showWarningAlertPrompt(messagesWarning: string[]): Observable<AjfFormFieldWarningAlertResult> {
    return new Observable<AjfFormFieldWarningAlertResult>(
      (subscriber: Subscriber<AjfFormFieldWarningAlertResult>) => {
        this._alertCtrl.create({
          header: 'Warning',
          message: messagesWarning.join('\n'),
          buttons: [
            {
              text: 'No',
              handler: () => {
                subscriber.next(<AjfFormFieldWarningAlertResult>{result: false});
                subscriber.complete();
              }
            },
            {
              text: 'Yes',
              handler: () => {
                subscriber.next(<AjfFormFieldWarningAlertResult>{result: true});
                subscriber.complete();
              }
            }
          ]
        }).then((alert) => {
          this.alert = alert;
          alert.onDidDismiss().then(() => { this.alert = null; });
        });
      }
    );
  }

  hasSearch(): boolean {
    const fieldInstance = this.fieldInstance as AjfFieldWithChoicesInstance;
    return fieldInstance.filteredChoices
      && fieldInstance.filteredChoices.length > this._searchTreshold;
  }
}
