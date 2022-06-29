const {Schema, model} = require('mongoose')

const project = new Schema({
    name : {
        type: String,
        default: 'Nomi yo`q'
    },
    person: {
        type: Schema.Types.ObjectId,
        ref:'Worker'
    },
    projecttype: String,
    deadline: {
        type: Date,
        default: Date.now() + 1000 * 86400 * 7
    }
})

module.exports = model('Project', project)