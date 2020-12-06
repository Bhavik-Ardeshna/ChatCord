const moment = require('moment');


function formatMsg(username,msg){
    return{
        username,
        msg,
        time:moment().format('h:mm a')
    };
}

module.exports = formatMsg;