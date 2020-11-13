const { Router } = require('express');
const express = require('express');
const router = express.Router();

const User = require('../models/User');


router.post('/', async (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    let isoperator = req.body.isoperator;
    let user = new User({
        name,
        password,
        email,
        isoperator
        
    })

    res.json(await user.save())
});

router.get('/', (req, res) => {
    User.find().then(users => res.json(users));
});

router.put('/:id', async (req,res) =>{
    let id = req.params.id;
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    let user = await User.updateOne({_id: id},{
       name,
       password,
       email

    })
    res.json(user);
})

//delete

router.delete('/:id', async (req,res) =>{

    let id = req.params.id;
    let user = await User.deleteOne({_id:id});

     res.json(user);
});





module.exports = router;

{/*router.get('/users', async (req,res)=>{
   id.find().then(...id => res.json(id));
    
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

    });


    module.exports = router; */}