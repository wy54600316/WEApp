var xhr = require('../utils/xhr');

module.exports = {
    getComments: function(callback) {
    	return false;
        xhr.simpleCall({
            func: 'comments'
        }, function (res) {
            callback(res.data);
        });
    }
};