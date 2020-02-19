export declare type AjfContainerNode = AjfSlide | AjfRepeatingSlide | AjfNodeGroup;

export declare class AjfFormBuilder implements AfterViewChecked, AfterContentInit, OnDestroy {
    get choicesOrigins(): Observable<AjfChoicesOrigin<any>[]>;
    designerCont: ElementRef;
    get form(): AjfForm;
    set form(form: AjfForm);
    get nodeEntriesTree(): Observable<AjfFormBuilderNodeEntry[]>;
    get nodeTypes(): AjfFormBuilderNodeTypeEntry[];
    constructor(_service: AjfFormBuilderService, _dialog: MatDialog);
    createChoicesOrigin(): void;
    disableDropPredicate(): boolean;
    editChoicesOrigin(choicesOrigin: AjfChoicesOrigin<any>): void;
    editStringIdentifier(): void;
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfFormBuilder, "ajf-form-builder", never, { "form": "form"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFormBuilder>;
}

export interface AjfFormBuilderEmptySlot {
    parent: AjfNode;
    parentNode: number;
}

export declare class AjfFormBuilderModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfFormBuilderModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfFormBuilderModule, [typeof i1.AjfFbBranchLine, typeof i2.AjfFbChoicesOriginEditorDialog, typeof i3.AjfFbChoicesOriginEditor, typeof i4.AjfFbConditionEditorDialog, typeof i5.AjfFbConditionEditor, typeof i6.AjfFbNodeEntry, typeof i7.AjfFbNodeProperties, typeof i8.AjfFbNodeTypeEntry, typeof i9.AjfFbStringIdentifierDialogComponent, typeof i10.AjfFbValidationConditionEditorDialog, typeof i11.AjfFbWarningConditionEditorDialog, typeof i12.AjfFormBuilder], [typeof i13.CommonModule, typeof i14.FormsModule, typeof i14.ReactiveFormsModule, typeof i15.DragDropModule, typeof i16.MatAutocompleteModule, typeof i17.MatButtonModule, typeof i18.MatCardModule, typeof i19.MatCheckboxModule, typeof i20.MatChipsModule, typeof i21.MatDialogModule, typeof i22.MatFormFieldModule, typeof i23.MatIconModule, typeof i24.MatInputModule, typeof i25.MatListModule, typeof i26.MatMenuModule, typeof i27.MatSelectModule, typeof i28.MatSidenavModule, typeof i29.MatSliderModule, typeof i30.MatTableModule, typeof i31.MatToolbarModule, typeof i32.MatTooltipModule, typeof i33.TranslateModule, typeof i34.AjfMonacoEditorModule, typeof i35.AjfNodeIconModule], [typeof i12.AjfFormBuilder]>;
}

export declare type AjfFormBuilderNode = AjfFormBuilderNodeEntry | AjfFormBuilderEmptySlot;

export interface AjfFormBuilderNodeEntry {
    children: AjfFormBuilderNodeEntry[];
    container: AjfContainerNode | null;
    content: AjfFormBuilderNodeEntry[];
    node: AjfNode;
}

export interface AjfFormBuilderNodeTypeEntry {
    icon: {
        fontSet: string;
        fontIcon: string;
    };
    isSlide?: boolean;
    label: string;
    nodeType: {
        node: AjfNodeType;
        field?: AjfFieldType;
    };
}

export declare class AjfFormBuilderService {
    get afterNodeUpdate(): Observable<void>;
    get attachmentsOrigins(): Observable<AjfAttachmentsOrigin<any>[]>;
    get availableNodeTypes(): AjfFormBuilderNodeTypeEntry[];
    get beforeNodesUpdate(): Observable<void>;
    get choicesOrigins(): Observable<AjfChoicesOrigin<any>[]>;
    get editedChoicesOrigin(): Observable<AjfChoicesOrigin<any> | null>;
    get editedCondition(): Observable<AjfCondition | null>;
    get editedNodeEntry(): Observable<AjfFormBuilderNodeEntry | null>;
    get flatFields(): Observable<AjfField[]>;
    get flatNodes(): Observable<AjfNode[]>;
    get form(): Observable<AjfForm | null>;
    get nodeEntriesTree(): Observable<AjfFormBuilderNodeEntry[]>;
    get nodes(): Observable<AjfNode[]>;
    get stringIdentifier(): Observable<AjfFormStringIdentifier[]>;
    constructor();
    cancelChoicesOriginEdit(): void;
    cancelConditionEdit(): void;
    cancelNodeEntryEdit(): void;
    createChoicesOrigin(): void;
    deleteNodeEntry(nodeEntry: AjfFormBuilderNodeEntry): void;
    editChoicesOrigin(choicesOrigin: AjfChoicesOrigin<any>): void;
    editCondition(condition: AjfCondition): void;
    editNodeEntry(nodeEntry: AjfFormBuilderNodeEntry): void;
    getCurrentForm(): Observable<AjfForm>;
    insertNode(nodeType: AjfFormBuilderNodeTypeEntry, parent: AjfNode, parentNode: number, inContent?: boolean): void;
    saveChoicesOrigin(params: {
        label: string;
        name: string;
        choices: any[];
    }): void;
    saveCurrentCondition(condition: string): void;
    saveNodeEntry(properties: any): void;
    saveStringIdentifier(identifier: AjfFormStringIdentifier[]): void;
    setForm(form: AjfForm | null): void;
    static ɵfac: i0.ɵɵFactoryDef<AjfFormBuilderService>;
    static ɵprov: i0.ɵɵInjectableDef<AjfFormBuilderService>;
}

export declare function flattenNodes(nodes: AjfNode[]): AjfNode[];
