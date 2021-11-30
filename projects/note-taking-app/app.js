const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes');

// Customize yargs
yargs.version('17.2.1');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: () => {
        console.log('Adding new note');
    }
});

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: () => {
        console.log('Removing the note');
    }
})

//Create read command
yargs.command({
    command: 'read',
    describe: 'Reads a note',
    handler: () => {
        console.log('Reading the note')
    }
})

//Create list command
yargs.command({
    command: 'list',
    describe: 'Presents the list of notes',
    handler: () => {
        console.log(getNotes());
    }
})

console.log(yargs.argv);