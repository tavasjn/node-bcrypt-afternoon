require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController');
const treasureCtrl = require('./controllers/treasureController');



const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const app = express();

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('database connected')
})

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 *60}
}))

// EndPoints //

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

// Treasure endpoint // 
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure);





const port = SERVER_PORT
app.listen(port, () => console.log(`Magic on port: ${port}`))