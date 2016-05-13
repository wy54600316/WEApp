require('./public.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service.js'),
    listTemplate = require('./list.tpl.html');

var publicList = {
    init: function(){
        this.showMenu();
    },
    showMenu: function(){
        service.getPubTypeList({
            page: 1,
            pageSize: 10
        },function(res){
            var iconArr = ['university','photo','book','inbox'];
            $$.each(res,function(ind, val){
                val['icon'] = iconArr[ind];
            });
            var renderData = {
                list: res
            };

            var output = appFunc.renderTpl(listTemplate, renderData);
            $$('#homeView .page[data-page="homeView"] #pubTypeList').html(output);
        });
    }
}

module.exports = publicList;