/*全局变量*/
var USER_NAME = ''

$.messager.defaults.ok = "确认"
function getTags(parentId) {
    var result, url;
    if (!parentId && parentId != 0) { 
        url = "/tag/list" 
    } else {
        url = "/tag/list?parentId=" + parentId
    }
    $.ajax({
        url: url,
        dataType: 'json',
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } 
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
            //window.location.href="./login.html";
        }
    });
    return result;
}

function modifyUser() {
    var srcPwd = document.getElementById("srcPwd").value;
    var destPwd = document.getElementById("destPwd").value;
    $.ajax({
        type:'put', 
        url: "/user/normal/update",
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        data: JSON.stringify({
          "srcPwd": srcPwd,
          "destPwd": destPwd
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        async: false, //同步调用
        success: function(data){
            if (data.status == 0) {
                $('#modifyUser').window('close');
            } else {
                $.messager.alert('失败', '原密码错误！','error');              
            }
        },
        error: function(){
            $.messager.alert('失败', '修改密码错误！','error');
        }
    });
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
            USER_NAME = data.obj.name
            if (data.obj.role == 1) {
                showUserTabs()
            } else {
                hideUserTabs()
            }
            
        },
        error: function(){
            window.location.href="./login.html";
        }
    });
}

function addTag() {
    var tagName = $('#tagName').textbox('getValue')
    var tagParentId = $('#tagParents').combobox('getValue')
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

function addUser() {
    var userName = $('#userName').textbox('getValue')
    var userPwd = $('#userPwd').textbox('getValue')
    $.ajax({
        url: "/user/add",
        xhrFields:{
            withCredentials:true
        }, 
        type: 'post',
        crossDomain: true,
        credentials: 'include', 
        data: JSON.stringify({
          "name": userName,
          "password": userPwd
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        async: false,
        success: function(data){
            if (data.status == 0) {
                $.messager.alert('用户','添加用户成功!');
                $('#addUsers').window('close')
                $('#users').datagrid({'data': getListUsers()})
            } else {
                $.messager.alert('用户','添加用户失败!','error');
            }
        },
        error: function(){
            $.messager.alert('用户','添加用户失败!','error');
        }
    });
}

function modifyUserOperationByAdmin() {
    var row = $('#users').datagrid('getSelected');
    if (!row) {
        $.messager.alert('用户','请先选择一个用户!','info'); 
    } else {
        $('#userNameUpdate').textbox('setValue', row.name)
        $('#userUuidUpdate').textbox('setValue', row.id)
        $('#updateUsers').window('open') 
    }
}

function updateUserByAdmin() {
    var uuid = $('#userUuidUpdate').textbox('getValue')
    var userName = $('#userNameUpdate').textbox('getValue')
    var userPwd = $('#userPwdUpdate').textbox('getValue')
    $.ajax({
        url: "/user/admin/update",
        xhrFields:{
            withCredentials:true
        }, 
        type: 'put',
        crossDomain: true,
        credentials: 'include', 
        data: JSON.stringify({
            "uuid": uuid,
            "name": userName,
            "password": userPwd
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        async: false,
        success: function(data){
            if (data.status == 0) {
                $.messager.alert('用户','修改用户成功!');
                $('#addUsers').window('close')
                $('#users').datagrid({'data': getListUsers()})
            } else {
                $.messager.alert('用户','修改用户失败!','error');
            }
        },
        error: function(){
            $.messager.alert('用户','修改用户失败!','error');
        }
    });
}

function deleteUserByAdmin() {
    var row = $('#users').datagrid('getSelected');
    $.ajax({
        url: "/user/update/status?status=0&id=" + row.id,
        xhrFields:{
            withCredentials:true
        }, 
        type: 'delete',
        crossDomain: true,
        credentials: 'include', 
        contentType: 'application/json;charset=UTF-8',
        async: false,
        success: function(data){
            if (data.status == 0) {
                $.messager.alert('用户','删除用户成功!');
                $('#users').datagrid({'data': getListUsers()})
            } else {
                $.messager.alert('用户','删除用户失败!','error');
            }
        },
        error: function(){
            $.messager.alert('用户','删除用户失败!','error');
        }
    });
}

function modifyTagOperationByAdmin() {
    var row = $('#tags').datagrid('getSelected');
    if (!row) {
        $.messager.alert('标签','请先选择一个标签!','info'); 
    } else {
        $('#tagParentsUpdate').combobox({
            valueField: 'id', 
            textField: 'name',
            //panelHeight:'auto', 
            limitToList: false,
            data: getTags(PARENT_FLAG)
        });
        $('#tagIdUpdate').textbox('setValue', row.id)
        $('#tagNameUpdate').textbox('setValue', row.name)
        $('#tagParentsUpdate').combobox('setText', row.parent)
        $('#tagOrderUpdate').textbox('setValue', row.order)
        $('#updateTags').window('open') 
    }
}

function updateTagByAdmin() {
    var id = $('#tagIdUpdate').textbox('getValue')
    var name = $('#tagNameUpdate').textbox('getValue')
    var parentId = $('#tagParentsUpdate').combobox('getValue')
    var order = $('#tagOrderUpdate').textbox('getValue')
    $.ajax({
        url: "/tag/update",
        xhrFields:{
            withCredentials:true
        }, 
        type: 'put',
        crossDomain: true,
        credentials: 'include', 
        data: JSON.stringify({
            "id": id,
            "name": name,
            "parentId": parentId,
            "order": order
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        async: false,
        success: function(data){
            if (data.status == 0) {
                $.messager.alert('标签','修改标签成功!');
                $('#updateTags').window('close')
                $('#tags').datagrid({'data': getTags()})
            } else {
                $.messager.alert('标签','修改标签失败!','error');
            }
        },
        error: function(){
            $.messager.alert('标签','修改标签失败!','error');
        }
    });
}

function deleteTagByAdmin() {
    var row = $('#tags').datagrid('getSelected');
    $.ajax({
        url: "/tag/delete?status=0&id=" + row.id,
        xhrFields:{
            withCredentials:true
        }, 
        type: 'delete',
        crossDomain: true,
        credentials: 'include',
        contentType: 'application/json;charset=UTF-8', 
        async: false,
        success: function(data){
            if (data.status == 0) {
                $.messager.alert('标签','删除标签成功!');
                $('#users').datagrid({'data': getListUsers()})
            } else {
                $.messager.alert('标签','删除标签失败!','error');
            }
        },
        error: function(){
            $.messager.alert('标签','删除标签失败!','error');
        }
    });
}

function logout() {
    $.ajax({
        url: "/user/logout",
        xhrFields:{
            withCredentials:true
        }, 
        type: 'get',
        crossDomain: true,
        credentials: 'include', 
        contentType: 'application/json;charset=UTF-8',
        async: false,
        success: function(data){
            window.location.href="./login.html";
        },
        error: function(){
            window.location.href="./login.html";
        }
    });
}

function hideUserTabs() {
    $('#tt').tabs('getTab',"用户管理").panel('options').tab.hide();
    $('#tt').tabs('getTab',"标签管理").panel('options').tab.hide();    
}

function showUserTabs() {
    $('#tt').tabs('getTab',"用户管理").panel('options').tab.show();
    $('#tt').tabs('getTab',"标签管理").panel('options').tab.show(); 
}

function getListUsers() {
    var result
    $.ajax({
        url: "/user/list",
        xhrFields:{
            withCredentials:true
        }, 
        type: 'get',
        crossDomain: true,
        credentials: 'include', 
        contentType: 'application/json;charset=UTF-8',
        async: false,
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } 
            var items = []
            $.each(data.obj,function(idx,item){ 
                items[idx] = {
                    id: item.uuid,
                    name: item.name,
                    status: item.status
                }
            })
            result = items
        },
        error: function(){
            window.location.href="./login.html";
        }
    });
    return result
}

function locationCreate() {
    window.location.href = "./create.html"
}

/*页面加载*/ 
window.onload = function () { 
    //检查session是否过期
    isLogin()
    $('#user').linkbutton({text: USER_NAME});
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
        data: getTags(COMPANY_TYPE_FLAG)
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
    $('#tagParents').combobox({
        valueField: 'id', 
        textField: 'name',
        //panelHeight:'auto', 
        limitToList: false,
        data: getTags(PARENT_FLAG)
    });
    $('#unitProperties').combobox({
        valueField: 'id', 
        textField: 'name',
        //panelHeight:'auto', 
        limitToList: false,
        data: getTags(UNIT_PROPERTIES_FLAG)
    });
    $('#parents').combobox({
        valueField: 'id', 
        textField: 'name',
        //panelHeight:'auto', 
        limitToList: false,
        data: getTags(PARENT_FLAG),
        onChange:function(){  
            $('#tags').datagrid({'data': getTags(($('#parents').combobox('getValue')))});  
        } 
    });

    $('#tags').datagrid({'data': getTags()})
    $('#users').datagrid({'data': getListUsers()})
}


