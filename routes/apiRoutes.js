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
            console.info(`Data written to ${destination}`);
        }
    });
}



router.get('/', (req, res)=> {
    //get all routes from the DB
    res.json(`Got your ${req.method} request`);
})

router.post('/', (req, res)=> {
    //add a note to the DB
    res.json(`Got your ${req.method} request`);
})

module.exports = router;