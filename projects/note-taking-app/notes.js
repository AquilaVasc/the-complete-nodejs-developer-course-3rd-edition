const fs = require('fs');
const chalk = require('chalk');

const listNotes = () => {
    console.log(chalk.bgBlue.yellow.inverse('Your notes'));
    loadNotes().forEach((note) => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    const note = findNote(title);

    if(!!note){
        console.log(chalk.inverse(note.title))
        console.log(note.body);
    }else{
        console.log(chalk.red('note not found'));
    }
}

const findNote = (title) => {
    const notes = loadNotes();
    return notes.find(note => note.title === title);
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = findNote(title)

    if(!duplicateNote){
        notes.push({
            title,
            body
        });
        saveNotes(notes);
        console.log(chalk.bgGreen('new note added'))
    }else{
        console.log(chalk.bgRed('note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    if(notes.length === notesToKeep.length){
        console.log(chalk.bgRed('no note found'))
    }else{
        saveNotes(notesToKeep);
        console.log(chalk.bgGreen('note removed'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
}

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}