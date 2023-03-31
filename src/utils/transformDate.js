export const transformDate = (date, separator) => {
    const newDate = date.toISOString().split('T')[0];
    return newDate.split('-').reverse().join('/');
    // const D = date.$D + 1 < 10 ? `0${date.$D}` : date.$D;
    // const M = date.$M + 1 < 10 ? `0${date.$M + 1}` : date.$M + 1;
    // const Y = date.$y;
    // return `${D}/${M}/${Y}`;
};
