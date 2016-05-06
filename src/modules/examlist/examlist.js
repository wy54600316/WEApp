require('./examlist.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./examlist.tpl.html');

var examlistModule = {
    init: function(query){
        appFunc.hideToolbar();
        this.getExamList();
        this.bindEvent();
    },
    getExamList: function(type){
        // service.getExamList({
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
                $$('#talkView').find('#examList').prepend(output);
            }else if(type === 'append') {
                $$('#talkView').find('#examList').append(output);
            }else {
                $$('#talkView').find('#examList').html(output);
            }
        // });
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
            selector: '.pub-item',
            event: 'click',
            handler: this.openPage
        }];

        appFunc.bindEvents(bindings);
    }
}

module.exports = examlistModule;