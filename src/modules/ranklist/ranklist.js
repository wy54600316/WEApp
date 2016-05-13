require('./ranklist.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service'),
    template = require('./ranklist.tpl.html');

var ranklistModule = {
    dataList: [],
    init: function(query){
        appFunc.hideToolbar();
        this.bindEvents();
    },
    bindEvents: function(){

    }
}

module.exports = ranklistModule;