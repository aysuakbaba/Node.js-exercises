require('../src/db/mongoose')
const Task = require('../src/models/task')


Task.findByIdAndDelete('640997c1b923dfea6d88abef').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})

}).then((result) => {
    console.log(result)

}).catch((e) => {
    console.log(e)

})