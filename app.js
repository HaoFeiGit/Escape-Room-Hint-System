if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const ejsMate = require('ejs-mate') // enable boilerplate
const path = require('path')
const methodOverride = require('method-override')


const userRoutes = require('./routes/users')
const themeRoutes = require('./routes/themes')
const puzzleRoutes = require('./routes/puzzles')

const Themes = require('./models/themedb')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/escape-room', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected mongoose.connection");
});


app.engine('ejs', ejsMate)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.use('/', userRoutes)
app.use('/themes', themeRoutes)
app.use('/themes/:id/p', puzzleRoutes)



app.listen(8000, () => {
    console.log('Listening to Port 8000 ok!')
})






