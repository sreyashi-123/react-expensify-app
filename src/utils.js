console.log('utils.js is running');

export const square = (x) => x * x;

export const add = (a, b) => a + b;

export default (a,b) => a - b;

//export { square,  add, subtract as default };//have to export the file that we want to import in other js files.