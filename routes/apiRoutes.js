const router = require('express').Router();

//link module to create a universal unique identifier
const uuid = require('../helpers/uuid.js')
//File System module allows for certein functions like .appendFile()
const fs = require('fs');
//util module give access to utility functions
const util = require('util');
//link our Database module
const notes = require('../db/db.json');


const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parseData = JSON.parse(data);
            //convert to object and push content into writeToFile
            parseData.push(content);
            //takes data and converts to a file 
            writeToFile(file, parseData);
        }
    });
}

const writeToFile = (destination, content) => {
    //tale data-Convert to JSON object-Store it under content
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.info(`\nData written to ${destination}`);
        }
    });
}



router.get('/', (req, res)=> {
    //get all routes from the DB
    //res.json(`Got your ${req.method} request`);
    const dataString = fs.readFileSync('./db/db.json', 'utf-8');
    res.json(JSON.parse(dataString))
})

router.post('/', (req, res)=> {
    //add a note to the DB
    res.json(`Got your ${req.method} request`);

    const { title, text} = req.body;
    if (title && text) {
        const newNote ={
            title, text, id:uuid()
        };
        readAndAppend(newNote, './db/db.json');
    }else {
        console.log('Error: both title and text required');
    }

    const currentNoes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    fs.writeFileSync('./db/db.json', JSON.stringify(currentNotes));

});

module.exports = router;