
var xhr = require('../utils/xhr');

module.exports = {
    getQuestions: function(opt,callback){
        xhr.simpleCall({
            func: 'MicroClass/McTestTopic',
            data: {
                // 'categoryId': opt.categoryId
            }
        },function(res){
            callback(res);
        });
    },
    commitExam: function(opt,callback){
        xhr.simpleCall({
            func: 'MicroClass/CommitTest',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(opt.obj)
        },function(res){
            callback(res);
        });
    }
};