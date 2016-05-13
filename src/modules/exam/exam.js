require('./exam.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./exam.tpl.html'),
    popupTpl = require('./examPopup.tpl.html');

var examModule = {
    dataObj: {},
    init: function(query){
        appFunc.hideToolbar();
        this.getQuestions();
        this.bindEvent();
    },
    getQuestions: function(){
        service.getQuestions({
        },function(res){
            examModule.dataObj = res;
            examModule.renderData();
        });
    },
    renderData: function(){
        var data = {
            obj: examModule.dataObj
        };
        appFunc.registerHelper('typeStr', function(v1, opt){
            var str = '';
            if(v1 == 1){
                str = '单选题';
            }else if(v1 == 2){
                str = '多选题';
            }else if(v1 == 3){
                str = '留言';
            }
            return str;
        });

        appFunc.registerHelper('indexPlus', function(v1, opt){
            this._index = v1;
            return this._index+1;
        });

        appFunc.registerHelper('typeCompare', function(v1, opt){
            if(v1 == 1){
                return opt.inverse(this);
            }else{
                return opt.fn(this);
            }
        });

        var output = appFunc.renderTpl(template, data);
        $$('#talkView').find('#examContent').html(output);
    },
    submitExam: function(){
        var prmObj = {
            id: examModule.dataObj.id,
            questions: []
        };
        try{
            $$.each(examModule.dataObj.questions, function(ind, val){
                var varr = $$("input[name=ck-"+ind+"]:checked");
                if(!varr || varr.length <= 0){
                    // weApp.alert("第"+(ind+1)+"题请选择答案");
                    throw "第"+(ind+1)+"题请选择答案";
                }
                var arr = [];
                $$.each(varr, function(ind2, val2){
                    arr.push({id: $$(val2).val()});
                });
                prmObj.questions.push({id: val.id,answers:arr});
            });
        }catch(e){
            weApp.alert(e);
            return false;
        }

        service.commitExam({
            obj: prmObj
        }, function(res){
            var data = {
                obj: res
            };

            appFunc.registerHelper('designName', function(v1, opt){
                if(v1 >= 90){
                    return "神童";
                }else if(v1 >= 80){
                    return "学霸";
                }else if(v1 >= 70){
                    return "棒棒哒";
                }else{
                    return "逆袭吧"
                }
            });
            var output = appFunc.renderTpl(popupTpl, data);
            weApp.popup(output);
        });
    },
    closePopup: function(){
        talkF7View.router.back();
        // weApp.closeModal('.popup-score');

    },
    bindEvent: function(){
        var bindings = [{
            element: '#talkView',
            selector: '#submitExamBtn',
            event: 'click',
            handler: this.submitExam
        },{
            element: 'body',
            selector: '.popup-score',
            event: 'closed',
            handler: this.closePopup
        }];

        appFunc.bindEvents(bindings);
    }
}

module.exports = examModule;