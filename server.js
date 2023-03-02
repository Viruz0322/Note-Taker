const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes')
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));

//create path to note.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.use('/api/notes', apiRoutes)

//Start up the server
app.listen(PORT, () => console.log('Your app is running at http://localhost:${PORT}'))