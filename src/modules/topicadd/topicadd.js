require('./topicadd.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service');

var topicaddModule = {
    init: function(query){
        appFunc.hideToolbar();

        this.cid = query.cid;
        this.bindEvents();
    },
    submitData: function(){
        var $parent = $$("#rankView #addTopicForm"),
            subject = $parent.find("#subjectInp").val(),
            message = $parent.find("#messageInp").val();

        if(!subject || subject.length <= 0){
            weApp.alert("请输入标题");
            return false;
        }else if(!message || message.length <= 0){
            weApp.alert("请输入内容");
            return false;
        }
        service.addTopic({
            cid: topicaddModule.cid,
            subject: subject,
            message: message
        }, function(res){
            rankF7View.router.refreshPreviousPage();
            weApp.addNotification({
                title: '通知',
                message: '帖子创建成功',
                onClose: function(){
                    clearTimeout(timer);
                    rankF7View.router.back();
                }
            });
            var timer = setTimeout(function(){
                weApp.closeNotification('.notification-item');
            }, 2000);
        });
    },
    bindEvents: function(){
        var bindings = [{
            element: '#doneTopicBtn',
            // selector: '#doneTopicBtn',
            event: 'click',
            handler: topicaddModule.submitData
        }];

        appFunc.bindEvents(bindings);
    }
}

module.exports = topicaddModule;