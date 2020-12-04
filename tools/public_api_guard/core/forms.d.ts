export declare const AJF_SEARCH_ALERT_THRESHOLD: InjectionToken<number>;

export declare const AJF_WARNING_ALERT_SERVICE: InjectionToken<AjfWarningAlertService>;

export declare class AjfAsFieldInstancePipe implements PipeTransform {
    transform(instance: AjfNodeInstance): AjfFieldInstance;
    static ɵfac: i0.ɵɵFactoryDef<AjfAsFieldInstancePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfAsFieldInstancePipe, "ajfAsFieldInstance">;
}

export declare class AjfAsRepeatingSlideInstancePipe implements PipeTransform {
    transform(instance: AjfSlideInstance): AjfRepeatingSlideInstance;
    static ɵfac: i0.ɵɵFactoryDef<AjfAsRepeatingSlideInstancePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfAsRepeatingSlideInstancePipe, "ajfAsRepeatingSlideInstance">;
}

export interface AjfAttachment<T> {
    label: string;
    type: string;
    value: T;
}

export declare type AjfAttachmentsFixedOrigin<T> = AjfAttachmentsOrigin<T>;

export interface AjfAttachmentsOrigin<T> {
    attachments: AjfAttachment<T>[];
    name: string;
}

export declare class AjfAttachmentsOriginSerializer {
    static fromJson(origin: Partial<AjfAttachmentsOrigin<any>>): AjfAttachmentsOrigin<any>;
}

export declare const enum AjfAttachmentsType {
    Link = 0,
    Pdf = 1,
    LENGTH = 2
}

export declare abstract class AjfBaseFieldComponent<T extends AjfFieldInstance = AjfFieldInstance> implements OnDestroy, OnInit {
    protected _changeDetectorRef: ChangeDetectorRef;
    get control(): Observable<FormControl | null>;
    get instance(): T;
    set instance(instance: T);
    constructor(_changeDetectorRef: ChangeDetectorRef, _service: AjfFormRendererService, _warningAlertService: AjfWarningAlertService);
    protected _onInstanceChange(): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AjfBaseFieldComponent<any>, never, never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfBaseFieldComponent<any>, never>;
}

export interface AjfBaseSlideInstance extends AjfContainerNodeInstance {
    position: number;
    slideNodes: AjfNodeInstance[][];
    valid: boolean;
}

export interface AjfBooleanField extends AjfField {
    fieldType: AjfFieldType.Boolean;
}

export declare class AjfBoolToIntPipe implements PipeTransform {
    transform(value: boolean): number;
    static ɵfac: i0.ɵɵFactoryDef<AjfBoolToIntPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfBoolToIntPipe, "ajfBoolToInt">;
}

export interface AjfChoice<T> {
    label: string;
    value: T;
}

export interface AjfChoicesFixedOrigin<T> extends AjfChoicesOrigin<T> {
    type: 'fixed';
}

export declare type AjfChoicesFixedOriginCreate<T> = Omit<AjfChoicesOriginCreate<T>, 'type'> & Partial<AjfChoicesFixedOrigin<T>>;

export declare type AjfChoicesFunction<T> = () => AjfChoice<T>[];

export interface AjfChoicesFunctionOrigin<T> extends AjfChoicesOrigin<T> {
    generator: AjfChoicesFunction<T>;
    type: 'function';
}

export declare type AjfChoicesFunctionOriginCreate<T> = Omit<AjfChoicesOriginCreate<T>, 'type'> & Pick<AjfChoicesFunctionOrigin<T>, 'generator'> & Partial<AjfChoicesFunctionOrigin<T>>;

export interface AjfChoicesObservableArrayOrigin<T> extends AjfChoicesOrigin<T> {
    generator: Observable<AjfChoice<T>[]>;
    type: 'observableArray';
}

export declare type AjfChoicesObservableArrayOriginCreate<T> = Omit<AjfChoicesOriginCreate<T>, 'type'> & Pick<AjfChoicesObservableArrayOrigin<T>, 'generator'> & Partial<AjfChoicesObservableArrayOrigin<T>>;

export interface AjfChoicesObservableOrigin<T> extends AjfChoicesOrigin<T> {
    generator: Observable<AjfChoice<T>>;
    type: 'observable';
}

export declare type AjfChoicesObservableOriginCreate<T> = Omit<AjfChoicesOriginCreate<T>, 'type'> & Pick<AjfChoicesObservableOrigin<T>, 'generator'> & Partial<AjfChoicesObservableOrigin<T>>;

export interface AjfChoicesOrigin<T> {
    choices: AjfChoice<T>[];
    label: string;
    name: string;
    type: AjfChoicesOriginType;
}

export declare type AjfChoicesOriginCreate<T> = Pick<AjfChoicesOrigin<any>, 'type' | 'name'> & Partial<AjfChoicesOrigin<T>>;

export declare class AjfChoicesOriginSerializer {
    static fromJson(origin: Partial<AjfChoicesOrigin<any>>): AjfChoicesOrigin<any>;
}

export declare type AjfChoicesOriginType = 'fixed' | 'function' | 'observable' | 'observableArray' | 'promise';

export interface AjfChoicesPromiseOrigin<T> extends AjfChoicesOrigin<T> {
    generator: Promise<AjfChoice<T>[]>;
    type: 'promise';
}

export declare type AjfChoicesPromiseOriginCreate<T> = Omit<AjfChoicesOriginCreate<T>, 'type'> & Pick<AjfChoicesPromiseOrigin<T>, 'generator'> & Partial<AjfChoicesPromiseOrigin<T>>;

export declare const enum AjfChoicesType {
    String = 0,
    Number = 1,
    LENGTH = 2
}

export interface AjfContainerNode extends AjfNode {
    nodes: AjfNode[];
}

export declare type AjfContainerNodeCreate = AjfNodeCreate & Partial<AjfContainerNode>;

export interface AjfContainerNodeInstance extends AjfNodeInstance {
    flatNodes: AjfNodeInstance[];
    nodes: AjfNodeInstance[];
}

export interface AjfDateField extends AjfField {
    fieldType: AjfFieldType.Date;
    maxDate?: Date | 'today';
    minDate?: Date | 'today';
}

export interface AjfDateFieldInstance extends AjfFieldInstance {
    node: AjfDateField;
}

export interface AjfDateInputField extends AjfField {
    fieldType: AjfFieldType.DateInput;
    maxDate: Date | 'today';
    minDate: Date | 'today';
}

export interface AjfDateInputFieldInstance extends AjfFieldInstance {
    node: AjfDateInputField;
}

export declare class AjfDateValuePipe implements PipeTransform {
    transform(date: Date | 'today' | undefined): Date | null;
    static ɵfac: i0.ɵɵFactoryDef<AjfDateValuePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfDateValuePipe, "ajfDateValue">;
}

export declare class AjfDateValueStringPipe implements PipeTransform {
    transform(date: Date | 'today' | undefined): string | undefined;
    static ɵfac: i0.ɵɵFactoryDef<AjfDateValueStringPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfDateValueStringPipe, "ajfDateValueString">;
    static ɵprov: i0.ɵɵInjectableDef<AjfDateValueStringPipe>;
}

export interface AjfEmptyField extends AjfField {
    HTML: string;
}

export interface AjfEmptyFieldInstance extends AjfFieldInstance {
    node: AjfEmptyField;
}

export declare class AjfExpandFieldWithChoicesPipe implements PipeTransform {
    transform(instance: AjfFieldWithChoicesInstance<any>, threshold: number): boolean;
    static ɵfac: i0.ɵɵFactoryDef<AjfExpandFieldWithChoicesPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfExpandFieldWithChoicesPipe, "ajfExpandFieldWithChoices">;
}

export interface AjfField extends AjfNode {
    attachmentOrigin?: AjfAttachmentsOrigin<any>;
    attachments?: any[];
    defaultValue: any;
    description?: string;
    editable: boolean;
    fieldType: AjfFieldType;
    formula?: AjfFormula;
    nextSlideCondition?: AjfCondition;
    nodeType: AjfNodeType.AjfField;
    size: AjfFieldSize;
    validation?: AjfValidationGroup;
    warning?: AjfWarningGroup;
}

export interface AjfFieldComponentsMap {
    [key: number]: {
        component: Type<AjfBaseFieldComponent>;
        readOnlyComponent?: Type<AjfBaseFieldComponent>;
        inputs?: {
            [key: string]: any;
        };
        createInstance?: (instance: AjfFieldInstanceCreate, context: AjfContext) => AjfFieldInstance;
        isFieldWithChoice?: boolean;
    };
}

export declare type AjfFieldCreate = Omit<AjfNodeCreate, 'nodeType'> & Pick<AjfField, 'fieldType'> & Partial<AjfField>;

export declare class AjfFieldHost {
    readonly viewContainerRef: ViewContainerRef;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AjfFieldHost, "[ajf-field-host]", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFieldHost, never>;
}

export declare class AjfFieldIconPipe implements PipeTransform {
    transform(field: AjfField | AjfFieldType): string;
    static ɵfac: i0.ɵɵFactoryDef<AjfFieldIconPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfFieldIconPipe, "ajfFieldIcon">;
}

export interface AjfFieldInstance extends AjfNodeInstance {
    formula?: AjfFormula;
    nextSlideCondition?: AjfCondition;
    node: AjfField;
    valid: boolean;
    validation?: AjfValidationGroup;
    validationResults?: AjfValidationResult[];
    value: any;
    warning?: AjfWarningGroup;
    warningResults?: AjfWarningResult[];
    warningTrigger: EventEmitter<void>;
}

export declare type AjfFieldInstanceCreate = AjfNodeInstanceCreate & Partial<AjfFieldInstance>;

export declare class AjfFieldIsValidPipe {
    transform(validationResults?: AjfValidationResult[]): boolean;
    static ɵfac: i0.ɵɵFactoryDef<AjfFieldIsValidPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfFieldIsValidPipe, "ajfFieldIsValid">;
}

export interface AjfFieldNodeLink extends AjfNode {
    nodeType: AjfNodeType.AjfFieldNodeLink;
}

export declare abstract class AjfFieldService {
    readonly componentsMap: AjfFieldComponentsMap;
    registerCustomField(field: {
        fieldType: number;
        component: Type<AjfBaseFieldComponent>;
        readOnlyComponent?: Type<AjfBaseFieldComponent>;
        createInstance?: (instance: AjfFieldInstanceCreate, context: AjfContext) => AjfFieldInstance;
        isFieldWithChoice?: boolean;
    }): void;
}

export declare type AjfFieldSize = 'normal' | 'small' | 'smaller' | 'tiny' | 'mini';

export interface AjfFieldState {
    value: any;
    visibility: boolean;
}

export declare enum AjfFieldType {
    String = 0,
    Text = 1,
    Number = 2,
    Boolean = 3,
    SingleChoice = 4,
    MultipleChoice = 5,
    Formula = 6,
    Empty = 7,
    Date = 8,
    DateInput = 9,
    Time = 10,
    Table = 11,
    Geolocation = 12,
    Barcode = 13,
    File = 14,
    Image = 15,
    VideoUrl = 16,
    LENGTH = 17
}

export interface AjfFieldWarningAlertResult {
    result: boolean;
}

export interface AjfFieldWithChoices<T> extends AjfField {
    choices: AjfChoice<T>[];
    choicesFilter?: AjfFormula;
    choicesOrigin: AjfChoicesOrigin<T>;
    forceExpanded: boolean;
    forceNarrow: boolean;
    triggerConditions?: AjfCondition[];
}

export declare abstract class AjfFieldWithChoicesComponent<T> extends AjfBaseFieldComponent<AjfFieldWithChoicesInstance<T>> {
    get searchThreshold(): number;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, warningAlertService: AjfWarningAlertService, searchThreshold: number);
}

export interface AjfFieldWithChoicesInstance<T> extends AjfFieldInstance {
    choicesFilter?: AjfFormula;
    filteredChoices: AjfChoice<any>[];
    firstTriggerConditionDone: any;
    node: AjfFieldWithChoices<T>;
    selectionTrigger: EventEmitter<void>;
    triggerConditions?: AjfCondition[];
}

export declare type AjfFieldWithChoicesInstanceCreate<T> = AjfFieldInstanceCreate & Partial<AjfFieldWithChoicesInstance<T>>;

export interface AjfFileField extends AjfField {
    fieldType: AjfFieldType.File;
}

export declare class AjfFileFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfFileFieldComponent, "ajf-file-field", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFileFieldComponent, never>;
}

export interface AjfForm {
    attachmentsOrigins: AjfAttachmentsOrigin<any>[];
    choicesOrigins: AjfChoicesOrigin<any>[];
    initContext?: any;
    nodes: (AjfRepeatingSlide | AjfSlide)[];
    stringIdentifier: AjfFormStringIdentifier[];
    supplementaryInformations?: any;
    valid?: boolean;
}

export declare class AjfFormActionEvent {
    action: string;
    source: AjfFormRenderer;
    value: Object;
}

export declare type AjfFormCreate = Partial<AjfForm>;

export declare abstract class AjfFormField implements OnDestroy, OnInit {
    protected abstract componentsMap: AjfFieldComponentsMap;
    fieldHost: AjfFieldHost;
    get instance(): AjfFieldInstance;
    set instance(instance: AjfFieldInstance);
    get readonly(): boolean;
    set readonly(readonly: boolean);
    constructor(_cdr: ChangeDetectorRef, _cfr: ComponentFactoryResolver);
    ngOnDestroy(): void;
    ngOnInit(): void;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AjfFormField, never, never, { "instance": "instance"; "readonly": "readonly"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFormField, never>;
}

export declare const enum AjfFormInitStatus {
    Initializing = 0,
    Complete = 1
}

export declare abstract class AjfFormRenderer implements AfterViewChecked, AfterViewInit, OnDestroy {
    protected _changeDetectorRef: ChangeDetectorRef;
    readonly ajfFieldTypes: typeof AjfFieldType;
    readonly errors: Observable<number>;
    fields: QueryList<AjfFormField>;
    get fixedOrientation(): boolean;
    set fixedOrientation(fixedOrientation: boolean);
    set form(form: AjfForm);
    readonly formAction: Observable<AjfFormActionEvent>;
    readonly formGroup: Observable<FormGroup | null>;
    readonly formIsInit: Observable<boolean>;
    formSlider: AjfPageSlider;
    get hasEndMessage(): boolean;
    set hasEndMessage(hasEndMessage: boolean);
    get hasStartMessage(): boolean;
    set hasStartMessage(hasStartMessage: boolean);
    set hideBottomToolbar(hideBottomToolbar: boolean);
    get hideBottompToolbar(): boolean;
    get hideNavigationButtons(): boolean;
    set hideNavigationButtons(hideNavigationButtons: boolean);
    get hideTopToolbar(): boolean;
    set hideTopToolbar(hideTopToolbar: boolean);
    get orientation(): AjfPageSliderOrientation;
    set orientation(orientation: AjfPageSliderOrientation);
    readonly orientationChange: Observable<AjfPageSliderOrientation>;
    get readonly(): boolean;
    set readonly(readonly: boolean);
    get saveDisabled(): boolean;
    set saveDisabled(saveDisabled: boolean);
    readonly slides: Observable<AjfSlideInstance[]>;
    readonly slidesNum: Observable<number>;
    title: string;
    constructor(_rendererService: AjfFormRendererService, _changeDetectorRef: ChangeDetectorRef);
    addGroup(nodeGroup: AjfNodeGroupInstance | AjfSlideInstance | AjfRepeatingSlideInstance): void;
    goToNextError(): void;
    goToPrevError(): void;
    ngAfterViewChecked(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onFormAction(_evt: any, action: string): void;
    onSave(_evt: any): void;
    orientationChangeHandler(orientation: AjfPageSliderOrientation): void;
    removeGroup(nodeGroup: AjfNodeGroupInstance | AjfSlideInstance | AjfRepeatingSlideInstance): void;
    trackNodeById(_: number, node: AjfNodeInstance): string;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AjfFormRenderer, never, never, { "title": "title"; "saveDisabled": "saveDisabled"; "hasStartMessage": "hasStartMessage"; "hasEndMessage": "hasEndMessage"; "hideTopToolbar": "hideTopToolbar"; "hideBottomToolbar": "hideBottomToolbar"; "hideNavigationButtons": "hideNavigationButtons"; "fixedOrientation": "fixedOrientation"; "readonly": "readonly"; "orientation": "orientation"; "form": "form"; }, { "orientationChange": "orientationChange"; "formAction": "formAction"; }, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFormRenderer, never>;
}

export declare class AjfFormRendererService {
    get currentSupplementaryInformations(): any;
    get errorPositions(): Observable<number[]>;
    get errors(): Observable<number>;
    readonly formGroup: Observable<FormGroup | null>;
    readonly formInitEvent: Observable<AjfFormInitStatus>;
    readonly nextSlideTrigger: Observable<AjfNodeInstance>;
    get nodesTree(): Observable<AjfSlideInstance[]>;
    readonly slidesNum: Observable<number>;
    constructor(_: AjfValidationService);
    addGroup(group: AjfNodeGroupInstance | AjfRepeatingSlideInstance): Observable<boolean>;
    getControl(field: AjfFieldInstance): Observable<AbstractControl | null>;
    getFormValue(): any;
    removeGroup(group: AjfNodeGroupInstance | AjfRepeatingSlideInstance): Observable<boolean>;
    setForm(form: AjfForm | null, context?: AjfContext): void;
    static ɵfac: i0.ɵɵFactoryDef<AjfFormRendererService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AjfFormRendererService>;
}

export declare class AjfFormSerializer {
    static fromJson(form: Partial<AjfForm>, context?: AjfContext): AjfForm;
}

export declare class AjfFormsModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfFormsModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfFormsModule, [typeof i1.AjfAsFieldInstancePipe, typeof i2.AjfAsRepeatingSlideInstancePipe, typeof i3.AjfBoolToIntPipe, typeof i4.AjfDateValuePipe, typeof i5.AjfDateValueStringPipe, typeof i6.AjfExpandFieldWithChoicesPipe, typeof i7.AjfFieldHost, typeof i8.AjfFieldIconPipe, typeof i9.AjfFieldIsValidPipe, typeof i10.AjfFileFieldComponent, typeof i11.AjfFormStringIdentifierPipe, typeof i12.AjfGetTableCellControlPipe, typeof i13.AjfImageFieldComponent, typeof i14.AjfIncrementPipe, typeof i15.AjfIsCellEditablePipe, typeof i16.AjfIsReadonlyInputFieldPipe, typeof i17.AjfIsRepeatingSlideInstancePipe, typeof i18.AjfNodeCompleteNamePipe, typeof i19.AjfRangePipe, typeof i20.AjfReadOnlyFieldComponent, typeof i21.AjfReadOnlyFileFieldComponent, typeof i22.AjfReadOnlyImageFieldComponent, typeof i23.AjfReadOnlySelectFieldComponent, typeof i24.AjfReadOnlyTableFieldComponent, typeof i25.AjfReadOnlyVideoUrlFieldComponent, typeof i26.AjfTableRowClass, typeof i27.AjfTableVisibleColumnsPipe, typeof i28.AjfValidSlidePipe], [typeof i29.AjfCommonModule, typeof i30.AjfFileInputModule, typeof i31.CommonModule, typeof i32.HttpClientModule, typeof i33.ReactiveFormsModule, typeof i34.TranslateModule], [typeof i1.AjfAsFieldInstancePipe, typeof i2.AjfAsRepeatingSlideInstancePipe, typeof i3.AjfBoolToIntPipe, typeof i4.AjfDateValuePipe, typeof i5.AjfDateValueStringPipe, typeof i6.AjfExpandFieldWithChoicesPipe, typeof i7.AjfFieldHost, typeof i8.AjfFieldIconPipe, typeof i9.AjfFieldIsValidPipe, typeof i10.AjfFileFieldComponent, typeof i11.AjfFormStringIdentifierPipe, typeof i12.AjfGetTableCellControlPipe, typeof i13.AjfImageFieldComponent, typeof i14.AjfIncrementPipe, typeof i15.AjfIsCellEditablePipe, typeof i16.AjfIsReadonlyInputFieldPipe, typeof i17.AjfIsRepeatingSlideInstancePipe, typeof i18.AjfNodeCompleteNamePipe, typeof i19.AjfRangePipe, typeof i20.AjfReadOnlyFieldComponent, typeof i21.AjfReadOnlyFileFieldComponent, typeof i22.AjfReadOnlyImageFieldComponent, typeof i23.AjfReadOnlySelectFieldComponent, typeof i24.AjfReadOnlyTableFieldComponent, typeof i25.AjfReadOnlyVideoUrlFieldComponent, typeof i26.AjfTableRowClass, typeof i27.AjfTableVisibleColumnsPipe, typeof i28.AjfValidSlidePipe]>;
}

export declare type AjfFormStringIdentifier = AjfStringIdentifier;

export declare class AjfFormStringIdentifierPipe implements PipeTransform {
    transform(form: AjfForm, context: AjfContext, opts?: BuildStringIdentifierOpts): string;
    static ɵfac: i0.ɵɵFactoryDef<AjfFormStringIdentifierPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfFormStringIdentifierPipe, "ajfFormStringIdentifier">;
}

export interface AjfFormulaField extends AjfField {
    fieldType: AjfFieldType.Formula;
}

export interface AjfFormulaFieldInstance extends AjfFieldInstance {
    formula?: AjfFormula;
    node: AjfFormulaField;
}

export declare class AjfGetTableCellControlPipe implements PipeTransform {
    transform(ctrl: null | string | AjfTableFormControl): AjfTableFormControl | null;
    static ɵfac: i0.ɵɵFactoryDef<AjfGetTableCellControlPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfGetTableCellControlPipe, "ajfGetTableCellControl">;
}

export declare class AjfImageFieldComponent extends AjfBaseFieldComponent {
    readonly imageUrl: Observable<SafeResourceUrl>;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, domSanitizer: DomSanitizer);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfImageFieldComponent, "ajf-image-field", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfImageFieldComponent, never>;
}

export declare class AjfIncrementPipe implements PipeTransform {
    transform(value: number, increment?: number): number;
    static ɵfac: i0.ɵɵFactoryDef<AjfIncrementPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfIncrementPipe, "ajfIncrement">;
}

export declare abstract class AjfInputFieldComponent extends AjfBaseFieldComponent {
    type: 'text' | 'number';
}

export declare class AjfInvalidFieldDefinitionError extends AjfError {
    get name(): string;
    constructor(message?: string);
}

export declare class AjfIsCellEditablePipe implements PipeTransform {
    transform(cell: string | AjfTableCell): boolean;
    static ɵfac: i0.ɵɵFactoryDef<AjfIsCellEditablePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfIsCellEditablePipe, "ajfIsCellEditable">;
}

export declare class AjfIsReadonlyInputFieldPipe implements PipeTransform {
    transform(instance: AjfNodeInstance): boolean;
    static ɵfac: i0.ɵɵFactoryDef<AjfIsReadonlyInputFieldPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfIsReadonlyInputFieldPipe, "ajfIsReadonlyInputField">;
}

export declare class AjfIsRepeatingSlideInstancePipe implements PipeTransform {
    transform(instance: AjfNodeInstance): boolean;
    static ɵfac: i0.ɵɵFactoryDef<AjfIsRepeatingSlideInstancePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfIsRepeatingSlideInstancePipe, "ajfIsRepeatingSlideInstance">;
}

export interface AjfMultipleChoiceField<T> extends AjfFieldWithChoices<T> {
    fieldType: AjfFieldType.MultipleChoice;
}

export interface AjfNode {
    conditionalBranches: AjfCondition[];
    id: number;
    label: string;
    name: string;
    nodeType: AjfNodeType;
    parent: number;
    parentNode: number;
    visibility?: AjfCondition;
}

export declare class AjfNodeCompleteNamePipe implements PipeTransform {
    transform(instance: AjfNodeInstance): string;
    static ɵfac: i0.ɵɵFactoryDef<AjfNodeCompleteNamePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfNodeCompleteNamePipe, "ajfNodeCompleteName">;
}

export declare type AjfNodeCreate = Pick<AjfNode, 'nodeType' | 'id' | 'parent' | 'name'> & Partial<AjfNode>;

export interface AjfNodeGroup extends AjfRepeatingContainerNode {
    nodeType: AjfNodeType.AjfNodeGroup;
}

export interface AjfNodeGroupInstance extends AjfRepeatingContainerNodeInstance {
    node: AjfNodeGroup;
}

export interface AjfNodeInstance {
    conditionalBranches: AjfCondition[];
    node: AjfNode;
    prefix: number[];
    updatedEvt: EventEmitter<void>;
    verifiedBranch?: number;
    visibility?: AjfCondition;
    visible: boolean;
}

export declare type AjfNodeInstanceCreate = Pick<AjfNodeInstance, 'node'> & Partial<AjfNodeInstance>;

export declare class AjfNodeSerializer {
    static fromJson(json: Partial<AjfNode>, choicesOrigins?: AjfChoicesOrigin<any>[], attachmentsOrigins?: AjfAttachmentsOrigin<any>[]): AjfNode;
}

export interface AjfNodesInstancesOperation {
    (nodes: AjfNodeInstance[]): AjfNodeInstance[];
}

export interface AjfNodesOperation {
    (nodes: AjfNode[]): AjfNode[];
}

export declare enum AjfNodeType {
    AjfField = 0,
    AjfFieldNodeLink = 1,
    AjfNodeGroup = 2,
    AjfSlide = 3,
    AjfRepeatingSlide = 4,
    LENGTH = 5
}

export interface AjfNumberField extends AjfField {
    fieldType: AjfFieldType.Number;
}

export declare class AjfRangePipe implements PipeTransform {
    transform(size?: number, start?: number, step?: number): number[];
    static ɵfac: i0.ɵɵFactoryDef<AjfRangePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfRangePipe, "ajfRange">;
}

export declare class AjfReadOnlyFieldComponent extends CoreComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfReadOnlyFieldComponent, "ajf-read-only-field", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfReadOnlyFieldComponent, never>;
}

export declare class AjfReadOnlyFileFieldComponent extends AjfBaseFieldComponent {
    readonly fileIcon: SafeResourceUrl;
    readonly fileName: Observable<string>;
    readonly fileUrl: Observable<SafeResourceUrl>;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, domSanitizer: DomSanitizer);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfReadOnlyFileFieldComponent, "ajf-read-only-file-field", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfReadOnlyFileFieldComponent, never>;
}

export declare class AjfReadOnlyImageFieldComponent extends AjfBaseFieldComponent {
    readonly imageUrl: Observable<SafeResourceUrl>;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, domSanitizer: DomSanitizer);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfReadOnlyImageFieldComponent, "ajf-read-only-image-field", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfReadOnlyImageFieldComponent, never>;
}

export declare class AjfReadOnlySelectFieldComponent extends AjfBaseFieldComponent<AjfFieldWithChoicesInstance<String | number>> {
    readonly multiple: Observable<boolean>;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfReadOnlySelectFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfReadOnlySelectFieldComponent, never>;
}

export declare class AjfReadOnlyTableFieldComponent extends AjfBaseFieldComponent<AjfTableFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfReadOnlyTableFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfReadOnlyTableFieldComponent, never>;
}

export declare class AjfReadOnlyVideoUrlFieldComponent extends AjfVideoUrlFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, domSanitizer: DomSanitizer, httpClient: HttpClient);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfReadOnlyVideoUrlFieldComponent, "ajf-read-only-video-url-field", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfReadOnlyVideoUrlFieldComponent, never>;
}

export interface AjfRendererUpdateMap {
    [prop: string]: AjfNodeInstance[];
}

export interface AjfRendererUpdateMapOperation {
    (map: AjfRendererUpdateMap): AjfRendererUpdateMap;
}

export declare type AjfRepeatingContainerNode = AjfContainerNode & AjfRepeatingNode;

export interface AjfRepeatingContainerNodeInstance extends AjfContainerNodeInstance, AjfRepeatingNodeInstance {
    node: AjfRepeatingContainerNode;
}

export interface AjfRepeatingNode extends AjfNode {
    formulaReps?: AjfFormula;
    maxReps: number;
    minReps: number;
}

export interface AjfRepeatingNodeInstance extends AjfNodeInstance {
    canAdd?: boolean;
    canRemove?: boolean;
    formulaReps?: AjfFormula;
    node: AjfRepeatingNode;
    reps: number;
}

export interface AjfRepeatingSlide extends AjfRepeatingContainerNode {
    nodeType: AjfNodeType.AjfRepeatingSlide;
}

export interface AjfRepeatingSlideInstance extends AjfBaseSlideInstance, AjfRepeatingContainerNodeInstance {
    node: AjfRepeatingSlide;
}

export interface AjfSingleChoiceField<T> extends AjfFieldWithChoices<T> {
    fieldType: AjfFieldType.SingleChoice;
}

export interface AjfSlide extends AjfContainerNode {
    nodeType: AjfNodeType.AjfSlide;
}

export interface AjfSlideInstance extends AjfBaseSlideInstance {
    node: AjfSlide;
}

export interface AjfStringField extends AjfField {
    fieldType: AjfFieldType.String;
}

export interface AjfTableCell {
    editable?: boolean;
    formula: string;
}

export interface AjfTableField extends AjfField {
    columnLabels: string[];
    fieldType: AjfFieldType.Table;
    hideEmptyRows: boolean;
    rowLabels: string[];
    rows: (string | AjfTableCell)[][];
}

export declare abstract class AjfTableFieldComponent extends AjfBaseFieldComponent<AjfTableFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    goToCell(row: number, column: number): void;
    goToNextCell(ev: Event, row: number, column: number): void;
}

export interface AjfTableFieldInstance extends AjfFieldInstance {
    context: AjfContext;
    controls: [string, (string | AjfTableFormControl)[]][];
    hideEmptyRows: boolean;
    node: AjfTableField;
    value: [string, (string | number)[]][];
}

export declare class AjfTableRowClass implements PipeTransform {
    transform(value: number): string;
    static ɵfac: i0.ɵɵFactoryDef<AjfTableRowClass, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfTableRowClass, "ajfTableRowClass">;
}

export declare class AjfTableVisibleColumnsPipe implements PipeTransform {
    transform(instance: AjfTableFieldInstance): (string | number | AjfTableFormControl)[][];
    static ɵfac: i0.ɵɵFactoryDef<AjfTableVisibleColumnsPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfTableVisibleColumnsPipe, "ajfTableVisibleColumns">;
}

export interface AjfTextField extends AjfField {
    fieldType: AjfFieldType.Text;
}

export interface AjfTimeField extends AjfField {
    fieldType: AjfFieldType.Time;
}

export interface AjfValidation extends AjfCondition {
    clientValidation: boolean;
    errorMessage: string;
}

export interface AjfValidationGroup {
    conditions: AjfValidation[];
    forceValue?: AjfCondition;
    maxDigits?: AjfValidation;
    maxValue?: AjfValidation;
    minDigits?: AjfValidation;
    minValue?: AjfValidation;
    notEmpty?: AjfValidation;
}

export declare class AjfValidationGroupSerializer {
    static fromJson(group: Partial<AjfValidationGroup>): AjfValidationGroup;
}

export interface AjfValidationResult {
    clientValidation: boolean;
    error: string;
    result: boolean;
}

export declare class AjfValidationService {
    constructor();
    addFunction(f: Function | string): void;
    addFunctionHandler(name: string, fn: any): void;
    static ɵfac: i0.ɵɵFactoryDef<AjfValidationService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AjfValidationService>;
}

export declare class AjfValidSlidePipe implements PipeTransform {
    transform(slide: AjfBaseSlideInstance, idx: number): boolean;
    static ɵfac: i0.ɵɵFactoryDef<AjfValidSlidePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfValidSlidePipe, "ajfValidSlide">;
}

export declare type AjfVideoProvider = 'youtube' | 'vimeo';

export declare class AjfVideoUrlFieldComponent extends AjfBaseFieldComponent {
    readonly validUrl: Observable<boolean>;
    readonly videoThumbnail: Observable<SafeResourceUrl>;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, domSanitizer: DomSanitizer, httpClient: HttpClient);
}

export interface AjfWarning extends AjfCondition {
    warningMessage: string;
}

export interface AjfWarningAlertService {
    showWarningAlertPrompt(warnings: string[]): Observable<AjfFieldWarningAlertResult>;
}

export interface AjfWarningGroup {
    conditions: AjfWarning[];
    notEmpty?: AjfWarning;
}

export declare class AjfWarningGroupSerializer {
    static fromJson(group: Partial<AjfWarningGroup>): AjfWarningGroup;
}

export interface AjfWarningResult {
    result: boolean;
    warning: string;
}

export declare const buildFormStringIdentifier: (form: AjfForm, context: AjfContext, opts?: BuildStringIdentifierOpts | undefined) => string;

export declare function createChoicesFixedOrigin<T = string | number>(origin: AjfChoicesFixedOriginCreate<T>): AjfChoicesFixedOrigin<T>;

export declare function createChoicesFunctionOrigin<T>(origin: AjfChoicesFunctionOriginCreate<T>): AjfChoicesFunctionOrigin<T>;

export declare function createChoicesObservableArrayOrigin<T>(origin: AjfChoicesObservableArrayOriginCreate<T>): AjfChoicesObservableArrayOrigin<T>;

export declare function createChoicesObservableOrigin<T>(origin: AjfChoicesObservableOriginCreate<T>): AjfChoicesObservableOrigin<T>;

export declare function createChoicesOrigin<T>(origin: AjfChoicesOriginCreate<T>): AjfChoicesOrigin<T>;

export declare function createChoicesPromiseOrigin<T>(origin: AjfChoicesPromiseOriginCreate<T>): AjfChoicesPromiseOrigin<T>;

export declare function createContainerNode(containerNode: AjfContainerNodeCreate): AjfContainerNode;

export declare function createField(field: AjfFieldCreate): AjfField;

export declare function createFieldInstance(instance: AjfFieldInstanceCreate, context: AjfContext): AjfFieldInstance;

export declare function createFieldWithChoicesInstance<T>(instance: AjfFieldWithChoicesInstanceCreate<T>, context: AjfContext): AjfFieldWithChoicesInstance<T>;

export declare function createForm(form?: AjfFormCreate): AjfForm;

export declare function createNode(node: AjfNodeCreate): AjfNode;

export declare function createNodeInstance(instance: AjfNodeInstanceCreate): AjfNodeInstance;

export declare function createValidation(validation: Pick<AjfValidation, 'condition'> & Partial<AjfValidation>): AjfValidation;

export declare function createValidationGroup(group: Partial<AjfValidationGroup>): AjfValidationGroup;

export declare function createWarning(warning: Pick<AjfWarning, 'condition'> & Partial<AjfWarning>): AjfWarning;

export declare function createWarningGroup(group: Partial<AjfWarningGroup>): AjfWarningGroup;

export declare function fieldIconName(type: AjfFieldType): string;

export declare function flattenNodes(nodes: AjfNode[]): AjfNode[];

export declare function getTypeName(v: any): string;

export declare function initChoicesOrigin(origin: AjfChoicesOrigin<any>): Promise<void>;

export declare function isChoicesFixedOrigin(origin: AjfChoicesOrigin<any>): boolean;

export declare function isChoicesOrigin(co: any): boolean;

export declare function isContainerNode(node: AjfNode): boolean;

export declare function isCustomFieldWithChoices(field: AjfField): boolean;

export declare function isField(node: AjfNode): boolean;

export declare function isFieldWithChoices(field: AjfField): boolean;

export declare function isNumberField(field: AjfField): boolean;

export declare function isRepeatingContainerNode(node: AjfNode): boolean;

export declare function isSlidesNode(node: AjfNode): boolean;

export declare function maxDigitsValidation(maxValue: number): AjfValidation;

export declare function maxValidation(maxValue: number): AjfValidation;

export declare function minDigitsValidation(minValue: number): AjfValidation;

export declare function minValidation(minValue: number): AjfValidation;

export declare function notEmptyValidation(): AjfValidation;

export declare function notEmptyWarning(): AjfWarning;
