const express = require('express');
const { sequelize } = require('./models');

const app = express();

app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');

sequelize.sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공");
  }).catch(err => {
    console.log(err);
  });

app.get('/', (req, res) => {
    res.send('success');
});

app.listen(8001, () => {
    console.log('대기중');
});