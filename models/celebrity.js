// reservation schema
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({

    name: {
        type: String,
        required: true,
        maxLength: 50
    },
    occupation: {
        type: String,
        required: true,
        default: "unknown"
    },
    catchPhrase: {
        type: String,
        required: true,
        maxLength: 400
    }

})

const Celebrity = model('Celebrity', celebritySchema);

module.exports = Celebrity;