const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: [true, 'User Id is required']
    },
    problemId:{
        type: String,
        required: [true, 'Problem Id is required']
    },
    emoji:{
        type: String,
        default: [""]
    }
});

module.exports = mongoose.model('user',userSchema);