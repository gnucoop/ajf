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

### Two patterns for field components

**Pattern A — Simple fields** (text, number, date): a single component extending `CoreComponent`, lives directly in `projects/material/forms/src/`.

**Pattern B — Complex fields** (audio, barcode, geolocation, signature): three-layer split:
1. `projects/core/<feature>/` — abstract directive, `ControlValueAccessor`, shared logic
2. `projects/material/<feature>/` — `<ajf-feature>` UI component and its `NgModule`
3. `projects/material/forms/src/<feature-field>.ts` — thin wrapper that connects the feature component to the form renderer via `[formControl]="ctrl"` inside `*ngIf="control | async as ctrl"`

### Existing field types (`AjfFieldType` enum)

`String`, `Text`, `Number`, `Boolean`, `SingleChoice`, `MultipleChoice`, `Formula`, `Empty`, `Date`, `DateInput`, `Time`, `Table`, `Geolocation`, `Barcode`, `File`, `Image`, `VideoUrl`, `Range`, `Signature`, `Audio`

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
3. Create the forms wrapper `projects/material/forms/src/my-new-field.ts` (+ `.html`). Template pattern:
   ```html
   <ng-container *ngIf="control | async as ctrl">
     <ajf-my-new-field [formControl]="ctrl" [readonly]="!instance?.editable"></ajf-my-new-field>
   </ng-container>
   ```

**Phase 3 — Registration**

1. In `projects/material/forms/src/field-service.ts` add: `this.componentsMap[AjfFieldType.MyNewField] = { component: AjfMyNewFieldComponent }`.
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

### Key services

- **`AjfFormRendererService`** (`@ajf/core/forms`) — central RxJS-based service that drives form state: current context, visibility, validation, and value updates. Field components inject this service, not the form directly.
- **`AjfFieldService`** (`@ajf/material/forms`) — maps `AjfFieldType` enum values to Angular components; extend it to register custom fields.
- **`AjfValidationService`** (`@ajf/core/forms`) — registers custom JS functions available inside condition/formula expressions.

### Expressions and conditions

Conditions (`AjfCondition`) and formulas (`AjfFormula`) are plain JS strings evaluated at runtime via `evaluateCondition` / `evaluateFormula` from `@ajf/core/models`. Both interfaces carry an optional `func?` field that caches the compiled `AjfFunction` so `createFunction` (which calls `new Function(...)`) is only paid once per object. Field names in the current form context are available as variables. The `AjfExpressionUtils` class holds the registered function table.

To evaluate a raw expression string directly (outside of an `AjfCondition`/`AjfFormula` object), use `createFunction(expression)(context)` from `@ajf/core/models`. The old `evaluateExpression` helper no longer exists.

### i18n

`@ajf/core/transloco` wraps `@ngneat/transloco` and ships built-in translations for: Arabic, English, Spanish, Ethiopian, French, Italian, Portuguese, Ukrainian. Import `AjfTranslocoModule.forRoot()` in the app root.

### TypeScript path aliases

`tsconfig.json` maps `@ajf/core`, `@ajf/material`, `@ajf/calendars` to their local `src/public_api.ts`, so imports resolve to source during development without building first.
