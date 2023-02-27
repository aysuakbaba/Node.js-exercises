const chalk = require('chalk')
const { demandOption, argv } = require('yargs')
const yargs = require('yargs')
const { listNotes } = require('./notes.js')
const notes = require('./notes.js')



// const chalkMsg = chalk.blue.inverse.bold('Hello world!')

// console.log(chalkMsg)

// // fs.writeFileSync('notes.txt' , 'This file was reate bu Node.js!')

// //fs.appendFileSync('notes.txt' , 'Hi, my name is Aysu')

// const fnc = getNotes()
// console.log(fnc)

// Customize yargs version
yargs.version('1.1.0')


// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, //you have to provide it in order for the command work correctly. 
            type: 'string' // we'll always gonna have a string value for the title
        },
        body: {
            describe: 'Note body',
            demandOption:true,
            type: 'string'
    
        }
    },
    
    handler: (argv) => notes.addNotes(argv.title, argv.body)
})

// Create remove command

yargs.command({
    command: 'remove',
    describe: 'Removing the note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption:true,
            type: 'string'
        }
    },
    handler:(argv)=> notes.removeNotes(argv.title)
})

//Create read command 
yargs.command({
    command:'read',
    describe:'Read the note',
    handler:() => console.log('Reading the note')
    
})

// Create list command

yargs.command({
    command:'list',
    describe:'List the notes',
    handler: ()=> notes.listNotes()
})

yargs.parse() // it does the same thing as console.log(yargs.argv), it just donesn't take any arguments
//console.log(yargs.argv)
