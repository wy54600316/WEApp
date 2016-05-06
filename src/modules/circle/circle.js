require('./circle.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service'),
    template = require('./circle.tpl.html');

var circleModule = {
    dataList: [],
    init: function(query){
        appFunc.hideToolbar();
        this.bindEvents();

        // 默认选中标签
        hiApp.showTab('#recommTab');
    },
    getRecommList: function(){
        service.getCircleList({
            page: 1,
            pageSize: 3
        }, function(res){
            if(res.totalItemCount > 0){
                circleModule.dataList = res.pageOfItems;
                circleModule.renderData(res.pageOfItems, '#recommList');
            }
        });
    },
    getMineList: function(){
        service.getCircleList({
            page: 1,
            pageSize: 3
        }, function(res){
            if(res.totalItemCount > 0){
                circleModule.dataList = res.pageOfItems;
                circleModule.renderData(res.pageOfItems, '#mineList');
            }
        });
    },
    renderData: function(data, ele){
        var renderData = {
            list: data
        }
        var output = appFunc.renderTpl(template, renderData);
        $$('#rankView').find(ele).html(output);
    },
    openPage: function(e){
        var _id = $$(this).data('id');
        var _ind = $$(this).data('ind');
        rankF7View.router.loadPage('page/topiclist.html?id='+circleModule.dataList[_ind].id+'&cname='+circleModule.dataList[_ind].name);
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
            selector: '#recommTab',
            event: 'show',
            handler: this.getRecommList
        },{
            element: '#rankView',
            selector: '#mineTab',
            event: 'show',
            handler: this.getMineList
        },{
            element: '#rankView',
            selector: '.citem',
            event: 'click',
            handler: this.openPage
        }];

        appFunc.bindEvents(bindings);
    }
}

module.exports = circleModule;