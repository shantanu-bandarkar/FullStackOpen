const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    url: {
        type: String,
        minlength: 3,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [String]
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
