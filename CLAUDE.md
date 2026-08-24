# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
yarn dev-app              # Serve the dev/demo app (http://localhost:4200)
yarn test                 # Run unit tests in watch mode
yarn test:ci              # Run unit tests once (CI mode)
yarn lint                 # Run ESLint across all projects

# Run tests for a specific project
ng test core              # Unit tests for @ajf/core
ng test material          # Unit tests for @ajf/material
ng test calendars         # Unit tests for @ajf/calendars

# E2E tests (requires e2e-app to be running)
yarn e2e-core             # Cypress for core (starts e2e-app + opens Cypress)
yarn e2e-material         # Cypress for material
yarn e2e-calendars        # Cypress for calendars

# Build
yarn build                # Build all libraries (output to dist/)
```

Package manager is **yarn** (enforced via `.npmrc`).

## Architecture

This is an Angular monorepo for **AJF (Advanced JSON Forms)** — a framework for defining forms as JSON schemas and rendering them with Angular Material.

### Projects

| Project | npm package | Purpose |
|---|---|---|
| `projects/core` | `@ajf/core` | Framework-agnostic schema, field types, validation, reports |
| `projects/material` | `@ajf/material` | Angular Material UI rendering and visual Form Builder |
| `projects/calendars` | `@ajf/calendars` | Ethiopian calendar support |
| `projects/dev-app` | — | Development playground with 20+ lazy-loaded demo modules |
| `projects/e2e-app` | — | Host app for Cypress E2E tests |
| `projects/ajf-examples` | `ajf-examples` | Canonical usage examples |

### Core vs. Material separation

- **`@ajf/core`** is the "what": JSON schema definitions (`AjfForm`, `AjfNode`, `AjfField`), interfaces, serialization, abstract base classes. No UI.
- **`@ajf/material`** is the "how": Angular Material components that render what core defines. Imports and depends on core.

### Form rendering and styling

The renderer lays every field out as a **row**: `label + type name | control | hint/error`. One
component owns that layout — `AjfFieldRow` (`projects/material/forms/src/field-row.ts`,
`<ajf-field-row>`) — and both the plain and the repeating slide branches of `form.html` render
through it, so the row markup exists in exactly one place. The slide chrome is
`AjfSlideHeader` (number badge, completion counter, slide jump menu, paging, issue pill, action
slot) and `AjfRepStrip` (the repetition pager); both are rendered **once**, above the page slider,
driven by the `ajfCurrentSlide` pipe.

Consequences for a field component:

- **The label, the type name, the required marker, the `hint` tooltip and the `description` are the
  row's job.** A field template renders only the control. Do not add a label of your own.
- `node.description` shows as muted text in the row's right-hand gutter (`max 80 chars`,
  `>= 6 options`); `node.hint` shows on the `?` badge next to the label.
- **Do not wrap controls in `mat-form-field`.** The label lives outside it, so its notch and
  subscript are dead weight. Use a bare `<input class="ajf-control">` instead.

The **type name** printed under every label comes from `AjfFieldTypeLabelPipe`
(`projects/core/forms/src/field-type-label.ts`): a translation key per field type, plus the
constraint the schema states (`text · 16 characters`, from `validation.minDigits`/`maxDigits`). It
takes the field *instance*, not the node, because a choice field reads as `choice with search` once
its choices pass the search threshold and a `Range` field reads as `rating` in that appearance —
both decisions the control itself makes.

Two counts are computed from mutable instance state through impure, memoized pipes in
`projects/material/forms/src/slide-stats.ts`: `ajfSlideCompletion` (the header's `done/total` for
the slide on screen) and `ajfFormIssues` (`{fields, slides}` for the **whole form**, used by both
the header's issue pill and the footer). Neither reads `AjfFormRendererService.errors`, which counts
invalid slide pages rather than fields.

Styling is a token layer, not a Material theme. `projects/material/forms/src/_forms.scss` holds
`--ajf-*` CSS custom properties plus primitive classes (`.ajf-control`, `.ajf-btn`,
`.ajf-btn--primary`, `.ajf-segmented`, `.ajf-chip`, `.ajf-pill`, `.ajf-input-group`, ...), emitted
once from `field.scss` — every rendered field goes through `<ajf-field>`, whereas the form chrome is
absent when a field renders standalone. Rules:

- Inside `projects/material/forms/src/`, `@use './forms' as ajf;` and reach for the mixins.
  `angular.json` sets no `stylePreprocessorOptions.includePaths`, so `@use` only resolves
  same-directory.
- **Outside** that directory (other `projects/material/*` packages, and all of `projects/core`),
  there is no import path — read the tokens directly with a fallback:
  `var(--ajf-accent, #0f4c5c)`.
- Never hardcode a bare colour, and never hardcode one *tone* of a colour either — the same
  stylesheet has to work on both palettes.
- Add a new field type's name to `NAMES` in `projects/core/forms/src/field-type-label.ts`, and its
  translation to all eight dictionaries in `projects/core/transloco/src/`.

### Theming and dark mode

Four levels, cheapest first:

1. **Nothing.** The built-in warm-paper palette, light and dark.
2. **An M3 Material theme.** Every colour token is declared as
   `var(--mat-sys-<role>, var(--sys-<role>, <default>))`, so a host that builds its theme with
   `use-system-variables: true` (Material 18) or on Material 19+ drives the renderer with no wiring
   at all. `projects/dev-app/src/styles.scss` is exactly this case.
3. **Any Material theme, M2 or M3.** `@use '@ajf/material/forms/theming' as ajf-forms;` then
   `@include ajf-forms.theme($theme);` — see `projects/material/forms/src/_theming.scss`. It reads
   the theme with `mat.get-theme-color()`, branching on `mat.get-theme-version()`, and emits nothing
   but `--ajf-*` declarations. It is shipped through the `assets` entry in
   `projects/material/ng-package.json` (a **secondary** entry point's `ng-package.json` rejects
   `assets`, so it has to be declared in the primary one).
4. **Setting `--ajf-*` by hand.**

Dark mode has two triggers, both handled by the `tokens` mixin: `@media (prefers-color-scheme: dark)`
(skipped when an ancestor carries `.ajf-light`) and an explicit `.ajf-dark` / `.ajf-light` class,
which wins. A host that supplies its own palette through level 3 or 4 owns its own switch. Note that
`color-scheme` is declared on `.ajf-form-container` and `ajf-field` only, never on `:root` — there it
would repaint the whole host application.

**View mode** is the same renderer with `[readonly]`: `AjfFormField._loadComponent()` swaps in the
`readOnlyComponent` registered in `field-service.ts`, and the row keeps its layout. So a new field
type needs a read-only component and a stylesheet that renders its value as flat text — mono if
the editable control is mono.

### Two patterns for field components

**Pattern A — Simple fields** (text, number, date): a single component extending `CoreComponent`, lives directly in `projects/material/forms/src/`.

**Pattern B — Complex fields** (audio, barcode, geolocation, signature): three-layer split:
1. `projects/core/<feature>/` — abstract directive, `ControlValueAccessor`, shared logic
2. `projects/material/<feature>/` — `<ajf-feature>` UI component and its `NgModule`
3. `projects/material/forms/src/<feature-field>.ts` — thin wrapper that connects the feature component to the form renderer via `[formControl]="ctrl"` inside `*ngIf="control | async as ctrl"`

### Existing field types (`AjfFieldType` enum)

`String`, `Text`, `Number`, `Boolean`, `SingleChoice`, `MultipleChoice`, `Formula`, `Empty`, `DateRange`, `DateInput`, `Time`, `Table`, `Geolocation`, `Barcode`, `File`, `Image`, `VideoUrl`, `Range`, `Signature`, `Audio`

Defined in `projects/core/forms/src/interface/fields/field-type.ts`. Add new values before `LENGTH`.

### Adding a new field type

Follow this checklist when adding a new field (e.g., `MyNewField`).

**Phase 1 — Core definition**

1. Add `MyNewField` to the `AjfFieldType` enum in `projects/core/forms/src/interface/fields/field-type.ts` (before `LENGTH`).
2. Create `projects/core/forms/src/interface/fields/my-new-field.ts`. **Must extend `AjfBaseField`**, not `AjfField` — `AjfBaseField` carries `id`, `name`, `parent`, etc.
3. Export the interface from `projects/core/forms/src/interface/fields/index.ts`.
4. Add `AjfMyNewField` to the `AjfField` union in `projects/core/forms/src/interface/fields/field.ts`.

**Phase 2 — Implementation (Pattern B / feature module)**

1. Create `projects/core/my-new-field/` with `ng-package.json`, `index.ts`, `public_api.ts`, and core logic (abstract directive, `ControlValueAccessor`).
2. Create `projects/material/my-new-field/` with `ng-package.json`, the `<ajf-my-new-field>` component, and its `NgModule`.
3. Create the forms wrapper `projects/material/forms/src/my-new-field.ts` (+ `.html`). Template pattern
   — the control only, since `AjfFieldRow` renders the label, hint and error:
   ```html
   <ng-container *ngIf="control | async as ctrl">
     <ajf-my-new-field [formControl]="ctrl" [readonly]="!instance?.editable"></ajf-my-new-field>
   </ng-container>
   ```
4. Add its name to `NAMES` in `projects/core/forms/src/field-type-label.ts` — a lowercase English
   noun phrase, used as the translation key — and translate it in all eight dictionaries under
   `projects/core/transloco/src/`.

**Phase 3 — Registration**

1. In `projects/material/forms/src/field-service.ts` add: `this.componentsMap[AjfFieldType.MyNewField] = { component: AjfMyNewFieldComponent, readOnlyComponent: AjfReadOnlyFieldComponent }` — without a `readOnlyComponent` the editable control also renders in view mode.
2. In `projects/material/forms/src/forms-module.ts`: import `AjfMyNewFieldModule` and declare `AjfMyNewFieldComponent`.

**Phase 4 — Form Builder palette**

1. In `projects/material/form-builder/src/form-builder-service.ts`, add to `_availableNodeTypes`: `{ label: 'My Field', nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.MyNewField } }`.

**Phase 5 — Dev app**

1. Add a sample field to `projects/dev-app/src/mat-forms/form.ts` (or `testformschema.json`).
2. Add an instance to `projects/dev-app/src/mat-fields/fields.ts`.
3. Optionally create `projects/dev-app/src/mat-my-new-field/`, register the route in `routes.ts`, and add a menu item in `dev-app-layout.ts`.

### Common pitfalls

- **"Property 'id' does not exist on type..."** — you extended `AjfField` instead of `AjfBaseField`. Fix the interface.
- **"formControl does not exist on type AjfFieldInstance"** — use `control` (an `Observable<UntypedFormControl>`), unwrapped with `*ngIf="control | async as ctrl"`, then bind `[formControl]="ctrl"`.
- **"ajf-xyz is not a known element"** — check that the feature module is imported in `AjfFormsModule`, the component is exported from the feature module's `public_api.ts` and `index.ts`, and `ng-package.json` points to `index.ts`.
- **The field renders its label twice** — the row already renders `node.label`; drop the label from the field template.
- **A control looks unstyled outside a form** — the `--ajf-*` tokens are emitted from `field.scss`, so a component used with no `<ajf-field>` around it only gets the `var()` fallbacks. Keep those fallbacks meaningful.

### Key services

- **`AjfFormRendererService`** (`@ajf/core/forms`) — central RxJS-based service that drives form state: current context, visibility, validation, and value updates. Field components inject this service, not the form directly.
- **`AjfFieldService`** (`@ajf/material/forms`) — maps `AjfFieldType` enum values to Angular components; extend it to register custom fields.
- **`AjfValidationService`** (`@ajf/core/forms`) — registers custom JS functions available inside condition/formula expressions.

### Expressions and conditions

Conditions (`AjfCondition`) and formulas (`AjfFormula`) are plain JS strings evaluated at runtime via `evaluateExpression` from `@ajf/core/models`. Field names in the current form context are available as variables. The `AjfExpressionUtils` class holds the registered function table.

### i18n

`@ajf/core/transloco` wraps `@ngneat/transloco` and ships built-in translations for: Arabic, English, Spanish, Ethiopian, French, Italian, Portuguese, Ukrainian. Import `AjfTranslocoModule.forRoot()` in the app root.

### TypeScript path aliases

`tsconfig.json` maps `@ajf/core`, `@ajf/material`, `@ajf/calendars` to their local `src/public_api.ts`, so imports resolve to source during development without building first.
