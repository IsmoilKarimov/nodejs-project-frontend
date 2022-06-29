const {Schema,model} = require('mongoose')

const worker = new Schema({
    name: {
        type: String,
        require: true
    },
    age: Number,
    skills: [],
    bdate: Date,
    bplace: String
})

module.exports = model('Worker',worker)