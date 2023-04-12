export const transformDate = (date, separator) => {
    const newDate = date.toISOString().split('T')[0];
    return newDate.split('-').reverse().join('/');
};
