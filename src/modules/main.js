require('framework7');
require('../style/less/app.less');

var appFunc = require('./utils/appFunc'),
    router = require('./router'),
    enter = require('./app');

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        if(appFunc.isPhonegap()) {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        }else{
            window.onload = this.onDeviceReady();
        }
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(event) {
        switch (event) {
            case 'deviceready':
                app.initFramework7();
                break;
        }
    },
    initFramework7: function(){

        //Register custom Template7 helpers
        // Template7.registerHelper('t', function (options){
        //     var key = options.hash.i18n || '';
        //     var keys = key.split('.');

        //     var value;
        //     for (var idx = 0, size = keys.length; idx < size; idx++)
        //     {
        //         if (value != null)
        //         {
        //             value = value[keys[idx]];
        //         } else {
        //             value = i18n[keys[idx]];
        //         }

        //     }
        //     return value;
        // });

        window.$$ = Dom7;
        window.weApp = new Framework7({
            pushState: true,
            popupCloseByOutside:false,
            animateNavBackIcon: true,
            modalTitle: "系统消息",
            modalButtonOk: "确定",
            modalButtonCancel: "取消",
            template7Pages: true,
            template7Data: {
                'page:publicList': {
                    back: "返回",
                    title: '公开课'
                },
                'page:pubdetail': {
                    back: "返回",
                    title: "正文",
                    comment: "评论",
                    forward: "转发"
                }
            }
        });

        window.homeF7View = weApp.addView('#homeView', {
            dynamicNavbar: true,
            domCache: true
        });

        window.talkF7View = weApp.addView('#talkView', {
            dynamicNavbar: true,
            domCache: true
        });

        window.rankF7View = weApp.addView('#rankView', {
            dynamicNavbar: true,
            domCache: true
        });

        // init app
        router.init();
        enter.init();
    }
};

app.initialize();
