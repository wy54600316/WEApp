require('./exam.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./exam.tpl.html'),
    popupTpl = require('./examPopup.tpl.html');

var examModule = {
    init: function(query){
        appFunc.hideToolbar();
        this.getQuestions();
        this.bindEvent();
    },
    getQuestions: function(type){
        // service.getQuestions({
        // },function(res){
            var renderData = {
                list: [{},{},{}],
                finalText: function(){
                    return appFunc.matchUrl(this.text);
                },
                beginTime: function(){
                    return appFunc.dateFormat(this.beginTime, 'yyyy-MM-dd hh:mm');
                }
            };
            var output = appFunc.renderTpl(template, renderData);
            if(type === 'prepend'){
                $$('#talkView').find('#questionList').prepend(output);
            }else if(type === 'append') {
                $$('#talkView').find('#questionList').append(output);
            }else {
                $$('#talkView').find('#questionList').html(output);
            }
        // });
    },
    submitExam: function(){
        var renderData = {};
        var output = appFunc.renderTpl(popupTpl, renderData);
        hiApp.popup(output);
    },
    bindEvent: function(){
        var bindings = [{
            element: '#talkView',
            selector: '.pull-to-refresh-content',
            event: 'refresh',
            handler: this.refreshData
        },{
            element: '#talkView',
            selector: '.pull-to-refresh-content',
            event: 'infinite',
            handler: this.infiniteData
        },{
            element: '#talkView',
            selector: '#submitExamBtn',
            event: 'click',
            handler: this.submitExam
        }];

        appFunc.bindEvents(bindings);
    }
}

module.exports = examModule;