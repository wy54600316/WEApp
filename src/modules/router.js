var index = require('./app/app'),
    appFunc = require('./utils/appFunc'),
    publist = require('./publist/publist'),
    pubdetailModule = require('./pubdetail/pubdetail'),
    examModule = require('./exam/exam'),
    examlistModule = require('./examlist/examlist'),
    examresultModule = require('./examresult/examresult'),
    circleModule = require('./circle/circle'),
    topiclistModule = require('./topiclist/topiclist'),
    topicdetailModule = require('./topicdetail/topicdetail'),
    topicaddModule = require('./topicadd/topicadd');

module.exports = {
    init: function() {
        var that = this;
        $$(document).on('pageBeforeInit', function (e) {
            var page = e.detail.page;
            that.pageBeforeInit(page);
        });

        $$(document).on('pageAfterAnimation', function (e) {
            var page = e.detail.page;
            that.pageAfterAnimation(page);
        });
    },
    pageAfterAnimation: function(page){
        var name = page.name;
        var from = page.from;

        if(name === 'homeView' || name === 'talkView' || name === 'rankView' ){
            if(from === 'left'){
                appFunc.showToolbar();
            }
        }
    },
    pageBeforeInit: function(page) {
        var name = page.name;
        var query = page.query;

        switch (name) {
            case 'publist':
                publist.init(query);
                break;
            case 'pubdetail':
                pubdetailModule.init(query);
                break;
            case 'exam':
                examModule.init(query);
                break;
            case 'examlist':
                examlistModule.init(query);
                break;
            case 'examresult':
                examresultModule.init(query);
                break;
            case 'circle':
                circleModule.init(query);
                break;
            case 'topiclist':
                topiclistModule.init(query);
                break;
            case 'topicdetail':
                topicdetailModule.init(query);
                break;
            case 'topicadd':
                topicaddModule.init(query);
                break;
        }
    }
};