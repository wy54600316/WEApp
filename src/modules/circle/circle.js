require('./circle.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service'),
    template = require('./circle.tpl.html');

var circleModule = {
    pageObj: {
        page: 1,
        pageSize: 10
    },
    dataList: [],
    init: function(query){
        appFunc.hideToolbar();
        this.bindEvents();

        // 默认选中标签
        // weApp.showTab('#recommTab');
        this.getRecommList();
    },
    getRecommList: function(type){
        service.getCircleList({
            page: this.pageObj.page,
            pageSize: this.pageObj.pageSize
        }, function(res){
            if(res.totalItemCount > 0){
                circleModule.renderData(res.pageOfItems, '#recommList', type);
            }
        });
    },
    getMineList: function(){
        service.getCircleList({
            page: this.pageObj.page,
            pageSize: this.pageObj.pageSize
        }, function(res){
            if(res.totalItemCount > 0){
                circleModule.renderData(res.pageOfItems, '#mineList');
            }
        });
    },
    renderData: function(res, ele, type){
        var data = {
            list: res,
            startInd: 0
        }
        appFunc.registerHelper('indexPlus', function(v1, v2, opt){
            return (v1 + v2);
        });

        var output = '',
            $infinite = '.infinite-scroll';
        if(type === 'append') {
            if(!res || res.length <= 0){
                weApp.detachInfiniteScroll($infinite);
            }else{
                data.startInd = circleModule.dataList.length;
                circleModule.dataList = circleModule.dataList.concat(res);
                output = appFunc.renderTpl(template, data);
                $$('.circle-wrap').find(ele).append(output);

                if(res.length < circleModule.pageObj.pageSize){
                    weApp.detachInfiniteScroll($infinite);
                }
            }

        }else {
            circleModule.dataList = res;
            output = appFunc.renderTpl(template, data);
            $$('.circle-wrap').find(ele).html(output);
            setTimeout(function(){
                weApp.pullToRefreshDone();
                weApp.attachInfiniteScroll($infinite);
            }, 1000);
        }
    },
    refreshData: function(){
        circleModule.pageObj.page = 1;
        circleModule.getRecommList();
    },
    infiniteData: function(){
        circleModule.pageObj.page += 1;
        circleModule.getRecommList('append');
    },
    openPage: function(e){
        var _id = $$(this).data('id');
        var _ind = $$(this).data('ind');
        rankF7View.router.loadPage('page/topiclist.html?id='+circleModule.dataList[_ind].id+'&cname='+circleModule.dataList[_ind].name);
    },
    bindEvents: function(){
        var bindings = [{
            element: '.circle-wrap',
            selector: '.pull-to-refresh-content',
            event: 'refresh',
            handler: this.refreshData
        },{
            element: '.circle-wrap',
            selector: '.pull-to-refresh-content',
            event: 'infinite',
            handler: this.infiniteData
        },{
            element: '.circle-wrap',
            selector: '#recommTab',
            event: 'show',
            handler: this.getRecommList
        },{
            element: '.circle-wrap',
            selector: '#mineTab',
            event: 'show',
            handler: this.getMineList
        },{
            element: '.circle-wrap',
            selector: '.citem',
            event: 'click',
            handler: this.openPage
        }];

        appFunc.bindEvents(bindings);
    }
}

module.exports = circleModule;