const log = console.log;
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js')
 
const green = msg => log(chalk.bgGreen(msg));
const white = msg => log(chalk.inverse(msg));
const red = msg => log(chalk.red.inverse.bold(msg));
const blue = msg => log(chalk.blue.inverse.bold(msg));

//add, remove, read, list
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note tilte',
            demandOption: true,
            type: "string"
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    } 
})
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note tilte to remove',
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})
yargs.command({
    command: 'list',
    describe: 'List all note',
    handler() {
        notes.listNotes()
    }
})
yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            describe: 'Note tilte to read',
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
})



//customize yargs version
yargs.version('1.1.0')
yargs.parse();
//log(yargs.argv);



