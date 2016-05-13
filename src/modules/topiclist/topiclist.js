require('./topiclist.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service'),
    template = require('./topiclist.tpl.html');

var topiclistModule = {
    pageObj: {
        page: 1,
        pageSize: 10
    },
    dataList: [],
    init: function(query){
        appFunc.hideToolbar();
        $$('#rankView').find('.topiclist-title').text(query.cname);
        this.communityGroupId = query.id;
        this.bindEvents();
        this.getTopicList();
    },
    getTopicList: function(type){
        service.getTopicList({
            communityGroupId: this.communityGroupId,
            page: topiclistModule.pageObj.page,
            pageSize: topiclistModule.pageObj.pageSize
        }, function(res){
            // if(res.totalItemCount > 0){
            //     topiclistModule.dataList = res.forumTopicViewModels;
            // }
            // topiclistModule.dataList = [{},{},{}];
            topiclistModule.renderData(res.forumTopicViewModels, type);
        });
    },
    renderData: function(res, type){
        var data = {
            startInd: 0,
            createdTime: function(){
                return appFunc.dateFormat(this.createdTime, 'yyyy-MM-dd hh:mm');
            }
        };
        // appFunc.registerHelper('indexPlus', function(v1, v2, opt){
        //     return (v1 + v2);
        // });
        // if(topiclistModule.dataList.length > 0) data['list'] = topiclistModule.dataList;
        // var output = appFunc.renderTpl(template, data);
        // $$('#rankView').find('#topicList').html(output);


        var output = '',
            $infinite = '.topiclist-wrap .infinite-scroll';
        if(type === 'append') {
            if(!res || res.length <= 0){
                weApp.detachInfiniteScroll($infinite);
            }else{
                data.startInd = topiclistModule.dataList.length;

                if(res.length > 0) data['list'] = res;
                else data['list'] = [];

                topiclistModule.dataList = topiclistModule.dataList.concat(res);

                output = appFunc.renderTpl(template, data);
                $$('.topiclist-wrap').find('#topicList').append(output);

                if(res.length < topiclistModule.pageObj.pageSize){
                    weApp.detachInfiniteScroll($infinite);
                }
            }

        }else {
            topiclistModule.dataList = res;

            if(res.length > 0) data['list'] = res;

            output = appFunc.renderTpl(template, data);
            $$('.topiclist-wrap').find('#topicList').html(output);

            setTimeout(function(){
                weApp.pullToRefreshDone();
                weApp.attachInfiniteScroll($infinite);
            }, 1000);
        }
    },
    refreshData: function(){
        topiclistModule.pageObj.page = 1;
        topiclistModule.getTopicList();
    },
    infiniteData: function(){
        topiclistModule.pageObj.page += 1;
        topiclistModule.getTopicList('append');
    },
    toAddPage: function(e){
        rankF7View.router.loadPage('page/topicadd.html?cid='+topiclistModule.communityGroupId);
    },
    toDetailPage: function(e){
        var _id = $$(this).data('id'),
            _ind = $$(this).data('ind');
        rankF7View.router.loadPage('page/topicdetail.html?tid='+topiclistModule.dataList[_ind].id+'&tname='+topiclistModule.dataList[_ind].subject);
    },
    bindEvents: function(){
        var bindings = [{
            element: '.topiclist-wrap',
            selector: '.pull-to-refresh-content',
            event: 'refresh',
            handler: this.refreshData
        },{
            element: '.topiclist-wrap',
            selector: '.pull-to-refresh-content',
            event: 'infinite',
            handler: this.infiniteData
        },{
            element: '#rankView',
            selector: '.add-topic-btn',
            event: 'click',
            handler: this.toAddPage
        },{
            element: '.topiclist-wrap',
            selector: '.titem',
            event: 'click',
            handler: this.toDetailPage
        }];

        appFunc.bindEvents(bindings);
    }
}

module.exports = topiclistModule;