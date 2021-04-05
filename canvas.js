export const canvas = document.createElement('canvas');
export const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;