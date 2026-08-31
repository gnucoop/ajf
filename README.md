# Advanced JSON Forms (AJF)

Define a form as JSON, render it with Angular.

AJF is Gnucoop's framework for data collection: a form is a JSON schema — slides, fields,
validation rules, visibility conditions and formulas — and AJF turns that schema into a working
Angular form, a read-only view of the collected data, a visual form builder, and reports over the
results.

Built for and with Angular 18 and Angular Material 18.

## Packages

| Package | Contains |
|---|---|
| `@ajf/core` | The framework-agnostic half: schema and interfaces (`AjfForm`, `AjfNode`, `AjfField`), serialization, validation, the renderer service, reports, PDF/DOCX export. No UI. |
| `@ajf/material` | The Angular Material half: the components that render what core defines, plus the visual form builder. |
| `@ajf/calendars` | Ethiopian calendar support. |
| `ajf-examples` | Canonical usage examples. |

Both libraries are split into secondary entry points, imported individually:

```ts
import {AjfFormSerializer} from '@ajf/core/forms';
import {AjfFormsModule} from '@ajf/material/forms';
```

`@ajf/core` ships `forms`, `models`, `reports`, `transloco`, `common`, `utils`, `page-slider`,
`page-break`, `node-icon`, `table`, `text`, `chart`, `echarts`, `graph`, `map`, `heat-map`, `image`,
`pdfmake`, and one entry point per complex field (`audio`, `barcode`, `calendar`, `checkbox-group`,
`file-input`, `geolocation`, `range`, `signature`, `time`). `@ajf/material` mirrors the ones that
have a UI and adds `form-builder`.

## Install

```bash
yarn add @ajf/core @ajf/material
```

Angular 18.2 and Angular Material 18.2 are peer dependencies.

## Quick start

```ts
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {AjfFormsModule} from '@ajf/material/forms';

@NgModule({
  imports: [AjfFormsModule, AjfTranslocoModule.forRoot()],
})
export class AppModule {}
```

```ts
import {AjfForm, AjfFormActionEvent, AjfFormSerializer} from '@ajf/core/forms';

@Component({
  template: '<ajf-form [form]="form" (formAction)="onAction($event)"></ajf-form>',
})
export class MyFormComponent {
  form: AjfForm = AjfFormSerializer.fromJson(schema, context);

  onAction({action, value}: AjfFormActionEvent): void {
    // action is 'save' for the built-in button, or whatever you passed to
    // onFormAction(); value is the collected data.
  }
}
```

`schema` is the JSON definition; `context` is the initial values. The renderer needs a height to
lay its slides out — give the host element one, or a positioned container.

For view mode, pass the same form with `[readonly]="true"`: the renderer swaps every field for its
read-only counterpart and renders the values as flat text.

## Fields

`AjfFieldType`: `String`, `Text`, `Number`, `Boolean`, `SingleChoice`, `MultipleChoice`, `Formula`,
`Empty`, `DateRange`, `DateInput`, `Time`, `Table`, `Geolocation`, `Barcode`, `File`, `Image`,
`VideoUrl`, `Range`, `Signature`, `Audio`.

Custom field types are registered on `AjfFieldService.registerCustomField()`.

Conditions (`AjfCondition`) and formulas (`AjfFormula`) are plain JavaScript strings evaluated at
runtime, with the current form's field names in scope: `pet_type === 'cat'`, `amount * 0.05`.
Register your own functions for those expressions with `AjfValidationService`.

## Rendering

Every field is laid out as a row — `label + type name | control | hint or error` — by a single
component, `AjfFieldRow`. Above the slides sits one header bar carrying the slide number and title,
a completion counter, a jump menu, paging, the form's outstanding issues, and a slot for your own
action buttons:

```html
<ajf-form [form]="form">
  <button ajfFormTopToolbarButtons mat-button>Save draft</button>
  <button ajfFormSaveButton mat-flat-button>Save</button>
</ajf-form>
```

## Theming

The renderer paints itself from `--ajf-*` CSS custom properties, and each colour token falls through
Angular Material's system variables before landing on AJF's own default. There are four levels,
cheapest first:

1. **Nothing.** The built-in palette, light and dark.
2. **An M3 Material theme.** Build it with `use-system-variables: true` and the whole renderer
   follows, with no other wiring.
3. **Any Material theme, M2 or M3.** One include:

   ```scss
   @use '@angular/material' as mat;
   @use '@ajf/material/forms/theming' as ajf-forms;

   :root {
     @include mat.all-component-themes($theme);
     @include ajf-forms.theme($theme);
   }
   ```

4. **Setting the tokens yourself**, e.g. `--ajf-accent`, `--ajf-surface`, `--ajf-control-h`.

Dark mode follows `prefers-color-scheme`, and an `.ajf-dark` or `.ajf-light` class on any ancestor
overrides it.

## Internationalisation

`@ajf/core/transloco` wraps [`@ngneat/transloco`](https://ngneat.github.io/transloco/) and ships
translations for Arabic, English, Ethiopian, French, Italian, Portuguese, Spanish and Ukrainian.
Import `AjfTranslocoModule.forRoot()` once in your app root.

## Development

Requires Node >= 18.17 and **yarn** (enforced through `.npmrc`).

```bash
yarn install
yarn dev-app     # the demo playground at http://localhost:4200
yarn build       # build every library into dist/
yarn lint
```

Tests:

```bash
yarn test              # unit tests, watch mode
yarn test:ci           # unit tests, once
ng test core           # one project at a time
yarn e2e-material      # Cypress, starts the e2e host app
yarn e2e-core
yarn e2e-calendars
```

`projects/dev-app` is the playground — one lazy-loaded module per feature, including a full form
demo with `readonly` and dark-mode switches. `projects/e2e-app` hosts the Cypress suites.

`CLAUDE.md` documents the internals: the core/material split, the two patterns for field
components, the token layer, and a checklist for adding a field type.

## Links

- Repository: https://github.com/gnucoop/ajf
- Changelog: [CHANGELOG.md](CHANGELOG.md)

## License

AGPL-3.0-or-later. See the license headers in each source file.
