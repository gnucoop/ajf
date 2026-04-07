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

import {AjfAudio} from '@ajf/core/audio';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ajf-audio',
  templateUrl: 'audio.html',
  styleUrls: ['audio.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AjfAudioComponent,
      multi: true,
    },
  ],
})
export class AjfAudioComponent extends AjfAudio implements OnDestroy {
  @Input() readonly = false;

  isRecording = false;
  audioUrl: string | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: any[] = [];
  // Keep track of object URLs to revoke them
  private createdUrls: string[] = [];

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  ngOnDestroy(): void {
    this.stopRecording();
    this.revokeUrls();
  }

  // Override writeValue to handle audioUrl creation
  override writeValue(value: string | null): void {
    super.writeValue(value);
    // If we have a value (base64) but no URL, create one for playback if needed
    // However, for <audio src="data:..."> base64 works directly.
    // If the value is a blob URL, we might need handling, but here we assume base64 storage.
    this.audioUrl = value;
    this._cdr.markForCheck();
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = event => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, {type: 'audio/webm'});
        // Create a temporary URL for immediate playback if needed,
        // but primarily we converts to base64 for value.

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          this.value = base64data;
          this.audioUrl = base64data;
          this._cdr.markForCheck();
        };
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      this._cdr.markForCheck();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      this._cdr.markForCheck();
    }
  }

  clearRecording() {
    this.audioUrl = null;
    this.audioChunks = [];
    this.value = null;
    this._cdr.markForCheck();
  }

  private revokeUrls() {
    this.createdUrls.forEach(url => URL.revokeObjectURL(url));
    this.createdUrls = [];
  }
}
