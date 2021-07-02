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
    input: IonInput;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, _dvs: AjfDateValueStringPipe);
    protected _onInstanceChange(): void;
    onChange(event: Event): void;
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

export declare class AjfFormField extends CoreFormField {
    readonly componentsMap: AjfFieldComponentsMap;
    constructor(cdr: ChangeDetectorRef, cfr: ComponentFactoryResolver, fieldService: AjfFieldService);
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFormField, "ajf-field,ajf-form-field", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormField, never>;
}

export declare class AjfFormRenderer extends AjfCoreFormRenderer implements AfterViewInit, OnDestroy {
    get longSlide(): boolean;
    popoverController: PopoverController;
    topBar: boolean;
    constructor(rendererService: AjfFormRendererService, cdr: ChangeDetectorRef, popoverController: PopoverController);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    openPopover(ev: any, hint: string): void;
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
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfFormsModule, [typeof i1.AjfBarcodeFieldComponent, typeof i2.AjfBooleanFieldComponent, typeof i3.AjfDateFieldComponent, typeof i4.AjfDateInputFieldComponent, typeof i5.AjfEmptyFieldComponent, typeof i6.AjfFormField, typeof i7.AjfFormPage, typeof i8.AjfFormRenderer, typeof i9.AjfFormulaFieldComponent, typeof i10.AjfInputFieldComponent, typeof i11.AjfMultipleChoiceFieldComponent, typeof i12.AjfNumberFieldComponent, typeof i13.AjfPopover, typeof i14.AjfSelectHasSearchBarPipe, typeof i15.AjfSelectUseVirtualScroll, typeof i16.AjfSingleChoiceFieldComponent, typeof i17.AjfTableFieldComponent, typeof i18.AjfTextareaFieldComponent, typeof i19.AjfTimeFieldComponent, typeof i20.AjfVideoUrlFieldComponent], [typeof i21.AjfBarcodeModule, typeof i22.AjfCalendarModule, typeof i23.AjfCheckboxGroupModule, typeof i24.AjfCommonModule, typeof i25.AjfFormsModule, typeof i26.AjfPageSliderModule, typeof i27.AjfTimeModule, typeof i28.CommonModule, typeof i29.FormsModule, typeof i30.GicModule, typeof i31.IonicModule, typeof i29.ReactiveFormsModule, typeof i32.AjfTranslocoModule], [typeof i6.AjfFormField, typeof i8.AjfFormRenderer]>;
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

export declare class AjfNumberFieldComponent extends CoreComponent implements OnDestroy, OnInit {
    readonly value: Observable<number | null>;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    ngOnDestroy(): void;
    ngOnInit(): void;
    setValue(value: any): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfNumberFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfNumberFieldComponent, never>;
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

export declare class AjfTextareaFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfTextareaFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTextareaFieldComponent, never>;
}

export declare class AjfTimeFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfTimeFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTimeFieldComponent, never>;
}

export declare class AjfWarningAlertService implements CoreWarningAlertService {
    constructor(_alertCtrl: AlertController);
    showWarningAlertPrompt(warnings: string[]): Observable<AjfFieldWarningAlertResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfWarningAlertService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfWarningAlertService>;
}
