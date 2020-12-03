export interface AjfCondition {
    condition: string;
}

export declare class AjfConditionSerializer {
    static fromJson(json: Partial<AjfCondition>): AjfCondition;
}

export declare type AjfContext = import('@ajf/core/common').AjfContext;

export declare class AjfError extends Error {
    get message(): string;
    get name(): string;
    stack: string;
    constructor(message?: string);
}

export declare class AjfExpressionUtils {
    static UTIL_FUNCTIONS: string;
    static utils: {
        [name: string]: AjfValidationFn;
    };
}

export interface AjfFormula {
    formula: string;
}

export declare class AjfFormulaSerializer {
    static fromJson(json: Partial<AjfFormula>): AjfFormula;
}

export declare type AjfValidationFn = {
    fn: any;
};

export declare function alert(source: any[], property: string, threshold: number): string;

export declare function alwaysCondition(): AjfCondition;

export declare function calculateAvgProperty(source: any[], property: string, range: number, coefficient: number): number;

export declare function calculateAvgPropertyArray(source: any[], properties: string[], range: number, coefficient: number): number[];

export declare function calculateTrendByProperties(source: any[], properties: string[]): string;

export declare function calculateTrendProperty(source: any[], property: string): string;

export declare function createCondition(condition?: Partial<AjfCondition>): AjfCondition;

export declare function createFormula(formula?: Partial<AjfFormula>): AjfFormula;

export declare function dateOperations(dString: string, period: string, operation: string, v: any): string;

export declare const dateUtils: {
    addDays: typeof dateFns.addDays;
    addMonths: typeof dateFns.addMonths;
    addYears: typeof dateFns.addYears;
    endOfISOWeek: typeof dateFns.endOfISOWeek;
    format: typeof dateFns.format;
    getDay: typeof dateFns.getDay;
    parse: typeof dateFns.parseISO;
    startOfMonth: typeof dateFns.startOfMonth;
    startOfISOWeek: typeof dateFns.startOfISOWeek;
};

export declare function decimalCount(x: string | number): number;

export declare function digitCount(x: number): number;

export declare function drawThreshold(source: any[], property: string, threshold: any[]): any[];

export declare function evaluateExpression(expression: string, context?: AjfContext, forceFormula?: string): any;

export declare function extractArray(source: any[], property: string, property2?: string): any[];

export declare function extractArraySum(source: any[], properties: string[]): any[];

export declare function extractDates(source: any[], property: string, fmt: string): string[];

export declare function extractSum(source: any[], properties: string[]): number;

export declare function formatDate(date: Date | string, fmt?: string): string;

export declare function formatNumber(num: number, fmt?: string): string;

export declare function getContextString(context?: AjfContext): string;

export declare function getCoordinate(source: any, zoom?: number): [number, number, number];

export declare function isInt(x: string | number): boolean;

export declare function isoMonth(date: Date, fmt?: string): string;

export declare function lastProperty(source: any, property: string): any;

export declare function neverCondition(): AjfCondition;

export declare function normalizeExpression(formula: string, ancestorsNames: {
    [prop: string]: number;
}, prefix: number[]): string;

export declare function notEmpty(x: any): boolean;

export declare function round(num: number | string, digits: number): number;

export declare function scanGroupField(reps: number, acc: any, callback: any): any;

export declare function sum(array: any[]): any;

export declare function sumLastProperties(source: any[], properties: string[]): number;

export declare function validateExpression(str: string, context?: AjfContext): boolean;

export declare function valueInChoice(array: any[], x: any): boolean;
