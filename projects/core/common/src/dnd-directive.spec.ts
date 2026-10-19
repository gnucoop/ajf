import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {firstValueFrom} from 'rxjs';

import {AjfDndDirective} from './public_api';

describe('AjfDndDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjfDndDirective, TestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should add ajf-dnd-over class to container on drag over and remove it on drag leave', async () => {
    const el = fixture.nativeElement.firstChild as HTMLDivElement;
    expect(el.className).toBe('');
    el.dispatchEvent(new DragEvent('dragover'));
    await fixture.whenStable();
    expect(el.className).toBe('ajf-dnd-over');
    el.dispatchEvent(new DragEvent('dragleave'));
    await fixture.whenStable();
    expect(el.className).toBe('');
  });

  it('should emit a file on drop', async () => {
    const dnd = fixture.componentInstance.dnd;
    const evt = {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: {files: [new File([new Uint8Array([1, 2, 3])], 'foo')]},
    } as any;
    const dropped = firstValueFrom(dnd.file);
    dnd.onDrop(evt);
    const value = await dropped;
    expect(value.length).toBe(1);
    const file = value[0];
    expect(file.name).toBe('foo');
    expect(file.size).toBe(3);
  });
});

@Component({
  template: `<div ajfDnd></div>`,
  standalone: false,
})
class TestComponent {
  @ViewChild(AjfDndDirective) dnd!: AjfDndDirective;
}
