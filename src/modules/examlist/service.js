var xhr = require('../utils/xhr');

module.exports = {
    getExamList: function(opt,callback){
        xhr.simpleCall({
            func: 'MicroClass/McTestTopics',
            method: 'GET',
            data: opt.dataObj
        },function(res){
            callback(res);
        });
    }
};