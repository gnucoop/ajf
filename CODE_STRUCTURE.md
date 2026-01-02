# Codebase Structure & Developer Guide

This document provides a technical overview of the `ajf` (Advanced JSON Forms) repository and a practical guide for extending it.

## 1. High-Level Architecture

The repository is organized into distinct project types under `projects/`:

- **`projects/core`**: **The "What"**. Framework-agnostic business logic, data models, and interfaces. It defines the schema and validation rules.
  - `forms`: Core interfaces (`AjfForm`, `AjfNode`, `AjfField`), serialization, and base classes.
  - `models`: Shared data models.
- **`projects/material`**: **The "How"**. Angular Material implementation. It handles rendering, UI components, and the Form Builder.
  - `forms`: Components that render specific fields (e.g., `AjfInputFieldComponent`).
  - `form-builder`: The visual editor for creating forms.
- **`projects/dev-app`**: A monolithic development application to test all features.
  - It loads various demo modules (e.g., `mat-forms`, `mat-barcode`, `mat-audio`) via lazy loading in `routes.ts`.

## 1.1 JSON Data Model Snippet
Example of how a field is represented in the JSON schema (`testformschema.json`):
```json
{
  "type": "my_new_field", // Maps to AjfFieldType
  "name": "my_field_id",
  "label": "My Label",
  "attributes": {
    "custom_prop": "value" // Mapped in the Interface
  }
}
```

## 2. Field Architecture Patterns

When adding a new field type (e.g., "Audio", "Signature"), choose one of two patterns:

### Pattern A: Simple Fields (Native Inputs)

Use this for fields that wrap standard HTML5 inputs or simple Material components (e.g., Text, Number, Date).

- **Location**: Directly inside `projects/material/forms/src`.
- **Structure**: A single component extending `CoreComponent` (e.g., `AjfInputFieldComponent`).

### Pattern B: Complex Fields (Feature Modules)

Use this for rich interactions requiring logic separation (e.g., Audio, Barcode, Geolocation).

- **Core Module** (`projects/core/<feature>`):
  - Contains abstract directives, shared logic, and interfaces.
  - Example: `AjfAudio` directive (handles `ControlValueAccessor`).
- **Material Module** (`projects/material/<feature>`):
  - Contains the UI component (e.g., `<ajf-audio>`) and its module.
  - Handles specific UI logic (e.g., `MediaRecorder`, `navigator.mediaDevices`).
- **Forms Integration** (`projects/material/forms`):
  - A **thin wrapper** component (e.g., `AjfAudioFieldComponent`) that connects the Feature Component to the Form Renderer.
  - It subscribes to `control` changes and passes them to `<ajf-audio>`.

## 3. How to Add a New Field (Step-by-Step)

Follow this checklist to add a new field (e.g., "MyNewField").

### Phase 1: Core Definition

1.  **Define Type**: Add `MyNewField` to `AjfFieldType` enum in `projects/core/forms/src/interface/fields/field-type.ts`.
2.  **Define Interface**: Create `projects/core/forms/src/interface/fields/my-new-field.ts`.
    - **CRITICAL**: Interface MUST extend **`AjfBaseField`** (not `AjfField`) to inherit properties like `id`, `name`, `parent`.
    - Properties: `fieldType: AjfFieldType.MyNewField;`.
3.  **Export**: Export the interface in `projects/core/forms/src/interface/fields/index.ts`.
4.  **Update Union**: Add `AjfMyNewField` to `AjfField` union in `projects/core/forms/src/interface/fields/field.ts`.

### Phase 2: Implementation (Feature Module Pattern)

1.  **Core Feature**: Create `projects/core/my-new-field`.
    - Add `ng-package.json`, `index.ts`, `public_api.ts`, and core logic.
2.  **Material Feature**: Create `projects/material/my-new-field`.
    - Add `ng-package.json`.
    - Create Component: `<ajf-my-new-field>`. Implement `ControlValueAccessor` provider.
    - Create Module: `AjfMyNewFieldModule`. Export the component.
3.  **Forms Wrapper**: Create `projects/material/forms/src/my-new-field.ts` (and `.html`).
    - Extend `CoreComponent`.
    - Template: `<ajf-my-new-field [formControl]="ctrl" [readonly]="!instance?.editable"></ajf-my-new-field>`.
    - **Note**: Use `*ngIf="control | async as ctrl"` to unwrap the Observable control.

### Phase 3: Registration

1.  **Register Component**: In `projects/material/forms/src/field-service.ts`:
    - Add mapping: `this.componentsMap[AjfFieldType.MyNewField] = { component: AjfMyNewFieldComponent, ... }`.
2.  **Import Module**: In `projects/material/forms/src/forms-module.ts`:
    - Import `AjfMyNewFieldModule`.
    - Declare `AjfMyNewFieldComponent`.

### Phase 4: Form Builder Integration

1.  **Enable in Palette**: In `projects/material/form-builder/src/form-builder-service.ts`:
    - Add to `_availableNodeTypes`: `{ label: 'My Field', nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.MyNewField} }`.

### Phase 5: Dev App Integration

1.  **Test Schema**: Add a sample field to `projects/dev-app/src/mat-forms/form.ts` (or `testformschema.json`).
2.  **Fields Demo**: Add an instance to `projects/dev-app/src/mat-fields/fields.ts`.
3.  **Dedicated Demo (Optional)**:
    - Create `projects/dev-app/src/mat-my-new-field`.
    - Register route in `projects/dev-app/src/routes.ts`.
    - Add menu item in `projects/dev-app/src/dev-app/dev-app-layout.ts`.

## 4. Common Pitfalls & Debugging

- **"Property 'id' does not exist on type..."**: You likely extended `AjfField` instead of `AjfBaseField` in your interface definition. `AjfBaseField` contains the structural node properties.
- **"formControl does not exist on type AjfFieldInstance"**: `AjfFieldInstance` structure does not mirror the Angular `FormControl`. In the wrapper component, use the `control` property (which is an `Observable<UntypedFormControl>`).
  - _Correct_: `[formControl]="ctrl"` inside `*ngIf="control | async as ctrl"`.
- **"ajf-xyz is not a known element"**:
  - Check if the Feature Module is imported in `AjfFormsModule`.
  - Check if the Component is exported in the Feature Module's `public_api.ts` _and_ `index.ts`.
  - Verify `ng-package.json` entry file points to `index.ts`.
