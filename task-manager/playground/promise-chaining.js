require('../src/db/mongoose')
const User = require('../src/models/user')


User.findByIdAndUpdate('64099c5b6c63c34e3ddf19b9', {
    age: 22
}).then((user) => {
    console.log(user)
    return User.countDocuments({age: 22})
}).then((result) => {
    console.log(result)  

}).catch((e) => {
    console.log(e)

})