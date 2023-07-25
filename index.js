require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');

const fruits = require("./fruits");
let id = 100;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello fruity!");
});

app.get('/fruits', (req, res) => {
    res.send(fruits);
});

app.get('/fruits/:name', (req, res) => {
    // My solution
    // const name = req.params.name.toLowerCase();

    // for (let i = 0; i < fruits.length; i++) {
    //     if (name === fruits[i].name.toLowerCase()) {
    //         return res.send(fruits[i]);
    //     }
    // }

    // res.status(404).send(`There is no such fruit as ${req.params.name}! Try another one!`)

    // Teacher's solution
    const name = req.params.name.toLowerCase();

    const fruit = fruits.find(fruit => fruit.name.toLowerCase() === name);
    fruit === undefined ? res.status(404).send("This fruit doesn't exist") : res.send(fruit)    
});

app.post('/fruits', (req, res) => {
    const name = req.body.name.toLowerCase();

    const fruit = fruits.find(fruit => fruit.name.toLowerCase() === name);
    if (fruit === undefined) {
        req.body.id = id++;
        fruits.push(req.body);
        res.status(201).send(req.body);
    } else {
        res.status(409).send("This fruit already exists");
    }
});

app.delete('/fruits', (req, res) => {
    const name = req.body.name.toLowerCase();

    const fruitIndex = fruits.findIndex(fruit => fruit.name.toLowerCase() === name);
    if (fruitIndex === -1) {
        res.status(404).send("This fruit doesn't exist");
    } else {
        fruits.splice(fruitIndex, 1);
        res.status(204);
    }
});

app.patch('/fruits', (req, res) => {
    const name = req.body.name.toLowerCase();

    const fruitIndex = fruits.findIndex(fruit => fruit.name.toLowerCase() === name);
    if (fruitIndex === -1) {
        res.status(404).send("This fruit doesn't exist");
    } else {
        fruits[fruitIndex] = req.body;
        res.status(200).send("Fruit was updated");
    }
})


app.listen(port, () => console.log(`App running on port ${port}`));

// prevent duplicates
// unique id, you pass, not user
// what are status codes (created, or not, etc)
// user cannot put anything else then name
// delete fruit
// update fruit
