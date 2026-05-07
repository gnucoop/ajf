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

See `CODE_STRUCTURE.md` for the full step-by-step checklist (5 phases: core definition → implementation → registration → form-builder palette → dev-app demo).

Critical gotchas documented there:
- Extend `AjfBaseField`, not `AjfField`, in new interface definitions.
- The wrapper component uses `control` (an `Observable<UntypedFormControl>`), not `formControl` directly.
- Register the component in `projects/material/forms/src/field-service.ts` and import its module in `AjfFormsModule`.

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
