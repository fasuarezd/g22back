const express = require('express')
const router = express.Router()
const { getTareas, setTarea, updateTarea, deleteTarea } = require('../controllers/tareasControllers')
const { protect } = require('../middleware/authMiddleware')

//router.route('/').get(protect, getTareas).post(protect, setTarea)
router.get('/', protect, getTareas)
router.post('/', protect, setTarea)

//router.route('/:id').delete(protect, deleteTarea).put(protect, updateTarea)
router.put('/:id', protect, updateTarea)
router.delete('/:id', protect, deleteTarea)

module.exports = router