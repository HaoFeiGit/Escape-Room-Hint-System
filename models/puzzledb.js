const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PuzzleSchema = new Schema({
    puzzleImage: {
        url: String,
    },
    hint: String,
    filename: String, // need filename to delete from cloudinary
    // hint: {
    //     smallHint: String,
    //     medianHint: String,
    //     bigHint: String,
    // }
})

module.exports = mongoose.model('Puzzle', PuzzleSchema)