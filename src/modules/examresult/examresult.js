var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    commentModule = require('../comment/comment'),
    template = require('./examresult.tpl.html');

var examresultModule = {
    dataObj: {},
    init: function(query){
        appFunc.hideToolbar();

        this.id = query.id;
        this.key = query.k;

        this.getQuestions();

        this.bindEvents();

        commentModule.init({
            interface: 'Comment/AnswerComments',
            data: {
                answerId: parseInt(this.id),
                dataId: parseInt(this.id),
                page: 1,
                pageSize: 6
            },
            commentType: 3,
            ele: '#talkView .exam-wrap .comment-area ul'
        });
    },
    getQuestions: function(){
        service.getQuestions({
            id: this.id,
            key: this.key
        }, function(res){
            examresultModule.dataObj = res;
            examresultModule.renderData();
        });
    },
    renderData: function(){
        var data = {
            obj: examresultModule.dataObj
        };
        appFunc.registerHelper('typeStr', function(v1, opt){
            var str = '';
            if(v1 == 1){
                str = '单选题';
            }else if(v1 == 2){
                str = '多选题';
            }else if(v1 == 3){
                str = '留言';
            }
            return str;
        });

        appFunc.registerHelper('indexPlus', function(v1, opt){
            this._index = v1;
            return this._index+1;
        });

        appFunc.registerHelper('typeCompare', function(v1, opt){
            if(v1 == 1){
                return opt.inverse(this);
            }else{
                return opt.fn(this);
            }
        });

        var output = appFunc.renderTpl(template, data);
        $$('#talkView').find('#examDetailContent').html(output);
    },
    bindEvents: function(){
        var bindings = [{
            element: '#talkView .item-comment-btn',
            event: 'click',
            handler: commentModule.commentPopup
        }];

        appFunc.bindEvents(bindings);
    }
}

module.exports = examresultModule;