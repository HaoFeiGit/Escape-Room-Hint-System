const express = require('express')
const router = express.Router({ mergeParams: true }); // otherwise won't see theme id
const puzzle = require('../controllers/puzzles')
const multer = require('multer')
const { storage } = require('../cloudinary') // storage has my cloudinary credentials
const upload = multer({ storage }) // store in cloudinary
// const upload = multer({ dest: 'uploads/' }) // if store locally

// from ---> app.use('/themes/:id/p',puzzleRoutes)
router.get('/newPuzzle', puzzle.newPuzzleGet)
router.post('/', upload.single('puzzleImage'), puzzle.newPuzzlePost)
router.get('/:puzzleId/edit', puzzle.editPuzzleGet) // edit puzzle render form
router.route('/:puzzleId')
    .get(puzzle.showPuzzle) // view puzzle
    .put(upload.single('puzzleImage'), puzzle.editPuzzlePut) // edit puzzle put
    .delete(puzzle.deletePuzzle)

module.exports = router