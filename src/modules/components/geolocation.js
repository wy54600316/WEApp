var GlobalLat = null,
    GlobalLong = null;

var geolocation = {
    initGeo: function(){
        $$('#geoInfo').removeClass('show').hide();

        $$('#geoInfo .location>i').removeClass('ios7-location-outline').addClass('preloader');
        $$('#geoInfo .location>span').html("正在获取您所在的位置...");

        GlobalLat = null;
        GlobalLong = null;
    },

    catchGeoInfo: function(){
        $$('#geoInfo').addClass('show').show();
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(geolocation.showPosition,geolocation.showGeoError);
        }else{
            $$('#geoInfo .location').html("无法获取到您所在的地理位置信息");
        }
    },

    showPosition: function(position){
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        $$('#geoInfo .location>i').removeClass('preloader').addClass('ios7-location-outline');
        $$('#geoInfo .location>span').html(( Math.round(lat * 10000)/10000) + '/' + ( Math.round(long * 10000)/10000) );

        GlobalLat = lat;
        GlobalLong = long;
    },

    showGeoError: function(error){
        switch(error.code)
        {
            case error.PERMISSION_DENIED:
                $$('#geoInfo .location').html("您拒绝了系统定位的权限申请");
                break;
            case error.POSITION_UNAVAILABLE:
                $$('#geoInfo .location').html("无法获取到您所在的地理位置信息");
                break;
            case error.TIMEOUT:
                $$('#geoInfo .location').html("获取地理位置信息超时");
                break;
            case error.UNKNOWN_ERROR:
                $$('#geoInfo .location').html("未知错误");
                break;
        }
    },

    getGeo: function(){
        return {
            lat:GlobalLat,
            long:GlobalLong
        };
    },

    cleanGeo: function(){
        weApp.confirm("您将清除定位的地理信息",geolocation.initGeo);
    }
};

module.exports = geolocation;
