/*全局变量*/
const PARENT_FLAG = 0
const MEMBER_FLAG = 1
const COMPANY_FLAG = 8
const REGION_FLAG = 20
const ATTENTION_FLAG = 16
const ZOL_FLAG = 55
const PARENT_NAME = '一级标签'
const MEMBER_NAME = '会员等级'
const COMPANY_NAME = '公司类型'
const REGION_NAME = '地区'
const ATTENTION_NAME = '关注等级'
const ZOL_NAME = '中关村'

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
            var items = []
            $.each(data.obj,function(idx,item){ 
                var parent = convertIdToName(item.parentId)
                items[idx] = {
                    id: item.id,
                    name: item.name,
                    parent: parent,
                    order: item.order
                }
            })
            result = items
        },
        error: function(){
            error.apply(this, arguments);
        }
    });
    return result;
}

function convertIdToName(parentId) {
    var name = ""
    switch(parentId)
    {
    case 0:
      name = PARENT_NAME
      break;
    case 1:
      name = MEMBER_NAME
      break;
    case 8:
      name = COMPANY_NAME
      break;
    case 20:
      name = REGION_NAME
      break;
    case 16:
      name = ATTENTION_NAME
      break;
    case 55:
      name = ZOL_NAME
      break;
    default:
      name = ""
    }
    return name
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
//检查session是否过期
isLogin()

function addTag() {
    var tagName = $('#tagName').textbox('getValue')
    var tagParentId = $('#tagParentId').textbox('getValue')
    var tagOrder = $('#tagOrder').textbox('getValue')
    $.ajax({
        url: "/tag/add",
        xhrFields:{
            withCredentials:true
        }, 
        type: 'post',
        crossDomain: true,
        credentials: 'include', 
        data: JSON.stringify({
          "name": tagName,
          "parentId": tagParentId,
          "order": tagOrder
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        async: false,
        success: function(data){
            if (data.status == 0) {
                $.messager.alert('标签','添加标签成功!');
                $('#tags').datagrid({'data': getTags('')})
                $('#addTags').window('close')
            } else {
                $.messager.alert('标签','添加标签失败!','error');
            }
        },
        error: function(){
            $.messager.alert('标签','添加标签失败!','error');
        }
    });
}

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
    $('#tags').datagrid({'data': getTags('')})
    $('#addCompany').bind('click', function(){
        window.location.href = "./create.html"
    });
     $('#cooperationTimes').tooltip({
                position: 'right',
                content: '<span style="color:#fff">This is the tooltip message.</span>',
                onShow: function(){
                    $(this).tooltip('tip').css({
                        backgroundColor: '#666',
                        borderColor: '#666'
                    });
                }
            });
}

