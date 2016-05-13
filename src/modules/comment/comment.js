require('./comment.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service'),
    template = require('./comment.tpl.html'),
    popupTpl = require('./commentPopup.tpl.html');

var commentModule = {
    prms: null,
    init: function(prms){
        this.prms = prms;
        this.getComments();
    },
    getComments: function(){
        var prm = {
            func: this.prms.interface,
            dataObj: this.prms.data
        }
        service.getComments(prm, function(res){
            // var random = Math.floor(Math.random()*2);
            // if(!random) res = null;
            // res = [{},{},{}];

            // if(res.totalItemCount > 0){
                setTimeout(function(){
                    var renderData = {
                        comments: res.comments.length>0?res.comments:null,
                        createdTime: function(){
                            return appFunc.dateFormat(this.createdTime, 'yyyy-MM-dd hh:mm');
                        }
                    };
                    var output = appFunc.renderTpl(template, renderData);
                    $$(commentModule.prms.ele).html(output);
                },1500);
            // }
        });
    },
    commentPopup: function(params){
        var renderData = {
            comment: "评论"
        };

        if(params.name){
            renderData.title = "回复评论";
            renderData.placeholder = "回复" + '@' + params.name + ':';
        }else {
            renderData.title = "回复评论";
            renderData.placeholder = "嗯~ 来吐槽一下吧.....";
        }

        var output = appFunc.renderTpl(popupTpl, renderData);
        weApp.popup(output);

        var bindings = [{
            element:'#commentBtn',
            event: 'click',
            handler: commentModule.sendComment
        }];

        appFunc.bindEvents(bindings);
    },
    sendComment: function(){
        var text = $$('#commentText').val();

        if(appFunc.getCharLength(text) < 4){
            weApp.alert("Er,内容有点短哦，再写点吧...");
            return false;
        }

        weApp.showPreloader("评论中...");

        service.addComment({
            dataId: commentModule.prms.data.dataId,
            // answerId: commentModule.prms.data.answerId,
            commentType: commentModule.prms.commentType,     // 1:文章 3:答案 5:主题
            content: text        // 评论内容
        }, function(res){
            setTimeout(function(){
                weApp.hidePreloader();
                weApp.closeModal('.comment-popup');

                //Refresh comment content
                var htmlstr = 
                '<li>'+
                    '<div class="item-inner">'+
                        '<div class="item-title-row">'+
                            '<div class="item-title"><img class="item-icon" src="/res/icons/favicon.ico" /> 昵称</div>'+
                            '<div class="item-after">'+appFunc.dateFormat(new Date(), 'yyyy-MM-dd hh:mm')+'</div>'+
                        '</div>'+
                        '<div class="item-text">'+text+'</div>'+
                    '</div>'+
                '</li>';
                $$(commentModule.prms.ele).prepend(htmlstr);
                var e = $$(commentModule.prms.ele).find(".none-comment");
                if(e.length > 0){
                    e.remove();
                };
            },1500);
        });
    },
    createActionSheet: function(){
        var replyName = $$(this).find('.comment-detail .name').html();
        var buttons1 = [
            {
                text: "回复评论",
                bold: true,
                onClick:function(){
                    commentModule.commentPopup({name:replyName});
                }
            },
            {
                text: "复制评论",
                bold: true
            }
        ];
        var buttons2 = [
            {
                text: "取消",
                color: 'red'
            }
        ];

        var groups = [buttons1, buttons2];
        weApp.actions(groups);
    }
};

module.exports = commentModule;