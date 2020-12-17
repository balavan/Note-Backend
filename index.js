const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const path = require('path');

dotenv.config();

//Express App config
const app = express();
app.use(cors())
app.use(express.json())


//Database Connection
mongoose.connect('mongodb://localhost:27017/dbName', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//Routers
const NoteBookRouter = require('./routes/noteBook');

//Router Middleware
app.use('/api/note', NoteBookRouter);

//Server
app.listen(5022, () => {
    console.log('Server is started');
});

//Index Route
app.get('/check', function (req, res) {
    res.send('Node Js Working Fine');
})

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/noteBackUp/index.html'));
// })