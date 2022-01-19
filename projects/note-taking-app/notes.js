const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return loadNotes();
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(note => note.title === title)

    if(duplicateNotes.length === 0){
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
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}