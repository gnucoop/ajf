export declare const AJF_REPORTS_CONFIG: InjectionToken<AjfReportsConfig>;

export declare class AjfReportBuilder implements AfterContentInit {
    get report(): AjfReport;
    set report(report: AjfReport);
    startSidenav: MatSidenav;
    constructor(_service: AjfReportBuilderService);
    ngAfterContentInit(): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfReportBuilder, "ajf-report-builder", never, { "report": "report"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfReportBuilder, never>;
}

export declare class AjfReportBuilderModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfReportBuilderModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfReportBuilderModule, [typeof i1.AjfQuillEditor, typeof i2.AjfReportBuilderColumn, typeof i3.AjfReportBuilderConditionEditor, typeof i4.AjfReportBuilderContent, typeof i5.AjfReportBuilderCustomWidgetDialog, typeof i6.AjfReportBuilderCustomWidgetToolbarButton, typeof i7.AjfReportBuilderCustomWidgetsToolbar, typeof i8.AjfReportBuilderFormsAnalyzerDialog, typeof i9.AjfReportBuilderFormsAnalyzer, typeof i10.AjfReportBuilderImageGroup, typeof i11.AjfReportBuilderProperties, typeof i12.AjfReportBuilderRendererWidget, typeof i13.AjfReportBuilderThemeColorDialog, typeof i14.AjfReportBuilderThemeColor, typeof i15.AjfReportBuilderToolbarDialog, typeof i16.AjfReportBuilderToolbar, typeof i17.AjfReportBuilderWidgetToolbarButton, typeof i18.AjfReportBuilderWidgetsRowButtons, typeof i19.AjfReportBuilderWidgetsToolbar, typeof i20.AjfReportBuilder, typeof i21.AjfImageFilterPipe], [typeof i22.CommonModule, typeof i23.FormsModule, typeof i24.DragDropModule, typeof i25.MatButtonModule, typeof i26.MatButtonToggleModule, typeof i27.MatCardModule, typeof i28.MatDialogModule, typeof i29.MatGridListModule, typeof i30.MatIconModule, typeof i31.MatListModule, typeof i32.MatSelectModule, typeof i33.MatSidenavModule, typeof i34.MatSlideToggleModule, typeof i35.MatSliderModule, typeof i36.MatTabsModule, typeof i37.MatToolbarModule, typeof i38.MatTooltipModule, typeof i39.TranslateModule, typeof i40.ColorPickerModule, typeof i41.AjfCommonModule, typeof i42.AjfImageModule, typeof i43.AjfMapModule, typeof i44.AjfMonacoEditorModule, typeof i45.AjfTableModule, typeof i46.AjfTextModule], [typeof i20.AjfReportBuilder]>;
}

export declare class AjfReportBuilderService {
    get colors(): Observable<string[]>;
    get columnWidthChanged(): EventEmitter<void>;
    columnWidthChangedEmitter: EventEmitter<void>;
    get conditionNames(): Observable<AjfFormVariables[]>;
    get contentStyles(): Observable<AjfStyles>;
    get contentWidgets(): Observable<AjfWidgetsContainer>;
    get currentWidget(): Observable<AjfWidget | null>;
    get customWidgets(): Observable<AjfCustomWidget[]>;
    get emptyContent(): Observable<boolean>;
    get fixedZoom(): Observable<boolean>;
    get footerStyles(): Observable<AjfStyles>;
    get footerWidgets(): Observable<AjfWidgetsContainer>;
    get formsVariables(): Observable<AjfFormVariables[]>;
    get getSaveReport(): Observable<any>;
    get headerStyles(): Observable<AjfStyles>;
    get headerWidgets(): Observable<AjfWidgetsContainer>;
    get iconSets(): AjfReportIcons;
    get onDragEnter(): Observable<any>;
    get onDragged(): Observable<any>;
    get onOver(): Observable<any>;
    get origin(): Observable<string>;
    get report(): Observable<AjfReport | null>;
    get reportForms(): Observable<AjfForm[]>;
    get reportSaved(): Observable<AjfReport>;
    get reportStyles(): Observable<AjfStyles>;
    constructor(reportsConfig: AjfReportsConfig);
    addChartBackgroundColor(color: string): void;
    addChartBorderColor(color: string): void;
    addColumn(): void;
    addContentWidget(widget: AjfWidget, position?: number): void;
    addCustomColor(color: string): void;
    addCustomWidgets(widget: AjfCustomWidget, position?: number): void;
    addHeaderWidget(widget: AjfWidget, position?: number): void;
    addToColumn(event: any, toColumn: AjfColumnWidget, position?: number): void;
    addToContent(newWidget: AjfWidget, idx: number): void;
    addfooterWidget(widget: AjfWidget, position?: number): void;
    changeColumn(from: number, to: number, layoutWidget: AjfLayoutWidget): void;
    changeLabelCustomWidget(label: string, position: number): void;
    changePositionOnColumn(event: any, toColumn: AjfColumnWidget, toIndex: number): void;
    dragEnded(): void;
    dragEnter(array: string, index: number): void;
    dragLeave(): void;
    dragStarted(): void;
    extractLabelsNodes(nodes: AjfNode[]): any;
    extractNamesNodes(nodes: AjfNode[]): any;
    extractTypesNodes(nodes: AjfNode[]): any;
    fillFormsVariables(forms: AjfForm[]): AjfFormVariables[];
    filterNodes(nodes: AjfNode[]): AjfNode[];
    fixedColumn(idx: number): void;
    fixedZoomIn(): void;
    fixedZoomOut(): void;
    getFormulaToHtmlEvent(): Observable<string>;
    instantColumnValue(newValue: number, idx: number): void;
    isNumber(value: any): boolean;
    isNumberArray(value: any[]): boolean;
    overEnded(): void;
    overStarted(): void;
    parseColor(cssStyles: any, colors: string[]): void;
    popJsonStack(): string | undefined;
    pushJsonStack(json: string): void;
    remove(node: string, idx: number): void;
    removeChartBackgroundColor(idx: number): void;
    removeChartBorderColor(idx: number): void;
    removeData(_mainIndex: number, _index: number): void;
    removeMainData(_idx: number): void;
    removeRelatedData(_mainIdx: number, _idx: number): void;
    removeTableMainData(index: number): void;
    removeWidgetToColumn(column: AjfColumnWidget, index: number): void;
    resetCustomWidgets(): void;
    roundTo(value: number, decimalPositions: number): number;
    saveChartFormula(_label: string, _level: number, _mainIndex: number, _index: number, formulaText: string, aggregationType: number): void;
    saveCondition(conditionText: string): void;
    saveFormulaToHtml(htmlFormula: string, reference: any): void;
    saveImageFormula(formula: AjfFormula): void;
    saveReport(): void;
    saveTableFormula(_label: string, aggregationType: number, formulaText: string, _mainIndex: number, _index: number): void;
    setChartBackgroundColor(colors: string[]): void;
    setChartBorderColor(colors: string[]): void;
    setChartBorderWidth(value: number): void;
    setChartType(type: number): void;
    setEmptyContent(val: boolean): void;
    setFlag(value: string): void;
    setIcon(icon: {
        fontSet: string;
        fontIcon: string;
    }): void;
    setImageUrl(imageUrl: string): void;
    setOrigin(origin: string): void;
    setReport(report: AjfReport): void;
    setReportForms(forms: AjfForm[]): void;
    setReportStyles(label: string, value: string): void;
    setSaveReport(json: any): void;
    setSectionStyles(origin: string, label: string, value: string): void;
    setWidgetStyles(label: string, value: string | string[]): void;
    unfixedColumn(idx: number): void;
    updateArrayWidgets(type: string, newWidget: AjfWidgetsContainer): void;
    updateCurrentWidget(newWidget: AjfWidget | null): void;
    static ɵfac: i0.ɵɵFactoryDef<AjfReportBuilderService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<AjfReportBuilderService>;
}

export interface AjfReportsConfig {
    icons?: AjfReportIcons;
}
