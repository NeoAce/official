const mongoose = require('mongoose')

const quarantine = new mongoose.Schema({
    guildID: { Type: String }
})

module.exports = mongoose.model('quaratine', quarantine)