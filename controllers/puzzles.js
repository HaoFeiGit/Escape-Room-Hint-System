const Puzzle = require('../models/puzzledb')
const Theme = require('../models/themedb')
const { cloudinary } = require('../cloudinary') // need for delete destroy
// no need to say ../cloudinary/index cuz it's index

module.exports.newPuzzleGet = async (req, res) => {
    const { id } = req.params
    const theme = await Theme.findById(id)
    res.render('puzzle/newPuzzle', { theme }) // provide a form to submit new puzzle
}

module.exports.newPuzzlePost = async (req, res) => {
    const { id } = req.params
    const theme = await Theme.findById(id) // get theme database
    const puzzle = new Puzzle(req.body)
    puzzle.puzzleImage.url = req.file.path
    puzzle.filename = req.file.filename
    await puzzle.save()
    theme.puzzle.push(puzzle)
    await theme.save()
    res.redirect(`/themes/${id}`) // or ${theme._id}
}

module.exports.showPuzzle = async (req, res) => {
    const { id, puzzleId } = req.params
    const theme = await Theme.findById(id)
    const puzzle = await Puzzle.findById(puzzleId)
    res.render('puzzle/showPuzzle', { puzzle, theme })

}

module.exports.editPuzzleGet = async (req, res) => {
    const { id, puzzleId } = req.params
    const theme = await Theme.findById(id)
    const puzzle = await Puzzle.findById(puzzleId)
    res.render('puzzle/editPuzzles', { theme, puzzle })
}

module.exports.editPuzzlePut = async (req, res) => {/////////
    const { id, puzzleId } = req.params
    const newPuzzle = await Puzzle.findByIdAndUpdate(puzzleId, req.body)
    newPuzzle.puzzleImage.url = req.file.path
    newPuzzle.filename = req.file.filename
    await newPuzzle.save()
    res.redirect(`/themes/${id}`)
}

module.exports.deletePuzzle = async (req, res) => {
    const { id, puzzleId } = req.params
    await Theme.findByIdAndUpdate(id, { $pull: { puzzle: puzzleId } })
    await Puzzle.findByIdAndDelete(puzzleId)
    res.redirect(`/themes/${id}`)
}