const {Schema, model} = require('mongoose')

const faq = Schema({
    name: String,
    question: String,
    answer: String,
    createdAt: Date,
    status: Number  
})
module.exports = model('Faq', faq)