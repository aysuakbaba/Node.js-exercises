const mongoose = require('mongoose')


const Task = mongoose.model('Task', {
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' //we use ref to connect user attributes to the task model. 'User' came from the user.js model which we define it like this --> const User = mongoose.model('User', userSchema)
    }
})

module.exports = Task