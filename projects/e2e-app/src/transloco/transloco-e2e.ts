import {langs} from '@ajf/core/transloco';
import {Component} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'transloco-e2e',
  templateUrl: 'transloco-e2e.html',
})
export class TranslocoE2E {
  readonly langs = Object.keys(langs);
  readonly strings = Object.keys(langs['ENG']).slice(0, 10);

  constructor(private service: TranslocoService) {}

  selectLang(evt: MatSelectChange) {
    this.service.setActiveLang(evt.value);
  }
}
