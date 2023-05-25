const mongoose=require('mongoose');

const contestStartTimeSchema = new mongoose.Schema({
    contestId:{
        type: String,
        required: [true, 'Contest Id is required']
    },
    startTime:{
        type: Number
    }
});

module.exports = mongoose.model('contestStartTime',contestStartTimeSchema);