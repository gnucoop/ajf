export declare class AjfBooleanFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfBooleanFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfBooleanFieldComponent, never>;
}

export declare class AjfDateFieldComponent extends AjfBaseFieldComponent<AjfDateFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfDateFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfDateFieldComponent, never>;
}

export declare class AjfDateInputFieldComponent extends AjfBaseFieldComponent<AjfDateFieldInstance> {
    input: IonInput;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, _dvs: AjfDateValueStringPipe);
    protected _onInstanceChange(): void;
    onChange(event: Event): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfDateInputFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfDateInputFieldComponent, never>;
}

export declare class AjfEmptyFieldComponent extends AjfBaseFieldComponent<AjfEmptyFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfEmptyFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfEmptyFieldComponent, never>;
}

export declare class AjfFieldService extends CoreService {
    constructor();
    static ɵfac: i0.ɵɵFactoryDef<AjfFieldService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AjfFieldService>;
}

export declare class AjfFormField extends CoreFormField {
    readonly componentsMap: AjfFieldComponentsMap;
    constructor(cdr: ChangeDetectorRef, cfr: ComponentFactoryResolver, fieldService: AjfFieldService);
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfFormField, "ajf-field,ajf-form-field", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFormField, never>;
}

export declare class AjfFormRenderer extends AjfCoreFormRenderer implements AfterViewInit, OnDestroy {
    get longSlide(): boolean;
    constructor(rendererService: AjfFormRendererService, cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ngAcceptInputType_fixedOrientation: BooleanInput;
    static ngAcceptInputType_hasEndMessage: BooleanInput;
    static ngAcceptInputType_hasStartMessage: BooleanInput;
    static ngAcceptInputType_hideBottomToolbar: BooleanInput;
    static ngAcceptInputType_hideNavigationButtons: BooleanInput;
    static ngAcceptInputType_hideTopToolbar: BooleanInput;
    static ngAcceptInputType_readonly: BooleanInput;
    static ngAcceptInputType_saveDisabled: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfFormRenderer, "ajf-form", never, {}, {}, never, ["[ajfFormStartMessageTitle]", "[ajfFormStartMessage]", "[ajfFormEndMessageTitle]", "[ajfFormEndMessage]"]>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFormRenderer, never>;
}

export declare class AjfFormsModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfFormsModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfFormsModule, [typeof i1.AjfBarcodeFieldComponent, typeof i2.AjfBooleanFieldComponent, typeof i3.AjfDateFieldComponent, typeof i4.AjfDateInputFieldComponent, typeof i5.AjfEmptyFieldComponent, typeof i6.AjfFormField, typeof i7.AjfFormPage, typeof i8.AjfFormRenderer, typeof i9.AjfFormulaFieldComponent, typeof i10.AjfInputFieldComponent, typeof i11.AjfMultipleChoiceFieldComponent, typeof i12.AjfNumberFieldComponent, typeof i13.AjfSelectHasSearchBarPipe, typeof i14.AjfSelectUseVirtualScroll, typeof i15.AjfSingleChoiceFieldComponent, typeof i16.AjfTableFieldComponent, typeof i17.AjfTextareaFieldComponent, typeof i18.AjfTimeFieldComponent], [typeof i19.AjfBarcodeModule, typeof i20.AjfCalendarModule, typeof i21.AjfCheckboxGroupModule, typeof i22.AjfCommonModule, typeof i23.AjfFormsModule, typeof i24.AjfPageSliderModule, typeof i25.AjfTimeModule, typeof i26.CommonModule, typeof i27.FormsModule, typeof i28.GicModule, typeof i29.IonicModule, typeof i27.ReactiveFormsModule, typeof i30.TranslateModule], [typeof i6.AjfFormField, typeof i8.AjfFormRenderer]>;
    static forRoot(): i0.ModuleWithProviders<AjfFormsModule>;
}

export declare class AjfInputFieldComponent extends CoreComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfInputFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfInputFieldComponent, never>;
}

export declare class AjfMultipleChoiceFieldComponent<T> extends AjfFieldWithChoicesComponent<T> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, searchThreshold: number);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfMultipleChoiceFieldComponent<any>, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfMultipleChoiceFieldComponent<any>, [null, null, null, { optional: true; }]>;
}

export declare class AjfNumberFieldComponent extends CoreComponent implements OnDestroy, OnInit {
    readonly value: Observable<number | null>;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    ngOnDestroy(): void;
    ngOnInit(): void;
    setValue(value: any): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfNumberFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfNumberFieldComponent, never>;
}

export declare class AjfSingleChoiceFieldComponent<T> extends AjfFieldWithChoicesComponent<T> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, searchThreshold: number);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfSingleChoiceFieldComponent<any>, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfSingleChoiceFieldComponent<any>, [null, null, null, { optional: true; }]>;
}

export declare class AjfTableFieldComponent extends AjfCoreTableFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfTableFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfTableFieldComponent, never>;
}

export declare class AjfTextareaFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfTextareaFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfTextareaFieldComponent, never>;
}

export declare class AjfTimeFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfTimeFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfTimeFieldComponent, never>;
}

export declare class AjfWarningAlertService implements CoreWarningAlertService {
    constructor(_alertCtrl: AlertController);
    showWarningAlertPrompt(warnings: string[]): Observable<AjfFieldWarningAlertResult>;
    static ɵfac: i0.ɵɵFactoryDef<AjfWarningAlertService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AjfWarningAlertService>;
}
