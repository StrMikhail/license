export function downloadFile (blob) {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `license.dat`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
}
