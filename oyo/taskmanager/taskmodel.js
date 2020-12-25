const mongoose = require( 'mongoose' )
const validator = require( 'validator' )
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
        trim:true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'User'
    }
},
    {
    timestamps:true
    } )

// taskSchema.statics.findByQuery = async function (completed) {
    
//     const task = await Task.find( { completed } )
//     return task
//     }

const Task = mongoose.model('Task', taskSchema )
module.exports = Task