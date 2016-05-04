var xhr = require('../utils/xhr');

module.exports = {
    getPubList: function(opt,callback){
        xhr.simpleCall({
            // func:'publist'
            func: 'Course/Articles',
            method: 'GET',
            data: {
                'categoryId': opt.categoryId
            }
        },function(res){
            callback(res);
        });
    },
    refreshData: function(opt,callback){
        // xhr.simpleCall({
        //     func:'refresh_timeline'
        // },function(res){
        //     callback(res.data);
        // });
        this.getPubList(opt,callback);
    },
    infiniteData: function(callback){
        // xhr.simpleCall({
        //     func:'more_timeline'
        // },function(res){
        //     callback(res.data);
        // });
        this.getPubList(opt,callback);
    }
};