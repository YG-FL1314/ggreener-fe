/*全局变量*/
/*全局变量*/
const MEMBER_FLAG = 1
const COMPANY_FLAG = 8
const REGION_FLAG = 20
const ATTENTION_FLAG = 16
const ZOL_FLAG = 55

$.messager.defaults.ok = "确认"
function getTags(parentId) {
    var result;
    $.ajax({
        url: "/tag/list?parentId=" + parentId,
        dataType: 'json',
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        success: function(data){
            var items = $.each(data.obj,function(idx,item){ 
                return {
                    id: item.id,
                    name: item.name
                };
            })
            result = items
        },
        error: function(){
            error.apply(this, arguments);
        }
    });
    return result;
}

function isLogin() {
     $.ajax({
        url: "/user/islogin",
        dataType: 'json',
                xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false,
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } else if (data.status == 1){
                window.location.href="./login.html";
            }

        },
        error: function(){
            window.location.href="./login.html";
        }
    });
}

//时间戳的转化
function dateParser(s){
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0],10);
    var m = parseInt(ss[1],10);
    var d = parseInt(ss[2],10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
        return new Date(y,m-1,d);
    } else {
        return new Date();
    }
}
function dateFormatter(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}

//检查session是否过期
isLogin()

/*页面加载*/ 
window.onload = function () { 
    $('#member').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto',
        limitToList: false,
        data: getTags(MEMBER_FLAG)
    });

    $('#companyTypes').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: getTags(COMPANY_FLAG)
    });
    $('#region').combobox({
        valueField: 'id', 
        textField: 'name',
        //panelHeight:'auto', 
        limitToList: true,
        data: getTags(REGION_FLAG)
    });
    $('#attention').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: getTags(ATTENTION_FLAG)
    });
    $('#zol').combobox({
        valueField: 'id', 
        textField: 'name',
        //panelHeight:'auto', 
        limitToList: false,
        data: getTags(ZOL_FLAG)
    });
}