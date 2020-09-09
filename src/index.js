const express = require('express');
const { swaggerConfig } = require('./middlewares/swagger');
const routes = require('./routes.js');
const { PORT } = require('./helper/settings');

const app = express();
const port = PORT || 3000;

app.use(express.json());
app.use(routes);
app.use(...swaggerConfig);

app.get('/', (req, res) => res.json('Health check ok'));

app.listen(port, () => console.log('App running on port', port));