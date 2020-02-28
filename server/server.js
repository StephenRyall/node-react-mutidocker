"use strict";
//require('./config')
const express = require('express')
const app = express()
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config({ path: '../.env' })
const jsonfile = require('jsonfile')
const port = process.env.APP_SERVER_PORT || 8000;
const host = process.env.API_HOST;
const store = path.join(__dirname, '/store.json')
const publicPath = path.join(__dirname, "public");

if (process.env.NODE_ENV === 'development') {
    console.log("running as usual");
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/gettodos', (req, res) => {
    try {
        jsonfile.readFile(store, (err, obj) => {
            if (err) console.log("json read error => ", err)
            res.status(200).send(obj);
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.post('/addtodo', (req, res) => {
    try {
        var todo = res.req.body.todo;
        jsonfile.readFile(store, (err, obj) => {
            if (err) console.log("json read error => ", err)
            obj.todos.push(todo)
            var augObj = {
                todos: obj.todos
            };
            jsonfile.writeFile(store, augObj, (err) => {
                if (err) console.error(err)
                res.status(201).send({ message: "the todo was added!" })
            })
        })
    } catch (error) {
        console.log("error for adding a todo", error)
        res.status(400).send(error)
    }
})

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});


app.listen(port, () => console.log(`Running on port: ${port}`));