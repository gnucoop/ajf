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

import {AjfBaseWidgetComponent, AjfDialogWidgetInstance} from '@ajf/core/reports';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {ModalController} from '@ionic/angular';

import {AjfDialogModal} from './dialog-modal';

@Component({
  templateUrl: 'dialog-widget.html',
  styleUrls: ['dialog-widget.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfDialogWidgetComponent
  extends AjfBaseWidgetComponent<AjfDialogWidgetInstance>
  implements OnDestroy
{
  private _modal?: HTMLIonModalElement;

  constructor(cdr: ChangeDetectorRef, el: ElementRef, private _modalCtrl: ModalController) {
    super(cdr, el);
  }

  ngOnDestroy(): void {
    if (this._modal) {
      this._modal.dismiss();
    }
  }

  openDialog(): void {
    if (this.instance == null || this.instance.content.length === 0) {
      return;
    }
    this._modalCtrl
      .create({
        component: AjfDialogModal,
        componentProps: {
          content: this.instance.content,
        },
      })
      .then(modal => {
        this._modal = modal;
        modal.present();
      });
  }
}
