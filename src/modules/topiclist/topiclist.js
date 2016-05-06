require('./topiclist.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service'),
    template = require('./topiclist.tpl.html');

var topiclistModule = {
    dataList: [],
    init: function(query){
        appFunc.hideToolbar();
        $$('#rankView').find('.topiclist-title').text(query.cname);
        this.communityGroupId = query.id;
        this.bindEvents();
        this.getTopicList();
    },
    getTopicList: function(){
        topiclistModule.dataList = [];
        service.getTopicList({
            communityGroupId: this.communityGroupId,
            page: 1,
            pageSize: 3
        }, function(res){
            if(res.totalItemCount > 0){
                topiclistModule.dataList = res.pageOfItems;
            }
            topiclistModule.dataList = [{},{},{}];
            topiclistModule.renderData();
        });
    },
    renderData: function(){
        var renderData = {};
        if(topiclistModule.dataList.length > 0) renderData['list'] = topiclistModule.dataList;
        var output = appFunc.renderTpl(template, renderData);
        $$('#rankView').find('#topicList').html(output);
    },
    toAddPage: function(e){
        rankF7View.router.loadPage('page/topicadd.html?cid='+this.communityGroupId);
    },
    toDetailPage: function(e){
        var _id = $$(this).data('id'),
            _ind = $$(this).data('ind');
        rankF7View.router.loadPage('page/topicdetail.html?tid='+topiclistModule.dataList[_ind].id);
    },
    bindEvents: function(){
        var bindings = [{
            element: '#rankView',
            selector: '.pull-to-refresh-content',
            event: 'refresh',
            handler: this.refreshData
        },{
            element: '#rankView',
            selector: '.pull-to-refresh-content',
            event: 'infinite',
            handler: this.infiniteData
        },{
            element: '#rankView',
            selector: '.add-topic-btn',
            event: 'click',
            handler: this.toAddPage
        },{
            element: '#rankView',
            selector: '.titem',
            event: 'click',
            handler: this.toDetailPage
        }];

        appFunc.bindEvents(bindings);
    }
}

module.exports = topiclistModule;