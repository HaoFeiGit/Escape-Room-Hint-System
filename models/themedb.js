const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ThemeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    themeImage: {
        url: String,
        filename: String, // need filename to delete from cloudinary
    },
    themeDescription: String,
    company: String,
    difficulty: String,
    puzzle: [{
        type: Schema.Types.ObjectId, // need to have the ref structure so that I can 
        ref: 'Puzzle'                // refer to its id to pull out hint by findBy(id)
    }]

})

module.exports = mongoose.model('Theme', ThemeSchema)