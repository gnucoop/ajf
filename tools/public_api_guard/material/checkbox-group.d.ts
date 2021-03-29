export declare class AjfCheckboxGroupModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfCheckboxGroupModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfCheckboxGroupModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfCheckboxGroupModule, [typeof i1.CheckboxGroupItem], [typeof i2.AjfCheckboxGroupModule, typeof i3.CommonModule, typeof i4.MatButtonModule, typeof i5.MatIconModule], [typeof i2.AjfCheckboxGroupModule, typeof i1.CheckboxGroupItem]>;
}

export declare class CheckboxGroupItem<T> extends AjfCoreCheckboxGroupItem<T> {
    constructor(checkboxGroup: AjfCheckboxGroup<T>);
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckboxGroupItem<any>, "ajf-checkbox-group-item", never, {}, {}, never, ["*"]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckboxGroupItem<any>, [{ optional: true; }]>;
}
