const toDoItemsModel = require('../models/todo')

//add  item
const addItem = async(req, res) => {
        try {
            const newItem = new toDoItemsModel({
                item: req.body.item,
                statue: req.body.statue
            })
            const saveItem = await newItem.save()
            res.status(200).json(saveItem)

        } catch (err) {
            res.json(err)
        }
    }
    //list all items
const getItem = async(req, res) => {
        try {
            const allItems = await toDoItemsModel.find({});
            res.status(200).json(allItems);
        } catch (error) {
            res.json(error);
        }
    }
    // update items
const putItem = async(req, res) => {
    try {
        const updateItem = await toDoItemsModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json('Item updated')
    } catch (error) {
        res.json(error)
    }
}

//delete item from data base

const deleteItem = async(req, res) => {
    try {
        const deleteOneItem = await toDoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Item Deleted')

    } catch (error) {
        res.json(error)
    }
}

//delete all

const deleteAll = async(req, res) => {
    try {
        const deleteAllItem = await toDoItemsModel.deleteMany({})
        res.status(200).json('Database cleared')

    } catch (error) {
        res.json(error)
    }
}

module.exports = { addItem, getItem, putItem, deleteItem, deleteAll };