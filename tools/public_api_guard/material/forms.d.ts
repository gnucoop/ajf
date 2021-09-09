export declare class AjfBooleanFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfBooleanFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfBooleanFieldComponent, never>;
}

export declare class AjfDateFieldComponent extends AjfBaseFieldComponent<AjfDateFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfDateFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfDateFieldComponent, never>;
}

export declare class AjfDateInputFieldComponent extends AjfBaseFieldComponent<AjfDateFieldInstance> {
    input: MatInput;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, _dvs: AjfDateValueStringPipe);
    protected _onInstanceChange(): void;
    onChange(): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfDateInputFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfDateInputFieldComponent, never>;
}

export declare class AjfEmptyFieldComponent extends AjfBaseFieldComponent<AjfEmptyFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfEmptyFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfEmptyFieldComponent, never>;
}

export declare class AjfFieldService extends CoreService {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFieldService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfFieldService>;
}

export declare class AjfFieldWarningDialog {
    message: string;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFieldWarningDialog, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFieldWarningDialog, never>;
}

export declare class AjfFormField extends CoreFormField {
    readonly componentsMap: AjfFieldComponentsMap;
    constructor(cdr: ChangeDetectorRef, cfr: ComponentFactoryResolver, fieldService: AjfFieldService);
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFormField, "ajf-field,ajf-form-field", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormField, never>;
}

export declare class AjfFormRenderer extends AjfCoreFormRenderer {
    topBar: boolean;
    constructor(rendererService: AjfFormRendererService, changeDetectorRef: ChangeDetectorRef);
    static ngAcceptInputType_fixedOrientation: BooleanInput;
    static ngAcceptInputType_hasEndMessage: BooleanInput;
    static ngAcceptInputType_hasStartMessage: BooleanInput;
    static ngAcceptInputType_hideBottomToolbar: BooleanInput;
    static ngAcceptInputType_hideNavigationButtons: BooleanInput;
    static ngAcceptInputType_hideTopToolbar: BooleanInput;
    static ngAcceptInputType_readonly: BooleanInput;
    static ngAcceptInputType_saveDisabled: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFormRenderer, "ajf-form", never, { "topBar": "topBar"; }, {}, never, ["[ajfFormTopToolbarButtons]", "[ajfFormSaveButton]", "[ajfFormStartMessageTitle]", "[ajfFormStartMessage]", "[ajfFormEndMessageTitle]", "[ajfFormEndMessage]"]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormRenderer, never>;
}

export declare class AjfFormsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormsModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfFormsModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfFormsModule, [typeof i1.AjfBarcodeFieldComponent, typeof i2.AjfBooleanFieldComponent, typeof i3.AjfDateFieldComponent, typeof i4.AjfDateInputFieldComponent, typeof i5.AjfEmptyFieldComponent, typeof i6.AjfFieldWarningDialog, typeof i7.AjfFormField, typeof i8.AjfFormRenderer, typeof i9.AjfInputFieldComponent, typeof i10.AjfMultipleChoiceFieldComponent, typeof i11.AjfRangeFieldComponent, typeof i12.AjfSingleChoiceFieldComponent, typeof i13.AjfTableFieldComponent, typeof i14.AjfTextFieldComponent, typeof i15.AjfTimeFieldComponent, typeof i16.AjfVideoUrlFieldComponent], [typeof i17.AjfBarcodeModule, typeof i18.AjfCalendarModule, typeof i19.AjfCommonModule, typeof i20.AjfFormsModule, typeof i21.AjfCheckboxGroupModule, typeof i22.AjfPageSliderModule, typeof i23.AjfTimeModule, typeof i24.AjfTranslocoModule, typeof i25.CommonModule, typeof i26.MatButtonModule, typeof i27.MatCardModule, typeof i28.MatDialogModule, typeof i29.MatFormFieldModule, typeof i30.MatIconModule, typeof i31.MatInputModule, typeof i32.MatRadioModule, typeof i33.MatSelectModule, typeof i34.MatSlideToggleModule, typeof i35.MatToolbarModule, typeof i36.MatTooltipModule, typeof i37.ReactiveFormsModule, typeof i38.TextFieldModule, typeof i39.MatSliderModule], [typeof i7.AjfFormField, typeof i8.AjfFormRenderer]>;
    static forRoot(): ModuleWithProviders<AjfFormsModule>;
}

export declare class AjfInputFieldComponent extends CoreComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfInputFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfInputFieldComponent, never>;
}

export declare class AjfMultipleChoiceFieldComponent<T> extends AjfFieldWithChoicesComponent<T> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, searchThreshold: number);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfMultipleChoiceFieldComponent<any>, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfMultipleChoiceFieldComponent<any>, [null, null, null, { optional: true; }]>;
}

export declare class AjfSingleChoiceFieldComponent<T> extends AjfFieldWithChoicesComponent<T> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, searchThreshold: number);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfSingleChoiceFieldComponent<any>, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfSingleChoiceFieldComponent<any>, [null, null, null, { optional: true; }]>;
}

export declare class AjfTableFieldComponent extends AjfCoreTableFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfTableFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTableFieldComponent, never>;
}

export declare class AjfTimeFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfTimeFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTimeFieldComponent, never>;
}

export declare class AjfWarningAlertService implements CoreWarningAlertService {
    constructor(_dialog: MatDialog);
    showWarningAlertPrompt(warnings: string[]): Observable<AjfFieldWarningAlertResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfWarningAlertService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfWarningAlertService>;
}
