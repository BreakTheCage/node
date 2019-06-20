const fs = require('fs');
const chalk = require('chalk');
const log = console.log;

// addNote(title, body){
const addNote = (title, body) =>{
    const notes = loadNotes();

    //first match that found don't continue for other el in the list
    const duplicateNote = notes.find(note =>note.title === title);

    debugger

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        log(chalk.inverse('Title: ') + chalk.bgGreen(title));
        log(chalk.inverse('Body: ') + chalk.bgGreen(body));
    }else{
        log(chalk.yellow.inverse('Note did not Added, because it has Duplicate title...'));
    }
}

const removeNote = (noteTitle) => {
    const notes = loadNotes();

    const cleanNotes = notes.filter(note => note.title !== noteTitle);

    if(notes.length > cleanNotes.length){
        log(chalk.inverse.red((notes.length -cleanNotes.length) + ' note deleted with the title: ' + noteTitle));
        saveNotes(cleanNotes);
    }else{
        log(chalk.inverse('Note with the title: '+ noteTitle + " not found!"));
    }   
}

const listNotes = () => {
    const notes = loadNotes();
    log(chalk.green.inverse('Your notes:'));
    notes.forEach(note => {
        log(chalk.yellow.inverse(note.title));
    });
}

const readNote = (noteTitel) => {
    const notes = loadNotes();
    const wantedNote = notes.find(note => note.title === noteTitel);
    if(wantedNote){
        log(chalk.inverse(wantedNote.title));
        log(chalk.green.inverse(wantedNote.body));
    }else{
        log(chalk.red.inverse('Note is not find!'));
    }
}

const loadNotes = () => {
    try {
        //read json object from a file
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        const dataJs = JSON.parse(dataJson);
        return dataJs;
    } catch (error) {
        return [];
    }
    
}
const saveNotes = ( notesJs) =>{
    try {
        //convert js object to json
        const notesJSON = JSON.stringify(notesJs);
        //write json object on file
        fs.writeFileSync('notes.json', notesJSON);  
    } catch (error) {
        log(chalk.red('Uncatched error: '+ error));
    }
}


module.exports = {
    // getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};