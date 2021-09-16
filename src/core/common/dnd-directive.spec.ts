import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AjfDndDirective} from './index';

describe('AjfDndDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed
        .configureTestingModule({
          declarations: [
            AjfDndDirective,
            TestComponent,
          ]
        })
        .compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should add ajf-dnd-over class to container on drag over and remove it on drag leave',
     async () => {
       const dnd = fixture.componentInstance.dnd;
       const el = fixture.nativeElement.firstChild as HTMLDivElement;
       expect(el.className).toBe('');
       dnd.onDragOver(new DragEvent('dragover'));
       fixture.detectChanges();
       await fixture.whenStable();
       expect(el.className).toBe('ajf-dnd-over');
       dnd.onDragLeave(new DragEvent('dragleave'));
       fixture.detectChanges();
       await fixture.whenStable();
       expect(el.className).toBe('');
     });

  it('should emit a file on drop', done => {
    const dnd = fixture.componentInstance.dnd;
    const evt = {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: {files: [new File([new Uint8Array([1, 2, 3])], 'foo')]},
    } as any;
    dnd.file.subscribe(value => {
      expect(value.length).toBe(1);
      const file = value[0];
      expect(file.name).toBe('foo');
      expect(file.size).toBe(3);
      done();
    });
    dnd.onDrop(evt);
  });
});

@Component({
  template: '<div ajfDnd></div>',
})
class TestComponent {
  @ViewChild(AjfDndDirective) dnd: AjfDndDirective;
}
