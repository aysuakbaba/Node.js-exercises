const { default: chalk } = require('chalk')
const fs = require('fs')

const getNotes = function () {
    return 'Your notes...'
}

const addNotes = function(title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })

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

const removeNotes = function(title){
    const notes = loadNotes()
    const findNote = notes.filter(function(note) {
        return note.title !== title
    })

    if(!findNote){
        const chalkMsg = chalk.bgGreenBright("Note deleted!")
        console.log(chalkMsg);
        saveNotes(findNote)

    }else{
        const chalkMsg = chalk.bgRedBright("No note found!")
        console.log(chalkMsg)
    }
   


    // if(findNote !== null){
    //     notes.splice(findNote,1)
    //     saveNotes(notes)
    //     console.log("Note deleted.");

    // }
    // else{
    //     console.log("There is no title matches.");
    // }
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function() {
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
    removeNotes: removeNotes
}