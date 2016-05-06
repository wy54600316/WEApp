var xhr = require('../utils/xhr');

module.exports = {
    getCircleList: function(opt, callback) {
        xhr.simpleCall({
            func: 'CommunityGroup',
            data: {
                page: opt.page,
                pageSize: opt.pageSize
            }
        }, function (res) {
            callback(res);
        });
    }
};