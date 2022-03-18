const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// Authomatically pass incoming json to an object
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('server is up on port ' + port);
})

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('622bfb964b8ca40e7a012c9e');
    // await task.populate('owner');

    // console.log(task.owner);

    const user = await User.findById('622bfb7d4b8ca40e7a012c98')

    if(user) {
        await user.populate('tasks')
        console.log(user.tasks)
    }
}

main();