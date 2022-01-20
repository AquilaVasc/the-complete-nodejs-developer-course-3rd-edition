const yargs = require('yargs');
const notesController = require('./notes');

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
    handler(argv) {
        notesController.addNote(argv.title, argv.body);
    }
});

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesController.removeNote(argv.title);
    }
})

//Create list command
yargs.command({
    command: 'list',
    describe: 'Presents the list of notes',
    handler() {
        notesController.listNotes();
    }
})

yargs.parse();