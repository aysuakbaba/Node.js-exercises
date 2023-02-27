const { default: chalk } = require('chalk')
const fs = require('fs')

const getNotes = () =>  'Your notes...'

const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if(duplicateNotes.length === 0) {

        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log("New note added.");

    }else{
        console.log("Note title taken!")
    }

     
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const findNote = notes.filter((note) => note.title !== title)

    if(notes.length > findNote.length){
        console.log(chalk.bgGreenBright("Note deleted!"))
        saveNotes(findNote)

    }else{
        console.log(chalk.bgRedBright("No note found!"))
    }
   
}

const listNotes = () => {
    console.log(chalk.blue.inverse("Your Notes..."))

    const notes = loadNotes()
    const list = notes.filter((note) => console.log(note.title))


}

const saveNotes =(notes)=> {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =()=> {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch(e){
        return []
    }

}


module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes
}