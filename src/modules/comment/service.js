var xhr = require('../utils/xhr');

module.exports = {
    getComments: function(opt, callback) {
        // return false;
        xhr.simpleCall({
            func: opt.func,
            // method: 'POST',
            // contentType: 'application/json',
            data: opt.dataObj
        }, function (res) {
            callback(res);
        });
    },
    addComment: function(opt, callback){
        xhr.simpleCall({
            func: 'Comment',
            method: 'Post',
            // contentType: 'application/json',
            data: opt
        }, function (res) {
            callback(res);
        });
    }
};