var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    commentModule = require('../comment/comment'),
    template = require('./examresult.tpl.html');

var examresultModule = {
	init: function(query){
		appFunc.hideToolbar();

		this.bindEvents();

		commentModule.init();
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