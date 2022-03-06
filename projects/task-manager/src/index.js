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

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//     const authToken = jwt.sign({ _id: 'abc123'}, 'thisismynewcourse',{expiresIn: '1 hour'});
//     console.log(authToken)

//     const data = jwt.verify(authToken, 'thisismynewcourse')
//     console.log(data)
// }

// myFunction();