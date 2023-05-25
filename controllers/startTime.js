const axios = require('axios');
const Users = require('../models/Users');
const ContestStartTime = require('../models/ContestStartTime');

const mapContestIdWithStartTime = async ({id, startTimeSeconds}) =>{
    let contest = await ContestStartTime.findOne({contestId : id});
    if(!contest){
        contest = new ContestStartTime({ 
            contestId: id,
            startTime: startTimeSeconds
        });
        contest.save();
    }

}
const updateStartTime = async () =>{
    try{
        const response = await axios.get('https://codeforces.com/api/contest.list');
        const contests = response.data.result;

        contests.forEach(mapContestIdWithStartTime);

    } catch (error) {
        console.error(error);
    }
    
}

module.exports = {updateStartTime};