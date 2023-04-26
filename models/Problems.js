const mongoose=require('mongoose');

const problemSchema = new mongoose.Schema({
    problemId:{
        type: String,
        required: [true, 'Problem Id is required']
    },
    reactions:{
        type: [Number],
        default: [0,0,0] // boring, nice, amazing
    }
});

module.exports = mongoose.model('problem',problemSchema);