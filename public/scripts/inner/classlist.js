var myApp = new Framework7({
});

var $$ = Framework7.$;
var mainView = myApp.addView('.view-main', {
    // 激活动态navBar
    dynamicNavbar: true,
    reloadPages: false
});

$$(document).on('pageInit', function(e) {
    var page = e.detail.page;
})

$$('.button-submit').on('click', function() {
    // myApp.confirm('确定要提交吗？', '操作确认', function() {
            myApp.popup('.popup-score');
        // myApp.showIndicator();
        // myApp.hideIndicator();
    // });
});