const {
    Router
} = require('express');

const controller = require('./controllers/controller');

const routes = Router();

routes.get('/getUser', (req, res) => controller.getUSer()
    .then(result => res.send(result))
    .catch(error => console.error(error))
);

routes.post('/createUser', (req, res) => controller.createUSer(req.body)
    .then(result => res.send(result))
    .catch(error => console.error(error))
);

routes.put('/updateUser/:id', (req, res) => controller.updateUser(req.params, req.body)
    .then(result => res.send(result))
    .catch(error => console.error(error))
);

routes.delete('/deleteUser/:id', (req, res) => controller.deleteUser(req.params)
    .then(result => res.send(result))
    .catch(error => console.error(error))
);

module.exports = routes;