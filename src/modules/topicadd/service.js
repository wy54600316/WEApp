var xhr = require('../utils/xhr');

module.exports = {
    addTopic: function(opt, callback) {
        xhr.simpleCall({
            func: 'ForumTopic',
            method: 'POST',
            data: {
                communityGroupId: opt.cid,
                subject: opt.subject,
                message: opt.message
            }
        }, function (res) {
            callback(res);
        });
    }
};