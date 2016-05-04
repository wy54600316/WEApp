require('./publist.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./publist.tpl.html'),
    inputModule = require('../input/input');

var publistModule = {
    init: function(query){
        appFunc.hideToolbar();
        var t = query.t,
            categoryId = this.categoryId = query.id;

        $$(".publist-title").text(t);
        this.getPubList();
        this.bindEvent();
    },
    getPubList: function(){
        var that = this;

        service.getPubList({
            'categoryId': that.categoryId || 1
        }, function(tl){
            that.renderData(tl);

            hiApp.hideIndicator();
            var ptrContent = $$('#homeView').find('.pull-to-refresh-content');
            ptrContent.data('scrollLoading','unloading');
        });
    },
    refreshData: function(){
        var that = this;
        service.refreshData({
            'categoryId': that.categoryId || 1
        }, function(tl){
            var newestId = $$('#homeView').find('.home-timeline .card'). eq(0).data('id');

            setTimeout(function () {

                $$('#homeView .refresh-click').find('i').removeClass('ios7-reloading');

                if(parseInt(newestId) === 48) {
                    publistModule.showLoadResult(i18n.index.nothing_loaded);
                    hiApp.pullToRefreshDone();
                    return false;
                }

                var length = tl.length;

                if(length >= 15){
                    publistModule.renderData(tl);
                }else if(length > 0){
                    publistModule.renderData(tl, 'prepend');
                }else{
                    publistModule.showLoadResult(i18n.index.nothing_loaded);
                }

                hiApp.pullToRefreshDone();

            },1500);

        });
    },
    infiniteData: function(){
        var $this = $$(this);

        hiApp.showIndicator();
        service.infiniteData(function(tl){
            var status = $this.data('scrollLoading');
            if (status === 'loading') return;

            $this.data('scrollLoading','loading');

            var items = $this.find('.home-timeline .card');
            var length = items.length;
            var lastId = items.eq(length - 1).data('id');
            if(parseInt(lastId) === 24){
                hiApp.detachInfiniteScroll($this);
                hiApp.hideIndicator();
            }else{

                setTimeout(function(){
                    $this.data('scrollLoading','unloading');
                    publistModule.renderData(tl, 'append');

                    hiApp.hideIndicator();
                },1500);
            }
        });
    },
    showLoadResult: function(text){
        setTimeout(function(){
            $$('#homeView .load-result').html(text).css('opacity','1').transition(1000);

            setTimeout(function(){
                $$('#homeView .load-result').css('opacity','0').transition(1000);
            },2100);
        },400);
    },
    renderData: function(tl, type){
        var renderData = {
            list: tl,
            finalText: function(){
                return appFunc.matchUrl(this.text);
            },
            beginTime: function(){
                return appFunc.dateFormat(this.beginTime, 'yyyy-MM-dd hh:mm');
            }
        };
        var output = appFunc.renderTpl(template, renderData);
        if(type === 'prepend'){
            $$('#homeView').find('.page-classlist').prepend(output);
        }else if(type === 'append') {
            $$('#homeView').find('.page-classlist').append(output);
        }else {
            $$('#homeView').find('.page-classlist').html(output);
        }
    },
    openPage: function(e){
        if(e.target.nodeName === 'A' || e.target.nodeName === 'IMG'){
            return false;
        }
        var itemId = $$(this).data('id'),
            key = $$(this).data('key');
        homeF7View.router.loadPage('page/pubdetail.html?id=' + itemId + '&key=' + key);
    },
    bindEvent: function(){
        var bindings = [{
            element: '#homeView',
            selector: '.pull-to-refresh-content',
            event: 'refresh',
            handler: this.refreshData
        },{
            element: '#homeView',
            selector: '.pull-to-refresh-content',
            event: 'infinite',
            handler: this.infiniteData
        },{
            element: '#homeView',
            selector: '.pub-item',
            event: 'click',
            handler: this.openPage
        }];

        appFunc.bindEvents(bindings);
    }
};

module.exports = publistModule;