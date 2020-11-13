const { Router } = require('express');
const express = require ('express');
const router = express.Router();
// MODEL
const Task = require('../models/Task');
// CREATE
router.post('/', async (req, res)=>{
    let name = req.body.task;
    let task = new Task({
        task: name
    })
    res.json(await task.save())
});
// READ
router.get('/', (req,res)=>{
  Task.find().then(tasks => res.json(tasks));
});
// UPDATE
router.put('/:id', async (req,res) =>{
    let id = req.params.id;
    let name = req.body.task;
    let status = req.body.status;
    let task = await Task.updateOne({_id: id},{
        task: name,
        status: status
    })
    res.json(task);
})
// DELETE
router.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let task = await Task.deleteOne({_id:id});
    res.json(task)
} );

module.exports = router;
