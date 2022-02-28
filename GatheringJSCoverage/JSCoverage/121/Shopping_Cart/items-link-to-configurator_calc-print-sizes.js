export function calcPrintSizes(img) {
    const small = [297, 297];
    const medium = [420, 420];
    const large = [594, 594];
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (h > w) 
    else {
        small[1] = Math.floor(h * small[0] / w);
        medium[1] = Math.floor(h * medium[0] / w);
        large[1] = Math.floor(h * large[0] / w);
    }
    return { S: small, M: medium, L: large };
}
//# sourceMappingURL=calc-print-sizes.js.map