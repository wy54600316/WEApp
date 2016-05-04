require('./pubdetail.less');

var appFunc = require('../utils/appFunc'),
    commentModule = require('../comment/comment'),
    template = require('./pubdetail.tpl.html'),
    service = require('./service.js');

var pubdetailModule = {
    init: function(query){
        this.id = query.id;
        this.key = query.key;
        appFunc.hideToolbar();

        this.bindEvents();

        // render tweet card
        this.getPubDetail();

        // init comment module
        commentModule.init();
    },
    getPubDetail: function(){
        service.getPubDetail({
            id: this.id,
            key: this.key
        }, function(res){
            var renderData = res;
            renderData.beginTime = appFunc.dateFormat(renderData.beginTime, 'yyyy-MM-dd hh:mm');

            var output = appFunc.renderTpl(template, renderData);
            $$('#pubContent').html(output);
        });
    },
    bindEvents: function(){
        var bindings = [{
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