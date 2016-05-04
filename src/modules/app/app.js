require('./app.less');

var appFunc = require('../utils/appFunc'),
    // homeView = require('../home/home'),
    pubs = require('../public/public'),
    contacts = require('../contacts/contacts'),
    setting = require('../setting/setting');

module.exports = {
    init: function(){
        this.i18next('');
        pubs.init();
        contacts.init();
        setting.init();
        // this.bindEvent();
    },

    i18next: function(content){
        var that = this;

        var renderData = {};

        var output = appFunc.renderTpl(content,renderData);

        $$('.views .i18n').each(function(){
            var value;
            var i18nKey = $$(this).data('i18n');
            var handle = i18nKey.split(']');
            if(handle.length > 1 ){
                var attr = handle[0].replace('[','');
                value = that.i18nValue(handle[1]);
                $$(this).attr(attr,value);
            }else{
                value = that.i18nValue(i18nKey);
                $$(this).html(value);
            }
        });

        return output;
    },

    i18nValue: function(key){

        var keys = key.split('.');

        var value;
        for (var idx = 0, size = keys.length; idx < size; idx++)
        {
            if (value != null)
            {
                value = value[keys[idx]];
            } else {
                value = i18n[keys[idx]];
            }

        }
        return value;
    },

    bindEvent: function(){
        var bindings = [{
            element: '.toolbar',
            selector: '.tab-link',
            event: 'click',
            handler: function(e){
                var that = this;
                var index = $$(that).index();
                var btns = [];
                if(index == 0){
                    btns = [
                        {
                            text: '百宝箱',
                            onClick: function(){
                                hiApp.alert('待开放...');
                            }
                        },
                        {
                            text: '漫画秀',
                            onClick: function(){
                                hiApp.alert('待开放...');
                            }
                        },
                        {
                            text: '悦读慧',
                            onClick: function(){
                                hiApp.alert('待开放...');
                            }
                        },
                        {
                            text: '公开课',
                            onClick: function(){
                                homeF7View.router.load({url:'page/feedback.html'});
                                $$(that).parent().find('.tab-link').removeClass('active');
                                $$(that).addClass('active');
                            }
                        }
                    ];
                }else if(index == 1){
                    btns = [
                        {
                            text: '一周一问',
                            onClick: function(){
                                hiApp.alert('待开放...');
                            }
                        },
                        {
                            text: '一周一答',
                            onClick: function(){
                                hiApp.alert('待开放...');
                            }
                        }
                    ];
                }else if(index == 2){
                    btns = [
                        {
                            text: '排行榜',
                            onClick: function(){
                                hiApp.alert('待开放...');
                            }
                        },
                        {
                            text: '学友圈',
                            onClick: function(){
                                hiApp.alert('待开放...');
                            }
                        }
                    ];
                }

                hiApp.actions(this, btns);
            }
        }];

        appFunc.bindEvents(bindings);
    }
};