require('./publist.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./publist.tpl.html');

var publistModule = {
    pageObj: {
        page: 1,
        pageSize: 1
    },
    init: function(query){
        appFunc.hideToolbar();
        var t = query.t; 
        this.categoryId = query.id;

        $$(".publist-title").text(t);
        this.getPubList();
        this.bindEvent();
    },
    getPubList: function(type){
        var that = this;

        service.getPubList({
            'categoryId': that.categoryId,
            'page': that.pageObj.page,
            'pageSize': that.pageObj.pageSize
        }, function(res){
            that.renderData(res, type);
        });
    },
    refreshData: function(e){
        publistModule.pageObj.page = 1;
        publistModule.getPubList();
    },
    infiniteData: function(e){
        publistModule.pageObj.page += 1;
        publistModule.getPubList('append');
    },
    renderData: function(res, type){
        var data = {
            list: res,
            beginTime: function(){
                return appFunc.dateFormat(this.beginTime, 'yyyy-MM-dd hh:mm');
            }
        };
        var output = '',
            $infinite = '.infinite-scroll';
        if(type === 'append') {
            if(!res || res.length <= 0){
                weApp.detachInfiniteScroll($infinite);
            }else{
                output = appFunc.renderTpl(template, data);
                $$('#homeView').find('.page-classlist').append(output);

                if(res.length < publistModule.pageObj.pageSize){
                    weApp.detachInfiniteScroll($infinite);
                }
            }
        }else {
            output = appFunc.renderTpl(template, data);
            $$('#homeView').find('.page-classlist').html(output);

            setTimeout(function(){
                weApp.pullToRefreshDone();
                weApp.attachInfiniteScroll($infinite);
            }, 1000);
        }
    },
    openPage: function(e){
        var itemId = $$(this).data('id'),
            key = $$(this).data('key');
        homeF7View.router.loadPage('page/pubdetail.html?id=' + itemId + '&key=' + key);
    },
    bindEvent: function(){
        var bindings = [{
            element: '.publist-wrap',
            selector: '.pull-to-refresh-content',
            event: 'refresh',
            handler: this.refreshData
        },{
            element: '.publist-wrap',
            selector: '.pull-to-refresh-content',
            event: 'infinite',
            handler: this.infiniteData
        },{
            element: '.publist-wrap',
            selector: '.pub-item',
            event: 'click',
            handler: this.openPage
        }];

        appFunc.bindEvents(bindings);
    }
};

module.exports = publistModule;