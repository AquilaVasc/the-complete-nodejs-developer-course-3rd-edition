require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('620c26e485ee133852430b05').then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// });

const deleteTaskAndCout = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });

    return count;
}

deleteTaskAndCout('621168e93de040a821a5ce61').then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
});