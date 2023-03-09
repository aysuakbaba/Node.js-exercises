const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')


const User = mongoose.model('User', {
    name:{
        type:String,
        required: true,
        trim: true

    },
    email:{
        type:String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }

        }
    },
    age:{
        type:Number,
        default: 0,
        validate(value) {
            if(value<0){
                throw new Error('Age must be a positive')
            }

        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error("Password can't be password")
        }
    }
}

})



// const me = new User({
//     name: '   Aysu',
//     email: 'aysuakbabAA@gmail.COM   ',
//     age: 22,
//     password: 'aysuaaa'

// })


// me.save().then(() =>{
//     console.log(me);

// }).catch((error)=> {
//     console.log('Error!' , error);

// })


const Task = mongoose.model('Task', {
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})


const taskOne = new Task({
    description:'   Learn Mongoose'
   
})


taskOne.save().then(() => {
    console.log(taskOne)

}).catch((error)=>{
    console.log('Error' , error)

})