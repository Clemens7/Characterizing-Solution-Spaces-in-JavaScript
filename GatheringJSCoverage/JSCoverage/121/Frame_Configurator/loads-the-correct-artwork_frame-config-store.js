import { calcPrintSizes } from './calc-print-sizes.js';
import { parseFrameStyle, parseMaterialColor, parseNumberWithDefault, parsePrintSize } from './model-utils.js';
export class FrameConfigStore {
    constructor() {
        this.watchers = [];
        const urlSearchParams = new URLSearchParams(location.href);
        const printSize = urlSearchParams.get('printSize');
        const frameWidth = urlSearchParams.get('frameWidth');
        const matWidth = urlSearchParams.get('matWidth');
        const frameStyle = urlSearchParams.get('frameStyle');
        const matColor = urlSearchParams.get('matColor');
        this.frameConfig = {
            printSize: parsePrintSize(printSize),
            frameWidth: parseNumberWithDefault(frameWidth, 20, 50, 2),
            matWidth: parseNumberWithDefault(matWidth, 0, 100, 0),
            frameStyle: parseFrameStyle(frameStyle),
            matColor: parseMaterialColor(matColor),
        };
    }
    getAndWatch(fn) {
        this.watchers.push(fn);
        fn(this.frameConfig);
    }
    notifyWatchers() {
        this.watchers.forEach(watcher => watcher(this.frameConfig));
    }
    get frameWidth() {
        return this.frameConfig.frameWidth;
    }
    
    
    get matWidth() {
        return this.frameConfig.matWidth;
    }
    
    get printSize() {
        return this.frameConfig.printSize;
    }
    get printSizes() {
        return this.image ? calcPrintSizes(this.image) : null;
    }
    
    
    bindImage(image) {
        this.image = image;
        this.notifyWatchers();
    }
    
    get frameStyle() {
        return this.frameConfig.frameStyle;
    }
}
export const frameConfigStore = new FrameConfigStore();
//# sourceMappingURL=frame-config-store.js.map