var xhr = require('../utils/xhr');

module.exports = {
    getTopicDetail: function(opt, callback) {
        xhr.simpleCall({
            func: 'ForumTopic',
            method: 'Get',
            data: {
                id: opt.tid
            }
        }, function (res) {
            callback(res);
        });
    }
};