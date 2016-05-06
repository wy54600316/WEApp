var xhr = require('../utils/xhr');

module.exports = {
    getExamList: function(opt,callback){
        xhr.simpleCall({
            // func:'publist'
            func: 'Course/Articles',
            method: 'GET',
            data: {
                // 'categoryId': opt.categoryId
            }
        },function(res){
            callback(res);
        });
    }
};