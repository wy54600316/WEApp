require('./pubdetail.less');

var appFunc = require('../utils/appFunc'),
    commentModule = require('../comment/comment'),
    template = require('./pubdetail.tpl.html'),
    service = require('./service.js');

var pubdetailModule = {
    init: function(query){
        appFunc.hideToolbar();
        
        this.id = query.id;
        this.key = query.key;
        this.bindEvents();

        this.getPubDetail();

        commentModule.init({
            interface: 'Comment/ArticleComments',
            data: {
                articleId: parseInt(this.id),
                dataId: parseInt(this.id),
                page: 1,
                pageSize: 6
            },
            commentType: 1,
            ele: '#homeView .pubdetail-wrap .comment-area ul'
        });
    },
    getPubDetail: function(){
        service.getPubDetail({
            id: pubdetailModule.id,
            key: pubdetailModule.key
        }, function(res){
            var renderData = res;
            renderData.beginTime = appFunc.dateFormat(renderData.beginTime, 'yyyy-MM-dd hh:mm');
            renderData.isWXWebview = appFunc.isWXWebview();

            var output = appFunc.renderTpl(template, renderData);
            $$('#pubContent').html(output);

            setTimeout(function(){
                weApp.pullToRefreshDone();
            }, 1000);
        });
    },
    bindEvents: function(){
        var bindings = [{
            element: '.pubdetail-wrap',
            selector: '.pull-to-refresh-content',
            event: 'refresh',
            handler: this.getPubDetail
        },{
            element: '#commentContent',
            selector: '.comment-item',
            event: 'click',
            handler: commentModule.createActionSheet
        },{
            element: '#homeView .item-comment-btn',
            event: 'click',
            handler: commentModule.commentPopup
        }];

        appFunc.bindEvents(bindings);
    }
};

module.exports = pubdetailModule;