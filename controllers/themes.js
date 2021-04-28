const Theme = require('../models/themedb')
const Puzzle = require('../models/puzzledb')
const { cloudinary } = require('../cloudinary') // need for delete destroy
const { findByIdAndDelete } = require('../models/themedb')
// no need to say ../cloudinary/index cuz it's index

module.exports.index = async (req, res) => {
    const themes = await Theme.find({})
    res.render('theme/index', { themes })
}

module.exports.newThemePost = async (req, res) => { // 'themeImage' is the name of the input attribute
    console.log('body!!!', req.body, 'file!!!', req.file) // multer gives req.file. In req.file, also have path and filename
    const theme = new Theme(req.body)
    theme.themeImage.url = req.file.path
    theme.themeImage.filename = req.file.filename
    // theme.themeImage = req.files.map(f => ({ url: f.path, filename: f.filename }))
    await theme.save()
    res.redirect('/themes')
}

module.exports.newThemeGet = (req, res) => {
    res.render('theme/newTheme') // provide a form to submit new theme
}

module.exports.showTheme = async (req, res) => {
    const { id } = req.params
    const theme = await Theme.findById(id).populate('puzzle')
    res.render('theme/showTheme', { theme })
}

module.exports.editThemeGet = async (req, res) => {
    const { id } = req.params
    const theme = await Theme.findById(id)
    res.render('theme/editTheme', { theme })
}

module.exports.editThemePut = async (req, res) => {
    const { id } = req.params
    const theme = await Theme.findByIdAndUpdate(id, req.body)

    theme.themeImage.url = req.file.path
    theme.themeImage.filename = req.file.filename
    await theme.save()
    res.redirect('/themes')
}

module.exports.deleteTheme = async (req, res) => {
    const { id } = req.params
    const theme = await Theme.findByIdAndDelete(id)
    res.redirect('/themes')
}
