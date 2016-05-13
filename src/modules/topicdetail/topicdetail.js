require('./topicdetail.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service'),
    commentModule = require('../comment/comment'),
    template = require('./topicdetail.tpl.html');

var topicdetailModule = {
	init: function(query){
        this.tid = query.tid;
        // $$("#topDetailTitle").text(query.tname);

        this.getTopicDetail();

		this.bindEvents();

        commentModule.init({
            interface: 'Comment/TopicComments',
            data: {
                topicId: parseInt(this.tid),
                dataId: parseInt(this.tid),
                page: 1,
                pageSize: 6
            },
            commentType: 5,
            ele: '#rankView .topicdetail-wrap .comment-area ul'
        });
	},
    getTopicDetail: function(){
        service.getTopicDetail({
            tid: topicdetailModule.tid
        }, function(res){
            var renderData = {
                obj: res,
                createTime: function(){
                    return appFunc.dateFormat(this.obj.createdTime, 'yyyy-MM-dd hh:mm');
                }
            }
            var output = appFunc.renderTpl(template, renderData);
            $$("#topicContent").html(output);
        });
    },
    bindEvents: function(){
        var bindings = [{
            element: '#commentContent',
            selector: '.comment-item',
            event: 'click',
            handler: commentModule.createActionSheet
        },{
            element: '#rankView .item-comment-btn',
            event: 'click',
            handler: commentModule.commentPopup
        }];

        appFunc.bindEvents(bindings);
    }
}

module.exports = topicdetailModule;