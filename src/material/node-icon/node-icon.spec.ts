import {async, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {MatIcon} from '@angular/material/icon';

import {AjfField, AjfFieldType, AjfSlide} from '@ajf/core/forms';

import {AjfNodeIcon, AjfNodeIconModule} from './public-api';


describe('Node icon', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AjfNodeIconModule]
    }).compileComponents();
  }));

  it('should set icon corriponding to the input node', async(() => {
    const field = AjfField.create(AjfFieldType.Number);
    const slide = new AjfSlide();
    const fixture = TestBed.createComponent(AjfNodeIcon);
    const iconComponent = fixture.componentInstance;
    const debugEl = fixture.debugElement;

    iconComponent.node = field;

    expect(iconComponent.fontSet).toBe('ajf-icon');
    expect(iconComponent.fontIcon).toBe('field-number');

    iconComponent.node = slide;
    expect(iconComponent.fontSet).toBe('ajf-icon');
    expect(iconComponent.fontIcon).toBe('node-slide');

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const matIcon = debugEl.query(By.directive(MatIcon));
      expect(matIcon).not.toBeNull();
      const matIconComponent = <MatIcon>matIcon.componentInstance;
      expect(matIconComponent.fontSet).toBe('ajf-icon');
      expect(matIconComponent.fontIcon).toBe('node-slide');
    });
  }));
});
