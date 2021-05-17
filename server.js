const express = require('express')
const app = express()
const PORT = 3005;
const Sequelize = require('sequelize');
const { List, Items } = require('./models');
const _ = require("lodash");
const path = require('path')
const ejs = require('ejs');


app.use(express.static(path.join(__dirname, 'client')))
app.set('views', path.join(__dirname, 'client/views'))
app.set('view engine', 'ejs');


app.use(express.json())
app.use(express.urlencoded())


app.get('/', async (req, res) => {
    const lists = await List.findAll();
    res.render('home', {
        showLists: lists
    })
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
        res.send({newItem, redirectUrl: '/list/' + listId});
    } catch (error) {
        console.log(error)
    }
})

// create new list
app.post('/', async (req, res) => {
    try{
        const { title } = req.body
        const newList = await List.create({
            title
        });
        res.send({newList, redirectUrl: '/'})
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
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

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
})