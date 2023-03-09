const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')


const User = mongoose.model('User', {
    name:{
        type:String

    },
    age:{
        type:Number
    }
})


// const me = new User({
//     name: 'Aysu',
//     age: 'a'
// })


// me.save().then(() =>{
//     console.log(me);

// }).catch((error)=> {
//     console.log('Error!' , error);

// })


const Task = mongoose.model('Task', {
    description:{
        type:String
    },
    completed:{
        type:Boolean
    }
})


const taskOne = new Task({
   description: 'Learn Mongoose',
   completed: false
})


taskOne.save().then(() => {
    console.log(taskOne)

}).catch((error)=>{
    console.log('Error' , error)

})