const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true

    },
    email:{
        type:String,
        required: true,
        unique: true,
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
},
tokens: [{
    token: {
        type: String,
        required: true
    }
}]
})

//VIRTUAL PROPERTY(not a property stored in database, it is a relationship between two entities, in this case user and task)
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})



//The Schema.methods object directly to save an instance method.
//Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this,
// so your method will not have access to the document and the above examples will not work.
//Do not declare statics using ES6 arrow functions (=>). 
//Arrow functions explicitly prevent binding this, so the above examples will not work because of the value of this.
userSchema.methods.generateAuthToken = async function () {
    const user = this 
    const token = jwt.sign({ _id: user._id.toString() }, 'thisisaysu')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}


userSchema.methods.toJSON = function () {
    const user = this 
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject

}


userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}


//Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()

})


//Delete user tasks when user is removed
userSchema.pre('remove', async function(next) {
    const user = this 
    await Task.deleteMany({ owner: user._id })
    next()


})

const User = mongoose.model('User', userSchema)

module.exports = User