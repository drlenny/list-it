const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const Sequelize = require('sequelize');
const { List, Items } = require('./models');
const path = require('path');
const ejs = require('ejs');

app.use(express.static(path.join(__dirname, '/client')))
app.set('views', path.join(__dirname, 'client/views'))
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded())

let port = process.env.PORT;

if (port == null || port == "") {
    port = 3001;
}

const pg = require('pg');

app.get('/', async (req, res) => {
    try{
        const lists = await List.findAll();
        res.render('home', {
            showLists: lists
        })
    } catch (error){
        console.log(error);
    }

})

// app.get('/index', function(req, res){
//     res.render('index')
// })

// get page with items
app.get('/list/:listId', async (req, res) => {
    const requestedListId = req.params.listId
    // console.log(req.path);
    const path = req.path
    const items = await Items.findAll({
        where: {
            listId: requestedListId
        }
    });

    const listTitle = await List.findByPk(requestedListId);

    res.render('list', {
        path: path,
        listId: requestedListId,
        listTitle: listTitle,
        newListItems: items
    })
    // console.log(items);
})

// create new item for list
app.post('/list', async (req, res) => {
    try {
        const { item, listId } = req.body
        const newItem = await Items.create({
            item,
            listId
        });
        res.send({ newItem });
    } catch (error) {
        console.log(error)
    }
})

// create new list
app.post('/', async (req, res) => {
    try {
        const { title } = req.body
        const newList = await List.create({
            title
        });
        res.send({ newList })
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

// delete item from list
app.post('/list/delete/:id', async (req, res) => {
    try {
        var listId = req.body.listId
        await Items.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/list/" + listId)
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
})

//delete list
app.post('/delete/:id', async (req, res) => {
    try {
        await List.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

// // -------TESTING CODE-------------//
// app.get('/index', async (req, res) => {
//     res.render('index')
// })
// app.get('/ping', (req, res) => {
//     //res.send(JSON.stringify('pong')
//     res.json('pong')
// })
// app.post('/list', async (req, res) => {
//     try{
//         const { title } = req.body
//         const newList = await List.create({
//             title
//         });
//         res.send({newList, redirectUrl: '/'})
//     } catch (error) {
//         console.log(error)
//         res.sendStatus(500);
//     }
// })



app.listen(port, function () {
    console.log(`Server started on ${port} succesfully`);
});
