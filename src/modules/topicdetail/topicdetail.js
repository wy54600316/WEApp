require('./topicdetail.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service'),
    commentModule = require('../comment/comment'),
    template = require('./topicdetail.tpl.html');

var topicdetailModule = {
	init: function(query){
		this.bindEvents();
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