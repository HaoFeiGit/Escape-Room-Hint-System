const express = require('express')
const router = express.Router()
const theme = require('../controllers/themes')
const multer = require('multer')
const { storage } = require('../cloudinary') // storage has my cloudinary credentials
const upload = multer({ storage }) // store in cloudinary
// const upload = multer({ dest: 'uploads/' }) // if store locally

// from ---> app.use('/themes',themeRoutes)
router.route('/')
    .get(theme.index)
    .post(upload.single('themeImage'), theme.newThemePost)
router.get('/new', theme.newThemeGet)
router.get('/:id/edit', theme.editThemeGet)
router.route('/:id')
    .get(theme.showTheme)// view theme and view puzzles for each theme here
    .put(upload.single('themeImage'), theme.editThemePut)
    .delete(theme.deleteTheme)
module.exports = router











