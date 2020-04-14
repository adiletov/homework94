const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const newSchema = new Schema({
    title: {
        type: String,
        required: function () {
            return !this.image
        }
    },
    image: {
        type: String,
        required: function () {
            return !this.title
        }
    },
    description: String,
    tags: [String],
    userId: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    datetime: {
        type: String,
        required: true
    }
});

const Publication = mongoose.model('Publication', newSchema);
module.exports = Publication;