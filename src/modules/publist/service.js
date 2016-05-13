var xhr = require('../utils/xhr');

module.exports = {
    getPubList: function(opt,callback){
        xhr.simpleCall({
            // func:'publist'
            func: 'Course/Articles',
            method: 'GET',
            data: {
                'categoryId': opt.categoryId,
                'page': opt.page,
                'pageSize': opt.pageSize
            }
        },function(res){
            callback(res);
        });
    }
};