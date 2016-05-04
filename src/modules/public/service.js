var xhr = require('../utils/xhr');

module.exports = {
    getPubTypeList: function(opt,callback){
        xhr.simpleCall({
            // func:'publist'
            func: 'Course/ArticleCategorys',
            data: opt
        },function(res){
            callback(res);
        });
    }
};