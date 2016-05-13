var xhr = require('../utils/xhr');

module.exports = {
    getQuestions: function(opt,callback){
        xhr.simpleCall({
            func: 'MicroClass/McTestTopicDetail',
            // method: 'POST',
            contentType: 'application/json',
            data: {
                id: opt.id,
                key: opt.key
            }
        },function(res){
            callback(res);
        });
    },
};