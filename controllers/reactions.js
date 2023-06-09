const Problems = require('../models/Problems');
const Users = require('../models/Users');
const ContestStartTime = require('../models/ContestStartTime');

// Read
const getReactions = async (req, res) => {
    try{
        const problemId = await getProblemId(req.query); // we will send this from client side

        const reactions = await Problems.findOne({problemId : problemId});
        let reactionsCount = [0,0,0];
        if(reactions){
            reactionsCount=reactions.reactions
        }

        res.status(200).json(reactionsCount);

    }catch(err){
        res.status(404).json({message: err.message});
    }
}


const getUserReaction = async (req, res) => {
    try{
        const {userId} = req.query; // we will send this from frontend
        const problemId = await getProblemId(req.query);
        const emojiDoc = await Users.findOne({userId : userId, problemId: problemId});
        
        res.status(200).json(emojiDoc);

    }catch(err){
        res.status(404).json({message: err.message});
    }
}


// update
const updateReactions = async (req, res) => {
    try{

        // update the problem database
        const {previousEmoji, currentEmoji} = req.body; // we will send this from frontend
        const problemId = await getProblemId(req.body);
        let reactionsDoc = await Problems.findOne({problemId : problemId});
        
        if(!reactionsDoc){
            reactionsDoc = new Problems({ 
                problemId: problemId // default reaction count is 0,0,0
            });
        }

        let reactions = reactionsDoc.reactions;

        if(previousEmoji==='boring'){
            reactions[0]--;
        }else if(previousEmoji==='nice'){
            reactions[1]--;
        }else if(previousEmoji==='amazing'){
            reactions[2]--;
        }

        if(currentEmoji==='boring'){
            reactions[0]++;
        }else if(currentEmoji==='nice'){
            reactions[1]++;
        }else if(currentEmoji==='amazing'){
            reactions[2]++;
        }
        
        reactionsDoc.save();


        res.status(200).json(reactionsDoc);
      }catch(err){
          res.status(404).json({message: err.message});
      }
}

const updateUserReaction = async (req, res) => {
    try{

        //update the User database
        const {currentEmoji, userId} = req.body;
        const problemId = await getProblemId(req.body);
        let emojiDoc = await Users.findOne({userId : userId, problemId: problemId}); // it should always exist because we are calling getUserReaction before calling this function 

        if(!emojiDoc){
            emojiDoc = new Users({ 
                userId: userId,
                problemId: problemId // default reaction count is 0,0,0
            });
        }

        emojiDoc.emoji=currentEmoji;
        emojiDoc.save();


        res.status(200).json(emojiDoc);
      }catch(err){
          res.status(404).json({message: err.message});
      }
}

// helper function
const getProblemId = async ({problemId}) =>{
    try{
        const contestId = problemId.split('-')[0];
        const contestStartTime = await ContestStartTime.findOne({contestId : contestId});
        const startTime = contestStartTime.startTime;
        let newProblemId = `${startTime}+${problemId.split('-')[1]}`;
        return newProblemId;
    } catch(error){
        console.error(error);
    }
}

module.exports = {getReactions, updateReactions, getUserReaction, updateUserReaction};