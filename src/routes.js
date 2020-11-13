const express = require('express');
const routes = express.Router();
const controller = require('./controller/UsuariosControlles')


routes.post('/createUser/create', (req, res) => {
    controller.createUser(req.body)
        .then(result => res.send(result))
        .catch(err => console.error(err));

})
routes.get('/usuarios', (req, res) => {
    controller.readUsers()
        .then(result => res.send(result))
        .catch(err => console.error(err));

})

routes.put('/usuarios/update/:id', (req, res) => {
      res.json({
        params: req.params, 
        body: req.body
      });
})



module.exports = routes;
