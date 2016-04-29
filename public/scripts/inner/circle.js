var circleApp = new Framework7({
    // animateNavBackIcon: true,
    // 模板预编译
    precompileTemplates: true,
    template7Pages: true,
    template7Data: {
        'circleList': {
            recomm: [],
            mine: []
        },
        'topicList': {
            list: [{title:'帖子'},{title:'帖子2'}]
        }
    }
});

var $$ = Framework7.$;
var mainView = circleApp.addView('.view-main', {
    domCache: true,
    dynamicNavbar: true,
});

// 应用入口 方式1（官方推荐）
$$(document).on('pageInit', function (e) {
  var page = e.detail.page;
})
// 应用入口 方式2
// $$(document).on('pageInit', '.page[data-page="about"]', function (e) {
//   circleApp.alert('Here comes About page');
// })

// 标签监听
$$("#recommTab").on('show', getRecommData);
$$("#mineTab").on('show', getMineData);
// 默认选中标签
circleApp.showTab('#recommTab');

// 拉取推荐圈子列表
function getRecommData(){
    // $$.ajax({
    //     url: "",
    //     method: "POST",
    //     dateType: "json",
    //     data: {},
    //     success: function(){

    //     },
    //     error: function(){

    //     }
    // });
    
    if(circleApp.template7Data.circleList.recomm && circleApp.template7Data.circleList.recomm.length > 0){
        return false;
    }
    circleApp.template7Data.circleList.recomm = [{title:'策划小组'},{title:'策划小组2'},{title:'策划小组'},{title:'策划小组2'},{title:'策划小组'},{title:'策划小组2'},{title:'策划小组'},{title:'策划小组2'},{title:'策划小组'},{title:'策划小组2'},{title:'策划小组'},{title:'策划小组2'}];
    var strHtml = circleApp.templates.circleTemp({
        list: circleApp.template7Data.circleList.recomm
    });
    $$("#recommList").html(strHtml);
}
// 拉取我的圈子列表
function getMineData(){
    // $$.ajax({
    //     url: "",
    //     method: "POST",
    //     dateType: "json",
    //     data: {},
    //     success: function(){

    //     },
    //     error: function(){

    //     }
    // });
    
    if(circleApp.template7Data.circleList.mine && circleApp.template7Data.circleList.mine.length > 0){
        return false;
    }
    circleApp.template7Data.circleList.mine = [{title:'美宣中心'},{title:'美宣中心2'}];
    var strHtml = circleApp.templates.circleTemp({
        list: circleApp.template7Data.circleList.mine
    });
    $$("#mineList").html(strHtml);
}

// 跳转帖子列表
$$(document).on('click', ".citem", function(e){
    mainView.router.loadPage({
        url: "topiclist.html",
        context: circleApp.template7Data.topicList
    });
});
// 跳转帖子详情
$$(document).on('click', ".titem", function(e){
    mainView.router.loadPage({
        url: "topicdetail.html",
        context: circleApp.template7Data.topicList
    });
});