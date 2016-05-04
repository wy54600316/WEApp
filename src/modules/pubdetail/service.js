var xhr = require('../utils/xhr');

module.exports = {
    getPubDetail: function(opt,callback){
        xhr.simpleCall({
            // func:'publist'
            func: 'Course/Article',
            method: 'GET',
            data: {
                'id': opt.id,
                'key': opt.key
            }
        },function(res){
            callback(res);
        });
    }
};