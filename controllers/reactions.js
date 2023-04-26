const Problems = require('../models/Problems');
const Users = require('../models/Users');


// Read
const getReactions = async (req, res) => {
    try{
        const {problemId} = req.body; // we will send this from client side

        const reactions = await Problems.findOne({problemId : problemId});
        res.status(200).json(reactions);

    }catch(err){
        res.status(404).json({message: err.message});
    }
}
const getUserReaction = async (req, res) => {
    try{
        const {userId, problemId} = req.body; // we will send this from frontend

        const emojiDoc = await Users.findOne({userId : userId, problemId: problemId});
        if(!emoji){
            emojiDoc = new Users({ 
                userId: userId,
                problemId: problemId // default reaction count is 0,0,0
            });
            emojiDoc.save();
        }
        
        res.status(200).json(emojiDoc);

    }catch(err){
        res.status(404).json({message: err.message});
    }
}


// update
const updateReactions = async (req, res) => {
    try{

        // update the problem database
        const {problemId, previousEmoji, currentEmoji} = req.body; // we will send this from frontend

        let reactionsDoc = await Problems.findOne({problemId : problemId});

        if(!reactions){
            reactions = new Problems({ 
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
        

        // update the User database
        let emojiDoc = await Users.findOne({userId : userId, problemId: problemId}); // it should always exist because we are calling getUserReaction before calling this function 
        emojiDoc.emoji=currentEmoji;
        emojiDoc.save();


        res.status(200).json(reactionsDoc);
      }catch(err){
          res.status(404).json({message: err.message});
      }
}

module.exports = {getReactions, updateReactions, getUserReaction};