export declare class AjfCheckboxGroupModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfCheckboxGroupModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfCheckboxGroupModule, [typeof i1.CheckboxGroupItem], [typeof i2.AjfCheckboxGroupModule, typeof i3.CommonModule, typeof i4.MatButtonModule, typeof i5.MatIconModule], [typeof i2.AjfCheckboxGroupModule, typeof i1.CheckboxGroupItem]>;
}

export declare class CheckboxGroupItem<T> extends AjfCoreCheckboxGroupItem<T> {
    constructor(checkboxGroup: AjfCheckboxGroup<T>);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<CheckboxGroupItem<any>, "ajf-checkbox-group-item", never, {}, {}, never, ["*"]>;
    static ɵfac: i0.ɵɵFactoryDef<CheckboxGroupItem<any>, [{ optional: true; }]>;
}
