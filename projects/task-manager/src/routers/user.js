const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    }catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});

        res.send(users);
    } catch (e) {
        res.status(500).send();
    }

    User.find({}).then((users) => {
        res.send(users);
    }).catch((error) => {
        res.status(500).send();
    });
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id)

        if(!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'});
    }

    const { id } = req.params;

    try {
        const userUpdated = await User.findByIdAndUpdate(id, req.body, { returnDocument: 'after', runValidators: true });

        if(!userUpdated) {
            return res.status(404).send();
        }

        res.status(201).send(userUpdated);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser) {
            return res.status(404).send();
        }

        res.status(202).send(deletedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;