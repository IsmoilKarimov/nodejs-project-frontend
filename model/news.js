const {Schema,model} = require('mongoose')

const news = new Schema({
    title: {
        type: String,
        required:true
    },
    category: String,
    text: String,
    photo: String,
    date: Date
})

module.exports = model('News',news)