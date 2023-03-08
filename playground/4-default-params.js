const greeter = (name = 'user', age) => { // name= 'user' we set default name parameter to user value. This way console won't print this undefined.
    console.log('Hello ' + name)

}


greeter()