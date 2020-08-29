const env = require('dotenv').config({ path: '../.env' });

const Twitter = require('twitter-lite');

const twitterClient = new Twitter({
    subdomain: "api", // api is the default
    version: "1.1", // version 1.1 is the default
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET,
    access_token_key: process.env.ACCESS_TOKEN, 
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const numberEmojiMap = {
    "0": "0️⃣",
    "1": "1️⃣",
    "2": "2️⃣",
    "3": "3️⃣",
    "4": "4️⃣",
    "5": "5️⃣",
    "6": "6️⃣",
    "7": "7️⃣",
    "8": "8️⃣",
    "9": "9️⃣",
};

const name  = 'Divyajyoti'
,     emoji = '👩‍💻JS'
;

module.exports = (req, res) => {
    console.log('here :: ')
    twitterClient.get('account/verify_credentials')
             .then((res) => {
                const followerCount = res.followers_count
                ,     countInString = followerCount.toString()
                ,     splitCount    = countInString.split("")
                ;
                const followersEmoji = splitCount.reduce((acc, curr) => {
                    return acc + numberEmojiMap[curr];
                },"");
                const user_name = `${name}${emoji} |${followersEmoji}`;
                console.log("get req")
                console.log(followerCount);
                postRequest(user_name);
             })
             .catch((err) => console.log("line 46", err));

            res.status(200).send(`Hello World!`);
};

function postRequest(user_name){
    const response = twitterClient.post("account/update_profile", { name: user_name });

    response.then((res) => {
        //console.log(res);
        console.log("post req")
        console.log(user_name);
    })
    .catch((err) => console.log(err));
}