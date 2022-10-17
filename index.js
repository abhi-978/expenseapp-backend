const express = require('express');
const cors = require('cors');
const configureDB = require('./config/database');
const routes = require('./config/routes');
const PORT = 3058;

const app = express();
app.use(express.json());
app.use(cors());

configureDB();
app.use('/', routes);
app.use('/images', express.static('images'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
