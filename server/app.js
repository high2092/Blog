const express = require('express');

const dotenv = require('dotenv');

dotenv.config();

const registerRouter = require('./routes/register');

const { sequelize } = require('./models');
const bodyParser = require('body-parser');


const app = express();

app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');

sequelize.sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공");
  }).catch(err => {
    console.log(err);
  });

app.use(bodyParser.json());

app.use('/register', registerRouter);

app.get('/', (req, res) => {
    res.send('success');
});

app.listen(app.get('port'), () => {
    console.log('대기중');
});