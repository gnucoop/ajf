import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {shareReplay, take} from 'rxjs/operators';

import {AjfTranslocoModule} from '../../transloco';

import {AjfFile, AjfFileInput, AjfFileInputModule} from './public_api';

const emptyPng =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const bStr = atob(emptyPng);
let n = bStr.length;
const u8arr = new Uint8Array(n);
while (n--) {
  u8arr[n] = bStr.charCodeAt(n);
}
const emptyPngFile = new File([u8arr], 'empty.png', {type: 'image/png'});
const emptyPngValue = {
  content: `data:image/png;base64,${emptyPng}`,
  name: 'empty.png',
  size: n,
  type: 'image/png',
};

describe('AjfFileInput', () => {
  let fixture: ComponentFixture<AjfFileInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjfFileInputModule, AjfTranslocoModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AjfFileInput);
    fixture.detectChanges();
  });

  it('should sets its value based on a file input', async () => {
    const fileInput = fixture.componentInstance;
    fileInput.value = emptyPngFile;
    const lastValue = fileInput.valueChange.pipe(shareReplay(1));
    await firstValueFrom(lastValue.pipe(take(1)));
    const {name, size, type, content} = fileInput.value as AjfFile;
    expect(name).toEqual(emptyPngFile.name);
    expect(size).toEqual(emptyPngFile.size);
    expect(type).toEqual(emptyPngFile.type);
    expect(content).toEqual(`data:image/png;base64,${emptyPng}`);
    fileInput.resetValue();
    await firstValueFrom(lastValue.pipe(take(1)));
    expect(fileInput.value).toBeFalsy();
  });

  it('should set its value on file selection.', async () => {
    const fileInput = fixture.componentInstance;
    const fileList = fileInput._nativeInput.nativeElement.files as FileList;
    fileList.item = idx => {
      if (idx === 0) {
        return emptyPngFile;
      }
      return null;
    };
    const lastValue = fileInput.valueChange.pipe(shareReplay(1));
    fileInput.onSelectFile();
    await firstValueFrom(lastValue.pipe(take(1)));
    const {name, size, type, content} = fileInput.value as AjfFile;
    expect(name).toEqual(emptyPngFile.name);
    expect(size).toEqual(emptyPngFile.size);
    expect(type).toEqual(emptyPngFile.type);
    expect(content).toEqual(`data:image/png;base64,${emptyPng}`);
  });

  it('should display the default drop message', () => {
    const el = fixture.nativeElement as HTMLElement;
    const dropMessages = el.getElementsByClassName('ajf-drop-message');
    expect(dropMessages.length).toBe(1);
    const dropMessage = dropMessages[0];
    expect(dropMessage.innerHTML).toMatch(/Drop your file here or click to select/);
  });

  it('should display the default file preview', async () => {
    const el = fixture.nativeElement as HTMLElement;
    const fileInput = fixture.componentInstance;
    fileInput.value = emptyPngFile;
    await firstValueFrom(fileInput.valueChange.pipe(take(1)));
    fixture.detectChanges();
    await fixture.whenStable();
    const filePreviews = el.getElementsByClassName('ajf-file-info-content');
    expect(filePreviews.length).toBe(1);
    const filePreview = filePreviews[0];
    expect(filePreview.innerHTML).toMatch(/empty\.png/);
  });
});

describe('AjfFileInput with custom drop message', () => {
  let fixture: ComponentFixture<DropMessageTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropMessageTestComponent],
      imports: [AjfFileInputModule, AjfTranslocoModule],
    }).compileComponents();
    fixture = TestBed.createComponent(DropMessageTestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should display the custom drop message', () => {
    const el = fixture.nativeElement as HTMLElement;
    const dropMessages = el.getElementsByClassName('ajf-drop-message');
    expect(dropMessages.length).toBe(1);
    const dropMessage = dropMessages[0];
    expect(dropMessage.innerHTML).toMatch(/Test drop message/);
  });
});

describe('AjfFileInput with custom file preview', () => {
  let fixture: ComponentFixture<FilePreviewTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilePreviewTestComponent],
      imports: [AjfFileInputModule, AjfTranslocoModule],
    }).compileComponents();
    fixture = TestBed.createComponent(FilePreviewTestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should display the custom file preview', async () => {
    await firstValueFrom(fixture.componentInstance.fileInput.valueChange.pipe(take(1)));
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const dropMessages = el.getElementsByClassName('ajf-file-info');
    expect(dropMessages.length).toBe(1);
    const dropMessage = dropMessages[0];
    expect(dropMessage.innerHTML).toMatch(/Test file preview/);
  });
});

describe('AjfFileInput in reactive forms', () => {
  let fixture: ComponentFixture<ReactiveFormsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveFormsTestComponent],
      imports: [AjfFileInputModule, AjfTranslocoModule, ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ReactiveFormsTestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should update value of container form', async () => {
    const cmp = fixture.componentInstance;
    expect(cmp.formGroup.value['file_upload']).toBeFalsy();

    cmp.fileInput.value = emptyPngValue;
    await fixture.whenStable();
    expect(cmp.formGroup.value['file_upload']['name']).toBe('empty.png');

    cmp.fileInput.resetValue();
    await fixture.whenStable();
    expect(cmp.formGroup.value['file_upload']).toBeFalsy();
  });
});

@Component({
  template: '<ajf-file-input><div ajfDropMessage>Test drop message</div></ajf-file-input>',
})
class DropMessageTestComponent {}

@Component({
  template:
    '<ajf-file-input [value]="value"><div ajfFilePreview>Test file preview</div></ajf-file-input>',
})
class FilePreviewTestComponent {
  @ViewChild(AjfFileInput) fileInput!: AjfFileInput;
  value = emptyPngFile;
}

@Component({
  template: `
    <div [formGroup]="formGroup">
      <ajf-file-input formControlName="file_upload"></ajf-file-input>
    </div>
  `,
})
class ReactiveFormsTestComponent {
  @ViewChild(AjfFileInput) fileInput!: AjfFileInput;
  formGroup = new FormGroup({
    file_upload: new FormControl(),
  });
}
