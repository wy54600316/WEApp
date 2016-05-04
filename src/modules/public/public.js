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
            res['data'] = [{
                    id: 1,
                    name: '公开课',
                    url: 'page/publist.html?t=公开课',
                    icon: 'university'
                },{
                    id: 2,
                    name: '漫画秀',
                    url: 'page/publist.html?t=漫画秀',
                    icon: 'photo'
                },{
                    id: 3,
                    name: '悦读慧',
                    url: 'page/publist.html?t=悦读慧',
                    icon: 'book'
                },{
                    id: 4,
                    name: '百宝箱',
                    url: 'page/publist.html?t=百宝箱',
                    icon: 'inbox'
                }];

            var iconArr = ['university','photo','book','inbox'];
            $$.each(res,function(ind, val){
                val['icon'] = iconArr[ind];
            });
            var renderData = {
                list: res
            };

            var output = appFunc.renderTpl(listTemplate, renderData);
            $$('#homeView .page[data-page="homeView"]').html(output);
        });
    }
}

module.exports = publicList;