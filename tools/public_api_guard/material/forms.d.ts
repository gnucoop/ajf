export declare class AjfBooleanFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfBooleanFieldComponent, "ng-component", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfBooleanFieldComponent>;
}

export declare class AjfDateFieldComponent extends AjfBaseFieldComponent<AjfDateFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfDateFieldComponent, "ng-component", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfDateFieldComponent>;
}

export declare class AjfDateInputFieldComponent extends AjfBaseFieldComponent<AjfDateFieldInstance> {
    input: MatInput;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, _dvs: AjfDateValueStringPipe);
    protected _onInstanceChange(): void;
    onChange(): void;
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfDateInputFieldComponent, "ng-component", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfDateInputFieldComponent>;
}

export declare class AjfEmptyFieldComponent extends AjfBaseFieldComponent<AjfEmptyFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfEmptyFieldComponent, "ng-component", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfEmptyFieldComponent>;
}

export declare class AjfFieldService extends CoreService {
    constructor();
    static ɵfac: i0.ɵɵFactoryDef<AjfFieldService>;
    static ɵprov: i0.ɵɵInjectableDef<AjfFieldService>;
}

export declare class AjfFieldWarningDialog {
    message: string;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfFieldWarningDialog, "ng-component", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFieldWarningDialog>;
}

export declare class AjfFormField extends CoreFormField {
    readonly componentsMap: AjfFieldComponentsMap;
    constructor(cdr: ChangeDetectorRef, cfr: ComponentFactoryResolver, fieldService: AjfFieldService);
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfFormField, "ajf-field,ajf-form-field", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFormField>;
}

export declare class AjfFormRenderer extends AjfCoreFormRenderer {
    topBar: boolean;
    constructor(rendererService: AjfFormRendererService, changeDetectorRef: ChangeDetectorRef);
    scrollToSlide(slide: any): void;
    static ngAcceptInputType_fixedOrientation: BooleanInput;
    static ngAcceptInputType_hasEndMessage: BooleanInput;
    static ngAcceptInputType_hasStartMessage: BooleanInput;
    static ngAcceptInputType_hideBottomToolbar: BooleanInput;
    static ngAcceptInputType_hideNavigationButtons: BooleanInput;
    static ngAcceptInputType_hideTopToolbar: BooleanInput;
    static ngAcceptInputType_readonly: BooleanInput;
    static ngAcceptInputType_saveDisabled: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfFormRenderer, "ajf-form", never, { "topBar": "topBar"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFormRenderer>;
}

export declare class AjfFormsModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfFormsModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfFormsModule, [typeof i1.AjfBarcodeFieldComponent, typeof i2.AjfBooleanFieldComponent, typeof i3.AjfDateFieldComponent, typeof i4.AjfDateInputFieldComponent, typeof i5.AjfEmptyFieldComponent, typeof i6.AjfFieldWarningDialog, typeof i7.AjfFormField, typeof i8.AjfFormRenderer, typeof i9.AjfGetTableCellControlPipe, typeof i10.AjfInputFieldComponent, typeof i11.AjfIsCellEditablePipe, typeof i12.AjfMultipleChoiceFieldComponent, typeof i13.AjfSingleChoiceFieldComponent, typeof i14.AjfTableFieldComponent, typeof i15.AjfTimeFieldComponent], [typeof i16.CommonModule, typeof i17.ReactiveFormsModule, typeof i18.MatButtonModule, typeof i19.MatCardModule, typeof i20.MatDialogModule, typeof i21.MatFormFieldModule, typeof i22.MatIconModule, typeof i23.MatInputModule, typeof i24.MatRadioModule, typeof i25.MatSelectModule, typeof i26.MatSlideToggleModule, typeof i27.MatToolbarModule, typeof i28.TranslateModule, typeof i29.AjfFormsModule, typeof i30.AjfCalendarModule, typeof i31.AjfBarcodeModule, typeof i32.AjfCheckboxGroupModule, typeof i33.AjfCommonModule, typeof i34.AjfPageSliderModule, typeof i35.AjfTimeModule], [typeof i7.AjfFormField, typeof i8.AjfFormRenderer]>;
    static forRoot(): i0.ModuleWithProviders<AjfFormsModule>;
}

export declare class AjfInputFieldComponent extends CoreComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfInputFieldComponent, "ng-component", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfInputFieldComponent>;
}

export declare class AjfMultipleChoiceFieldComponent<T> extends AjfFieldWithChoicesComponent<T> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, searchThreshold: number);
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfMultipleChoiceFieldComponent<any>, "ng-component", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfMultipleChoiceFieldComponent<any>>;
}

export declare class AjfSingleChoiceFieldComponent<T> extends AjfFieldWithChoicesComponent<T> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, searchThreshold: number);
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfSingleChoiceFieldComponent<any>, "ng-component", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfSingleChoiceFieldComponent<any>>;
}

export declare class AjfTableFieldComponent extends AjfBaseFieldComponent<AjfTableFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    goToCell(row: number, column: number): void;
    goToNextCell(ev: Event, row: number, column: number): void;
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfTableFieldComponent, "ng-component", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfTableFieldComponent>;
}

export declare class AjfTimeFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfTimeFieldComponent, "ng-component", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfTimeFieldComponent>;
}

export declare class AjfWarningAlertService implements CoreWarningAlertService {
    constructor(_dialog: MatDialog);
    showWarningAlertPrompt(warnings: string[]): Observable<AjfFieldWarningAlertResult>;
    static ɵfac: i0.ɵɵFactoryDef<AjfWarningAlertService>;
    static ɵprov: i0.ɵɵInjectableDef<AjfWarningAlertService>;
}
