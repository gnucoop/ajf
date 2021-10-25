import {vfsFonts} from './vfs-fonts';
import {VfsFont, vfsFontsMap} from './vfs-fonts-map';

describe('vfsFonts', () => {
  it('should contain the default fonts', () => {
    const fontNames = Object.keys(vfsFontsMap);
    for (const fontName of fontNames) {
      const font = vfsFontsMap[fontName];
      const styles = Object.keys(font);
      for (const style of styles) {
        const filename = font[style as keyof VfsFont];
        expect(vfsFonts[filename]).toBeDefined();
      }
    }
  });
});
