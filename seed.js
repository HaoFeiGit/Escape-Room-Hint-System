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
    console.log("Seed Working");
});

const seedDB = async () => {
    await Themes.deleteMany({})
    // const theme = new Themes({
    //     title: 'Dream Weaver',
    //     themeImage: {
    //         url: 'IMG/DreamWeaver.jpg'
    //     },
    //     themeDescription: 'In a Yorkshire country house where the Hughes family lives, everyone is shocked by devastating news. The Hughes’s youngest son, Leo, has mysteriously died. Lucy believes that their older sister Linda is responsible, but she cannot directly tell her father. She hires you and your team, dreamweavers capable of planting dreams in a person’s mind, to convince him. During the job, your team encounters layers of barriers as you struggle to reach each level of his subconscious, and as you dig deeper into his mind, you realize you have put yourself in unforseen danger. Something is horribly wrong and Lucy might not be innocent.',
    //     company: 'Esxoss Manway Escape Room',
    //     difficulty: 'Intermediate',
    // })
    // theme.save()
    // console.log('Seed Succeed')
}

seedDB()




