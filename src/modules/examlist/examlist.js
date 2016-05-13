require('./examlist.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./examlist.tpl.html');

var examlistModule = {
    pageObj: {
        page: 1,
        pageSize: 7
    },
    init: function(query){
        appFunc.hideToolbar();
        this.getExamList();
        this.bindEvent();
    },
    getExamList: function(type){
        service.getExamList({
            dataObj: {
                page: this.pageObj.page,
                pageSize: this.pageObj.pageSize
            }
        },function(res){
            var data = {
                list: res,
                endTime: function(){
                    return appFunc.dateFormat(this.endTime, 'yyyy-MM-dd hh:mm');
                }
            };

            var output = '',
                $infinite = '.infinite-scroll';
            if(type === 'append') {
                if(!res || res.length <= 0){
                    weApp.detachInfiniteScroll($infinite);
                }else{
                    output = appFunc.renderTpl(template, data);
                    $$('.exam-wrap').find('#examList').append(output);

                    if(res.length < examlistModule.pageObj.pageSize){
                        weApp.detachInfiniteScroll($infinite);
                    }
                }

            }else {
                output = appFunc.renderTpl(template, data);
                $$('.exam-wrap').find('#examList').html(output);
                setTimeout(function(){
                    weApp.pullToRefreshDone();
                    weApp.attachInfiniteScroll($infinite);
                }, 1000);
            }
        });
    },
    refreshData: function(){
        examlistModule.pageObj.page = 1;
        examlistModule.getExamList();
    },
    infiniteData: function(){
        examlistModule.pageObj.page += 1;
        examlistModule.getExamList('append');
    },
    bindEvent: function(){
        var bindings = [{
            element: '.exam-wrap',
            selector: '.pull-to-refresh-content',
            event: 'refresh',
            handler: this.refreshData
        },{
            element: '.exam-wrap',
            selector: '.pull-to-refresh-content',
            event: 'infinite',
            handler: this.infiniteData
        },{
            element: '.exam-wrap',
            selector: '.pub-item',
            event: 'click',
            handler: this.openPage
        }];

        appFunc.bindEvents(bindings);
    }
}

module.exports = examlistModule;