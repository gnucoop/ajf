export declare class AjfJsonValidationModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfJsonValidationModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfJsonValidationModule, never, never, never>;
}

export declare class AjfJsonValidator {
    constructor();
    validate(type: 'form' | 'report', json: object | string, options?: {
        strict?: boolean;
        version?: string;
    }): AjfJsonValidatorResult;
    static ɵfac: i0.ɵɵFactoryDef<AjfJsonValidator, never>;
    static ɵprov: i0.ɵɵInjectableDef<AjfJsonValidator>;
}

export interface AjfJsonValidatorError {
    error: ErrorObject;
    message: string;
}

export interface AjfJsonValidatorResult {
    errors?: AjfJsonValidatorError[];
    valid: boolean;
}
