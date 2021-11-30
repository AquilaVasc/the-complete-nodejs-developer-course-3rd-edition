const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes');

// Customize yargs
yargs.version('17.2.1');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'That takes the note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log('Title: ' + argv.title);
        console.log('Body: ' + argv.body);
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

yargs.parse();