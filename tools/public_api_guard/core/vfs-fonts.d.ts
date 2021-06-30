export interface VfsFont {
    bold: string;
    bolditalics: string;
    italics: string;
    normal: string;
}

export declare const vfsFonts: {
    [x: string]: string;
};

export declare const vfsFontsMap: VfsFontsMap;

export declare type VfsFontsMap = {
    [key: string]: VfsFont;
};
