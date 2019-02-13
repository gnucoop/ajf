declare var module: {id: string};

declare module 'css-element-queries' {
  export declare class ResizeSensor {
    constructor(element: any, handler: () => void);
    detach(): void;
  }
}
