var myApp=new Framework7({}),$$=Framework7.$,mainView=myApp.addView(".view-main",{dynamicNavbar:!0,reloadPages:!1});$$(document).on("pageInit",function(a){a.detail.page}),$$(".button-submit").on("click",function(){myApp.popup(".popup-score")});