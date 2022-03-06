const express = require('express');
const router = new express.Router();
const Task = require('../models/task');


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();

        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});

        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);

        if(!task) {
            return res.status(400).send()
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid properties'
        })
    }

    const { id } = req.params;

    try {
        const task = await Task.findById(id);

        updates.forEach(update => {
            task[update] = req.body[update];
        });

        await task.save();

        if(!task) {
            return res.status(404).send();
        }

        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if(!deletedTask) {
            return res.status(404).send()
        }

        res.status(202).send(deletedTask);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;