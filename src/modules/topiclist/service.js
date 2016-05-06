var xhr = require('../utils/xhr');

module.exports = {
    getTopicList: function(opt, callback) {
        xhr.simpleCall({
            func: 'ForumTopic',
            data: {
                communityGroupId: opt.communityGroupId,
                page: opt.page,
                pageSize: opt.pageSize
            }
        }, function (res) {
            callback(res);
        });
    }
};