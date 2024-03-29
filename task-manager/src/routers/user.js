const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })

    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })

    } catch(e){
        res.status(400).send()

    }

})

router.post('/users/logout', auth, async(req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        }) 
        await req.user.save()
        res.send()

    } catch(e){
        res.status(500).send()

    }

})

router.post('/users/logoutAll', auth, async(req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()

    } catch(e) {
        res.status(500).send()

    }
})

router.get('/users/me',auth, async (req, res) => {
    // try{
    //     const users = await User.find({})
    //     res.status(201).send(users)

    // }catch(e){
    //     res.status(500).send(e)

    // }

    res.send(req.user)

})






router.patch('/users/me',auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try{
        //These 3 line of code below is for UserSchema to work properly.
        updates.forEach((update) => req.user[update] = req.body[update] )
        await req.user.save()


        //commented the line below because UserSchema doesn't work properly.
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true , runValidators:true})
        

        res.send(req.user)


    }catch(e){
        res.status(400).send(e)

    }
})

router.delete('/users/me', auth, async (req,res) => {
    try{
        //Since we use authentication in our code we don't need to check for a user.
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await User.deleteOne({ _id: req.user._id })
        res.send(req.user)

    } catch (e) {
        res.status(500).send(e)


    }
})







module.exports = router