export declare type AjfContainerNode = AjfSlide | AjfRepeatingSlide | AjfNodeGroup;

export declare class AjfFormBuilder implements AfterViewChecked, AfterContentInit, OnDestroy {
    get choicesOrigins(): Observable<AjfChoicesOrigin<any>[]>;
    get connectedDropLists(): Observable<string[]>;
    designerCont: ElementRef;
    get form(): AjfForm;
    set form(form: AjfForm);
    get isGlobalExpanded(): boolean;
    get nodeEntriesTree(): Observable<AjfFormBuilderNodeEntry[]>;
    get nodeTypes(): AjfFormBuilderNodeTypeEntry[];
    constructor(_service: AjfFormBuilderService, _dialog: MatDialog);
    collapseAll(): void;
    createChoicesOrigin(): void;
    disableDrop(): boolean;
    disableFieldDrop(item: CdkDrag<AjfFormBuilderNodeTypeEntry>): boolean;
    editChoicesOrigin(choicesOrigin: AjfChoicesOrigin<any>): void;
    editStringIdentifier(): void;
    expandAll(): void;
    expandToggle(evt: MatSlideToggleChange): void;
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    onDrop(event: CdkDragDrop<AjfFormBuilderNodeEntry> | CdkDragDrop<AjfFormBuilderNodeTypeEntry>, content?: boolean): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFormBuilder, "ajf-form-builder", never, { "form": "form"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormBuilder, never>;
}

export interface AjfFormBuilderEmptySlot {
    parent: AjfNode;
    parentNode: number;
}

export declare class AjfFormBuilderModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormBuilderModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfFormBuilderModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfFormBuilderModule, [typeof i1.AjfFbBranchLine, typeof i2.AjfFbChoicesOriginEditor, typeof i3.AjfFbChoicesOriginEditorDialog, typeof i4.AjfFbConditionEditor, typeof i5.AjfFbConditionEditorDialog, typeof i6.AjfFbNodeEntry, typeof i7.AjfFbNodeProperties, typeof i8.AjfFbNodeTypeEntry, typeof i9.AjfFbStringIdentifierDialogComponent, typeof i10.AjfFbValidationConditionEditorDialog, typeof i11.AjfFbWarningConditionEditorDialog, typeof i12.AjfFormBuilder], [typeof i13.AjfMonacoEditorModule, typeof i14.AjfNodeIconModule, typeof i15.CommonModule, typeof i16.DragDropModule, typeof i17.FormsModule, typeof i18.MatAutocompleteModule, typeof i19.MatButtonModule, typeof i20.MatCardModule, typeof i21.MatCheckboxModule, typeof i22.MatChipsModule, typeof i23.MatDialogModule, typeof i24.MatFormFieldModule, typeof i25.MatIconModule, typeof i26.MatInputModule, typeof i27.MatListModule, typeof i28.MatMenuModule, typeof i29.MatSelectModule, typeof i30.MatSidenavModule, typeof i31.MatSliderModule, typeof i32.MatTableModule, typeof i33.MatToolbarModule, typeof i34.MatTooltipModule, typeof i17.ReactiveFormsModule, typeof i35.AjfTranslocoModule, typeof i36.MatExpansionModule, typeof i37.MatSlideToggleModule], [typeof i12.AjfFormBuilder]>;
}

export interface AjfFormBuilderMoveEvent {
    fromIndex: number;
    nodeEntry: AjfFormBuilderNode;
    toIndex: number;
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
    get connectedDropLists(): BehaviorSubject<string[]>;
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
    assignListId(node: AjfNode, empty?: boolean): string;
    cancelChoicesOriginEdit(): void;
    cancelConditionEdit(): void;
    cancelNodeEntryEdit(): void;
    createChoicesOrigin(): void;
    deleteNodeEntry(nodeEntry: AjfFormBuilderNodeEntry): void;
    editChoicesOrigin(choicesOrigin: AjfChoicesOrigin<any>): void;
    editCondition(condition: AjfCondition): void;
    editNodeEntry(nodeEntry: AjfFormBuilderNodeEntry): void;
    getCurrentForm(): Observable<AjfForm>;
    insertNode(nodeType: AjfFormBuilderNodeTypeEntry, parent: AjfNode, parentNode: number, inContent?: boolean, insertInIndex?: number): void;
    moveNodeEntry(nodeEntry: AjfFormBuilderNodeEntry, from: number, to: number): void;
    saveChoicesOrigin(params: {
        label: string;
        name: string;
        choices: any[];
    }): void;
    saveCurrentCondition(condition: string): void;
    saveNodeEntry(properties: any): void;
    saveStringIdentifier(identifier: AjfFormStringIdentifier[]): void;
    setForm(form: AjfForm | null): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormBuilderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfFormBuilderService>;
}

export declare function disableFieldDropPredicate(item: CdkDrag<AjfFormBuilderNodeTypeEntry>): boolean;

export declare function disableSlideDropPredicate(item: CdkDrag<AjfFormBuilderNodeTypeEntry>): boolean;

export declare function flattenNodes(nodes: AjfNode[]): AjfNode[];

export declare function onDropProcess(event: CdkDragDrop<AjfFormBuilderNodeEntry> | CdkDragDrop<AjfFormBuilderNodeTypeEntry>, fbService: AjfFormBuilderService, nodeEntry: AjfFormBuilderNode | null, content?: boolean): void;
