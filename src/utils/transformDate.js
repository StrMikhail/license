export const transformDate = (date, separator) => {
    const D = date.$D + 1 < 10 ? `0${date.$D}` : date.$D;
    const M = date.$M + 1 < 10 ? `0${date.$M + 1}` : date.$M + 1;
    const Y = date.$y;
    return `${D}/${M}/${Y}`;
};
