// const add = require('./utils');
// const sum = add(5, 3);
// console.log(sum)

const validator = require('validator');
// console.log(validator.isEmail('aquilavasconcelos@hotmail.com'));
// console.log(validator.isURL('aquila.vasconcelos.com'));

const chalk = require('chalk');
const getNotes = require('./notes');

const yourNotes = getNotes();
console.log(yourNotes);

console.log(chalk.green.bold.bgMagenta.inverse('Success!'));