const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({ 
        ...req.body, 
        owner: req.user._id
    });

    try {
        await task.save();

        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt_asc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const completed = req.query.completed;
    
    const sort = {}
    const sortBy = req.query.sortBy;

    if (completed) {
        match.completed = completed === 'true'
    }

    if (sortBy) {
        const parts = sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
               limit: parseInt(req.query.limit),
               skip: parseInt(req.query.skip),
               sort
            }
        });
        const tasks = req.user.tasks;

        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOne({_id: id, owner: req.user._id})

        if(!task) {
            return res.status(404).send()
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
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
        const task = await Task.findOne({ _id: id, owner: req.user._id});

        if(!task) {
            return res.status(404).send();
        }

        updates.forEach(update => {
            task[update] = req.body[update];
        });

        await task.save();

        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findOneAndDelete({ _id: id, owner: req.user._id });

        if(!deletedTask) {
            return res.status(404).send()
        }

        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;