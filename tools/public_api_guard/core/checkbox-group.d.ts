export declare const AJF_CHECKBOX_GROUP_VALUE_ACCESSOR: any;

export declare class AjfCheckboxGroup<T> implements AfterContentInit, ControlValueAccessor {
    readonly change: Observable<AjfCheckboxGroupChange<T>>;
    checkboxes: AjfCheckboxGroupItem<T>[];
    get disabled(): boolean;
    set disabled(value: boolean);
    get name(): string;
    set name(value: string);
    onTouched: () => any;
    get selected(): AjfCheckboxGroupItem<T>[];
    set selected(selected: AjfCheckboxGroupItem<T>[]);
    get value(): T[];
    set value(newValue: T[]);
    addValue(value: T): void;
    ngAfterContentInit(): void;
    registerItem(item: AjfCheckboxGroupItem<T>): void;
    registerOnChange(fn: (value: T[]) => void): void;
    registerOnTouched(fn: any): void;
    removeValue(value: T): void;
    writeValue(value: T[]): void;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AjfCheckboxGroup<any>, "ajf-checkbox-group,[ajf-checkbox-group]", never, { "value": "value"; "name": "name"; "disabled": "disabled"; }, { "change": "change"; }, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfCheckboxGroup<any>, never>;
}

export declare class AjfCheckboxGroupChange<T> {
    source: AjfCheckboxGroup<T>;
    value: any;
}

export declare class AjfCheckboxGroupItem<T> implements OnInit {
    readonly change: Observable<AjfCheckboxGroupItemChange<T>>;
    readonly checkboxGroup: AjfCheckboxGroup<T>;
    readonly checkboxId: Observable<string>;
    get checked(): boolean;
    set checked(checked: boolean);
    get checkedIcon(): string;
    set checkedIcon(icon: string);
    readonly checkedState: Observable<boolean>;
    get disabled(): boolean;
    set disabled(disabled: boolean);
    readonly disabledState: Observable<boolean>;
    readonly icon: Observable<string>;
    set id(id: string);
    name: string;
    get notCheckedIcon(): string;
    set notCheckedIcon(icon: string);
    get value(): T;
    set value(value: T);
    constructor(checkboxGroup?: AjfCheckboxGroup<T>);
    ngOnInit(): void;
    onInputChange(event: Event): void;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AjfCheckboxGroupItem<any>, never, never, { "id": "id"; "name": "name"; "checked": "checked"; "disabled": "disabled"; "value": "value"; "checkedIcon": "checkedIcon"; "notCheckedIcon": "notCheckedIcon"; }, { "change": "change"; }, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfCheckboxGroupItem<any>, never>;
}

export declare class AjfCheckboxGroupItemChange<T> {
    source: AjfCheckboxGroupItem<T>;
    value: any;
}

export declare class AjfCheckboxGroupModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfCheckboxGroupModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfCheckboxGroupModule, [typeof i1.AjfCheckboxGroup], [typeof i2.FormsModule], [typeof i1.AjfCheckboxGroup]>;
}
