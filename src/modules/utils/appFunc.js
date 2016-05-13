require('framework7');

module.exports = {

    isPhonegap: function() {
        return (typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined');
    },

    isWXWebview: function(){
        var ua = navigator.userAgent.toLowerCase();  
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {  
            return false;
        }  
    },

    renderTpl: function(markup,renderData){
        var compiledTemplate = Template7.compile(markup);
        return compiledTemplate(renderData);
    },

    registerHelper: function(func, calc){
        Template7.registerHelper(func, calc);
    },

    isEmail: function(str){
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        return reg.test(str);
    },

    getPageNameInUrl: function(url){
        url = url || '';
        var arr = url.split('.');
        return arr[0];
    },

    isEmpty: function(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    },

    hideToolbar: function() {
        weApp.hideToolbar('.toolbar');
    },

    showToolbar: function() {
        weApp.showToolbar('.toolbar');
    },

    timeFormat: function(ms){

        ms = ms * 1000;

        var d_second,d_minutes, d_hours, d_days;
        var timeNow = new Date().getTime();
        var d = (timeNow - ms)/1000;
        d_days = Math.round(d / (24*60*60));
        d_hours = Math.round(d / (60*60));
        d_minutes = Math.round(d / 60);
        d_second = Math.round(d);
        if (d_days > 0 && d_days < 2) {
            return d_days + "天前";
        } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + "小时前";
        } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + "分钟前";
        } else if (d_minutes <= 0 && d_second >= 0) {
            return "刚刚";
        } else {
            var s = new Date();
            s.setTime(ms);
            return (s.getFullYear() + '-' + f(s.getMonth() + 1) + '-' + f(s.getDate()) + ' '+ f(s.getHours()) + ':'+ f(s.getMinutes()));
        }

        function f(n){
            if(n < 10)
                return '0' + n;
            else
                return n;
        }
    },

    getCharLength: function(str){
        var iLength = 0;
        for(var i = 0;i<str.length;i++)
        {
            if(str.charCodeAt(i) >255)
            {
                iLength += 2;
            }
            else
            {
                iLength += 1;
            }
        }
        return iLength;
    },

    matchUrl: function(string){
        var reg = /((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&;:\/~\+#]*[\w\-\@?^=%&;\/~\+#])?/g;

        string = string.replace(reg,function(a){
            if(a.indexOf('http') !== -1 || a.indexOf('ftp') !== -1){
                return '<a href=\"#\" onclick=\"event.stopPropagation();window.open(\'' + a + '\',\'_blank\')\">' + a + '</a>';
            }
            else
            {
                return '<a href=\"#\" onclick=\"event.stopPropagation();window.open(\'http://' + a + '\',\'_blank\')\">' + a + '</a>';
            }
        });
        return string;
    },

    bindEvents: function(bindings) {
        for (var i in bindings) {
            if(bindings[i].selector) {
                $$(bindings[i].element)
                    .off(bindings[i].event,bindings[i].selector)
                    .on(bindings[i].event,bindings[i].selector , bindings[i].handler);
            }else{
                $$(bindings[i].element)
                    .off(bindings[i].event)
                    .on(bindings[i].event, bindings[i].handler);
            }
        }
    },

    /**
     * 日期格式转换
     * @param  {String} str    日期字符串
     * @param  {String} format 格式
     * @return {String}        格式化后的字符串
     */
    dateFormat: function (str, format) {
        if (!str) return '';
        var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
            d;
        if (Object.prototype.toString.call(str) === '[object Date]') {
            d = str;
        } else if (str.indexOf('/Date(') != -1) {
            d = new Date(parseInt(str.replace('/Date(', '').replace(')/', ''), 10));
        } else if (R_ISO8601_STR.test(str)) {
            d = this.jsonStringToDate(str);
        } else {
            d = new Date(str);
        }
        if (d.toString() == 'Invalid Date') return '';
        var o = {
            'M+': d.getMonth() + 1, //月份
            'd+': d.getDate(), //日
            'h+': d.getHours(), //小时
            'm+': d.getMinutes(), //分
            's+': d.getSeconds(), //秒
            'q+': Math.floor((d.getMonth() + 3) / 3), //季度
            'S': d.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp('(' + k + ')').test(format))
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        return format;
    },

    /**
     * 格式化字符串
     * @return {String} 格式化后的字符串
     */
    stringFormat: function () {
        if (arguments.length == 0) {
            return '';
        }
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    },

    jsonStringToDate: function(string) {
        var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
            match;
        if (match = string.match(R_ISO8601_STR)) {
            var date = new Date(0),
                tzHour = 0,
                tzMin = 0,
                dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear,
                timeSetter = match[8] ? date.setUTCHours : date.setHours
            if (match[9]) {
                tzHour = parseInt(match[9] + match[10], 10)
                tzMin = parseInt(match[9] + match[11], 10)
            }
            dateSetter.call(date, parseInt(match[1], 10), parseInt(match[2], 10) - 1, parseInt(match[3], 10))
            var h = parseInt(match[4] || 0, 10) - tzHour
            var m = parseInt(match[5] || 0, 10) - tzMin
            var s = parseInt(match[6] || 0, 10)
            var ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000)
            timeSetter.call(date, h, m, s, ms)
            return date
        }
        return string
    }
};