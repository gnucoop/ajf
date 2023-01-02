import {default as esMain} from 'es-main';
import {readFileSync, writeFileSync} from 'fs';

export const patchIonicons = () => {
  const patchFile = 'node_modules/ionicons/dist/types/components.d.ts';

  const content = readFileSync(patchFile, 'utf-8')
    .replace('"ariaHidden"?: string', '"ariaHidden": string|null')
    .replace('"ariaLabel"?: string', '"ariaLabel": string|null');
  writeFileSync(patchFile, content);
};

if (esMain(import.meta)) {
  patchIonicons();
}
