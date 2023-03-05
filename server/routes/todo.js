const router = require('express').Router();



const controller = require('../controllers/controller')


router.get('/api', (req, res) => res.json({ message: "work" }))


router.get('/api/items', controller.getItem)
router.post('/api/item', controller.addItem)
router.put('/api/item/:id', controller.putItem)
router.delete('/api/item/:id', controller.deleteItem)
router.delete('/api/item', controller.deleteAll)

module.exports = router;