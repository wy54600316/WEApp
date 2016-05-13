var appFunc = require('./appFunc'),
    networkStatus = require('../components/networkStatus');

module.exports = {

    search: function(code, array){
        for (var i=0;i< array.length; i++){
            if (array[i].code === code) {
                return array[i];
            }
        }
        return false;
    },

    getRequestURL: function(options){
        //var host = apiServerHost || window.location.host;
        //var port = options.port || window.location.port;
        var query = options.query || {};
        var func = options.func || '';
        var hostMain = 'http://168.168.134.18:6914/api/' + func;
        // var hostMain = 'api/' + func + '.json';

        var apiServer = hostMain + (appFunc.isEmpty(query) ? '' : '?');

        var name;
        for (name in query) {
            apiServer += name + '=' + query[name] + '&';
        }

        return apiServer.replace(/&$/gi, '');
    },

    simpleCall: function(options,callback){
        var that = this;

        options = options || {};
        options.data = options.data ? options.data : '';

        //If you access your server api ,please user `post` method.
        options.method = options.method || 'GET';
        //options.method = options.method || 'POST';

        if(appFunc.isPhonegap()){
            //Check network connection
            var network = networkStatus.checkConnection();
            if(network === 'NoNetwork'){

                weApp.alert("无网络连接", function(){
                    weApp.hideIndicator();
                    weApp.hidePreloader();
                });

                return false;
            }
        }

        weApp.showIndicator();
        $$.ajax({
            headers:{
                Authorization:'Bearer rUkpqKNQ_O59NQBjBPyd1bW7ukqY7z2wKX1VyVfk1ZoKawco2voJ6ekit_Q_JpmV6CzNkq2yq2gsw0DC28oCOWf3pwSokOuMixcQlXxtk1yWPaEUPexQDXmKAtLvwjhgKbSYamakjpJJET5LsLlj8sfV0iZhL8yd1bADDUpWhSD7VZrOOPjWJ2HdcPnPcFKHbkculyUosN3jPmbLOL1UhCX1zMrSTzF-Gox6z2lVTi0hWpn3mI-hCHWdtnqV99XDvRVBwJ7D5HAMFdmX6nqX3BtZUFQ33525sLdmslLU0Dchc8NI7MOMsZ93Zt59NENHDlM-McHpkUIzZktXOJNuPN973P4Rh5fqXn2JBGIDzt1da9QMAliRGsm7ud4x41yaZw-R134M1oIzI7jt6uAcwUuT7gE3cPESusb2Ab4Lli_3DJCqJqUvcImeaoiA3L7keiTAIMJPk6mrPmTN2y5CrTg1rNg'
            },
            url: that.getRequestURL(options) ,
            method: options.method,
            data: options.data,
            success:function(data){
                data = data ? JSON.parse(data) : '';

                var codes = [
                    {code:10000, message:'Your session is invalid, please login again',path:'/'},
                    {code:10001, message:'Unknown error,please login again',path:'tpl/login.html'},
                    {code:20001, message:'User name or password does not match',path:'/'}
                ];

                var codeLevel = that.search(data.err_code,codes);

                if(!codeLevel){

                    (typeof(callback) === 'function') ? callback(data) : '';

                }else{

                    weApp.alert(codeLevel.message,function(){
                        weApp.hideIndicator();
                        weApp.hidePreloader();
                    });
                }
            },
            complete: function(){
                weApp.hideIndicator();
            }
        });

    }
};