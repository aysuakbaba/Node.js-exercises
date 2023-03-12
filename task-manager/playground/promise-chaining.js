require('../src/db/mongoose')
const User = require('../src/models/user')




const findUserByIdAndUpdate = async(id, age) => {
    const user= await User.findByIdAndUpdate(id, {age})

    const count =  await User.countDocuments({age})
    return count
}


findUserByIdAndUpdate('6409a5292f0cc76f9a4b2140', 22).then((result) => {
    console.log(result)

}).catch((e) => {
    console.log(e)

})