$.messager.defaults.ok = "确认"
$.messager.defaults.cancel = "取消"

//检查session是否过期
isLogin()

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

function getSyncTags(id, parentId) {
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
        async: true, //同步调用
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } 
            var items = []
            var itemIndex = 0;
            if (id == 'member') {
                items[itemIndex] = {
                    id: parentId,
                    name: '所有会员',
                    parent: 0,
                    order: 0 
                }
                itemIndex++;
            } 
            if (id == 'attention') {
                items[itemIndex] = {
                    id: parentId,
                    name: '所有关注等级',
                    parent: 0,
                    order: 0 
                }
                itemIndex++;
            } 
            if (id == 'zol') {
                items[itemIndex] = {
                    id: parentId,
                    name: '所有中关村园',
                    parent: 0,
                    order: 0 
                }
                itemIndex++;
            } 
            if (id == 'companyMarket') {
                items[itemIndex] = {
                    id: parentId,
                    name: '所有上市公司',
                    parent: 0,
                    order: 0 
                }
                itemIndex++;
            } 
            if (id == 'highTech') {
                items[itemIndex] = {
                    id: parentId,
                    name: '所有高薪技术',
                    parent: 0,
                    order: 0 
                }
                itemIndex++;
            } 
            $.each(data.obj,function(idx,item){ 
                var parent = convertIdToName(item.parentId)
                items[itemIndex] = {
                    id: item.id,
                    name: item.name,
                    parent: parent,
                    order: item.order
                }
                itemIndex++;
            })

            $('#' + id).combobox('loadData', items)
        },
        error: function(){
            //window.location.href="./login.html";
        }
    });
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
                $.messager.alert('用户', '密码修改成功！','info');
                $('#modifyUser').window('close');
            } else {
                $.messager.alert('用户', '原密码错误！','error');              
            }
        },
        error: function(){
            $.messager.alert('用户', '修改密码错误！','error');
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
                $('#tags').datagrid('loadData', getTags($('#parents').combobox('getValue')))
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
    var message = "确认删除 " + row.name + " 用户?"
    $.messager.confirm('用户', message, function(r) {
        if (r) {
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
    })
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
    var message = "确认删除 " + row.name + " 标签?"
    $.messager.confirm('标签', message, function(r) {
        if (r) {
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
    })
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

function searchClick() {
    $('#companys').datagrid('gotoPage', 1);
    var opts = $('#companys').datagrid('options');
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var limit = start + parseInt(opts.pageSize); 
    $('#companys').datagrid('loadData', searchCompanies(start, limit))
}

function searchCompanies(start, limit) {
    var result = {}
    var name = $('#name').textbox('getValue').trim()
    var tags = []
    var member = $('#member').combobox('getValue').trim()
    var attention = $('#attention').combobox('getValue').trim()
    var region = $('#region').combobox('getValue').trim()
    var zol = $('#zol').combobox('getValue').trim()
    var unitProperties = $('#unitProperties').textbox('getValue').trim()
    var equity = $('#equity').combobox('getValue').trim()
    var companyType = $('#companyType').combobox('getValue').trim()

    var industry = $('#industry').combobox('getValues')
    var companyMarket = $('#companyMarket').textbox('getValue').trim()
    var business = $('#business').combobox('getValues')
    var highTech = $('#highTech').combobox('getValues')
    var businessArea = $('#businessArea').combobox('getValues')
    var segmentMarket = $('#segmentMarket').combobox('getValues')
    var advantages = $('#advantages').combobox('getValues')
    if (!isEmpty(member)) tags.push(member)
    if (!isEmpty(attention)) tags.push(attention)
    if (!isEmpty(region)) tags.push(region)    
    if (!isEmpty(zol)) tags.push(zol) 
    if (!isEmpty(unitProperties)) tags.push(unitProperties) 
    if (!isEmpty(equity)) tags.push(equity) 
    if (!isEmpty(companyType)) tags.push(companyType) 
    if (!isEmpty(industry)) tags = tags.concat(industry) 
    if (!isEmpty(companyMarket)) tags.push(companyMarket) 
    if (!isEmpty(business)) tags = tags.concat(business) 
    if (!isEmpty(highTech)) tags = tags.concat(highTech) 
    if (!isEmpty(businessArea)) tags = tags.concat(businessArea) 
    if (!isEmpty(segmentMarket)) tags = tags.concat(segmentMarket) 
    if (!isEmpty(advantages)) tags = tags.concat(advantages)   
    $.ajax({
        url: "/company/list",
        xhrFields:{
            withCredentials:true
        }, 
        type: 'post',
        crossDomain: true,
        credentials: 'include', 
        data: JSON.stringify({
          "name": name,
          "tags": tags,
          "start": start,
          "limit": limit
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        async: false,
        success: function(data){
            var items = []
            if (data.status == 0) {
                $.each(data.obj.list, function(idx,item){ 
                    items[idx] = {
                        id: item.companyId,    
                        memberCode: item.memberCode == null ? "" : item.memberCode,
                        memberName: item.member == null ? "" : item.member,
                        attention: item.attention == null ? "" : item.attention,
                        name: item.name == null ? "" : item.name,
                        region: item.region == null ? "" : item.region,
                        createTime: item.createTime.substring(0,10),
                        registeredCapital: item.register == null ? "" : item.register,
                        companyType: item.companyType == null ? "" : item.companyType,
                        industry: item.industry == null ? "" : item.industry,
                        business: item.business == null ? "" : item.business,
                        businessArea: item.businessArea == null ? "" : item.businessArea,
                        advantages: item.advantage == null ? "" : item.advantage 
                    }
                })
                result['rows'] = items
                result['total'] = data.obj.count
            } else if (data.status == 2) {
                window.location.href = data.message;
            } else {
                result['rows'] = items
                result['total'] = 0
            }
        },
        error: function(){
            $.messager.alert('企业','查询企业失败!','error');
        }
    });
    return result
}

function createCompany() {
    //window.location.href = "./create.html"
    window.open("./create.html")
}

function updateCompany() {
    var row = $('#companys').datagrid('getSelected');
    if (!row) {
        $.messager.alert('企业','请先选择一个企业!','info'); 
    } else {
        window.open("./update.html?companyId=" + row.id) 
    }
}

function deleteCompany() {
    var row = $('#companys').datagrid('getSelected');
    if (!row) {
        $.messager.alert('企业','请先选择一个企业!','info'); 
    } else { 
        var message = "确认删除 " + row.name + " ?"
        $.messager.confirm('企业', message, function(r) {
            if (r) {
                $.ajax({
                    url: "/company/delete?companyId=" + row.id,
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
                            $.messager.alert('企业','删除企业成功!','info');
                            var opts = $('#companys').datagrid('options');
                            var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
                            var limit = start + parseInt(opts.pageSize); 
                            $('#companys').datagrid('loadData', searchCompanies(start, limit))
                        } else if (data.status == 2) {
                            window.location.href = data.message;
                        } else {
                            $.messager.alert('企业', data.message,'error');
                        }
                    },
                    error: function(){
                        $.messager.alert('企业','删除企业失败!','error');
                    }
                });
            }
        })
    }
}

function addProject() {
    var name = $('#projectName').textbox('getValue').trim()
    var type = $('#projectType').combobox('getValue').trim()
    var address = $('#projectAddress').textbox('getValue').trim()
    var startDate = $('#startDate').datebox('getValue').trim()
    var endDate = $('#endDate').datebox('getValue').trim()
    var remark = $('#projectRemark').textbox('getValue').trim()
    var amount = $('#projectAmount').textbox('getValue').trim()
    $.ajax({
        url: "/project/add",
        xhrFields:{
            withCredentials:true
        }, 
        type: 'post',
        crossDomain: true,
        credentials: 'include', 
        data: JSON.stringify({
          "name": name,
          "type": type,
          "address": address,
          "startDate": startDate,
          "endDate": endDate,
          "remark": remark,
          "amount": amount
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        async: false,
        success: function(data){
            if (data.status == 0) {
                $.messager.alert('项目','添加项目成功!');
                $('#addProject').window('close')
                $('#projects').datagrid('loadData', getProjects())
            } else {
                $.messager.alert('项目','添加项目失败!','error');
            }
        },
        error: function(){
            $.messager.alert('项目','添加项目失败!','error');
        }
    });
} 

function getProjects() {
    var result
    $.ajax({
        url: "/project/list",
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
                    id: item.id,
                    projectName: item.name,
                    projectType: item.type,
                    projectAddress: item.address,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    projectRemark: item.remark,
                    amount: item.amount                
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

function updateProjectClick() {
    var row = $('#projects').datagrid('getSelected');
    if (!row) {
        $.messager.alert('项目','请先选择一个项目!','warn'); 
    } else {
        $('#projectTypeUpdate').combobox({
            valueField: 'id', 
            textField: 'name',
            panelHeight:'auto', 
            limitToList: false,
            data: getTags(PROJECT_TYPE_FLAG)
        });
        $('#projectId').textbox('setValue', row.id)
        $('#projectNameUpdate').textbox('setValue', row.projectName)
        $('#projectTypeUpdate').combobox('setText', row.projectType)
        $('#projectAddressUpdate').textbox('setValue', row.projectAddress)
        $('#startDateUpdate').datebox('setValue', row.startDate)
        $('#endDateUpdate').datebox('setValue', row.endDate)
        $('#projectRemarkUpdate').textbox('setValue', row.projectRemark)
        $('#projectAmountUpdate').numberbox('setValue', row.amount)
        $('#updateProject').window('open')
    }
}

function updateProject() {
    var id = $('#projectId').textbox('getValue').trim()
    var name = $('#projectNameUpdate').textbox('getValue').trim()
    var type = $('#projectTypeUpdate').combobox('getValue').trim()
    var address = $('#projectAddressUpdate').textbox('getValue').trim()
    var startDate = $('#startDateUpdate').datebox('getValue').trim()
    var endDate = $('#endDateUpdate').datebox('getValue').trim()
    var remark = $('#projectRemarkUpdate').textbox('getValue').trim()
    var amount = $('#projectAmountUpdate').textbox('getValue').trim()
    $.ajax({
        url: "/project/update",
        xhrFields:{
            withCredentials:true
        }, 
        type: 'put',
        crossDomain: true,
        credentials: 'include', 
        data: JSON.stringify({
            "id": id,
            "name": name,
            "type": type,
            "address": address,
            "startDate": startDate,
            "endDate": endDate,
            "remark": remark,
            "amount": amount
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        async: false,
        success: function(data){
            if (data.status == 0) {
                $.messager.alert('项目','更新项目成功!');
                $('#updateProject').window('close')
                $('#projects').datagrid('loadData', getProjects())
            } else {
                $.messager.alert('项目','更新项目失败!','error');
            }
        },
        error: function(){
            $.messager.alert('项目','更新项目失败!','error');
        }
    });
}

function deleteProject() {
    var row = $('#projects').datagrid('getSelected');
    if (!row) {
        $.messager.alert('项目','请先选择一个项目!','warn'); 
    } else {
       var message = "确认删除 " + row.projectName + " 项目?"
        $.messager.confirm('企业', message, function(r) {
            if (r) {
                $.ajax({
                    url: "/project/delete?id=" + row.id,
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
                            $.messager.alert('项目','删除项目成功!','info');
                            $('#projects').datagrid('loadData', getProjects())
                        } else if (data.status == 2) {
                            window.location.href = data.message;
                        } else {
                            $.messager.alert('项目', data.message,'error');
                        }
                    },
                    error: function(){
                        $.messager.alert('项目','删除项目失败!','error');
                    }
                });
            }
        })
    }
}

$(function() {
    //会员级别
    // $('#member').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto',
    //     limitToList: false
    // });
    //关注等级
    // $('#attention').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto', 
    //     limitToList: false
    // });
    //地区
    // $('#region').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     //panelHeight:'auto', 
    //     limitToList: true
    // });
    //中关村
    // $('#zol').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     //panelHeight:'auto', 
    //     limitToList: false
    // });
    //单位性质
    // $('#unitProperties').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto', 
    //     limitToList: false
    // });
    //出资方式
    // $('#equity').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto', 
    //     limitToList: false
    // });
    //单位类型
    // $('#companyType').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto', 
    //     limitToList: false
    // });
    //所属行业
    $('#industry').combobox({
        // valueField: 'id', 
        // textField: 'name',
        // panelHeight:'auto', 
        // limitToList: false,
        // multiple: true,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
            //console.log(row);
            var opts = $(this).combobox('options');
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', true);
        },
        onUnselect: function (row) {
            var opts = $(this).combobox('options');
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', false);
        }
    });
    //上市公司
    // $('#companyMarker').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto', 
    //     limitToList: false
    // });
    //主营业务
    $('#business').combobox({
        // valueField: 'id', 
        // textField: 'name',
        // panelHeight:'auto', 
        // limitToList: false,
        // multiple: true,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
            //console.log(row);
            var opts = $(this).combobox('options');
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', true);
        },
        onUnselect: function (row) {
            var opts = $(this).combobox('options');
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', false);
        }
    });
    //高薪技术
    $('#highTech').combobox({
        // valueField: 'id', 
        // textField: 'name',
        // panelHeight:'auto', 
        // limitToList: false,
        // multiple: true,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
            //console.log(row);
            var opts = $(this).combobox('options');
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', true);
        },
        onUnselect: function (row) {
            var opts = $(this).combobox('options');
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', false);
        }
    });
    //业务领域
    $('#businessArea').combobox({
        // valueField: 'id', 
        // textField: 'name',
        // panelHeight:'auto', 
        // multiple: true,
        // limitToList: false,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
            //console.log(row);
            var opts = $(this).combobox('options');
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', true);
        },
        onUnselect: function (row) {
            var opts = $(this).combobox('options');
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', false);
        }
    });
    //细分市场
    $('#segmentMarket').combobox({
        // valueField: 'id', 
        // textField: 'name',
        // //panelHeight:'auto', 
        // multiple: true,
        // limitToList: false,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
            //console.log(row);
            var opts = $(this).combobox('options');
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', true);
        },
        onUnselect: function (row) {
            var opts = $(this).combobox('options');
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', false);
        }
    });
    //单位优势
    $('#advantages').combobox({
        // valueField: 'id', 
        // textField: 'name',
        // panelHeight:'auto', 
        // limitToList: false,
        // multiple: true,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
            //console.log(row);
            var opts = $(this).combobox('options');
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', true);
        },
        onUnselect: function (row) {
            var opts = $(this).combobox('options');
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', false);
        }
    });
    $('#companys').datagrid({
        onDblClickRow: function(rowIndex, rowData) {  
            window.open("./detail.html?companyId=" + rowData.id)
        },
        rowStyler: function(index,row){
            if (index % 2 == 0){
                return 'background-color:#E6E6FA;color:#000;';
            }
        }
    })

    $('#companys').datagrid('getPager').pagination({
        'displayMsg': '共计{total}家企业',
        'showPageList': false,
        'showPageInfo': true,
        onSelectPage: function(pageNum, pageSize) {
            $('#companys').datagrid('loadData', searchCompanies((pageNum - 1) * pageSize, pageSize))
        }
    });
    $('#companys').datagrid('getPanel').removeClass('panel-body').addClass('ggreen-body');
})

/*页面加载*/ 
window.onload = function () { 
    $('#user').linkbutton({text: USER_NAME});
    if (USER_ROLE == 1) {
        showUserTabs()
    } else {
        hideUserTabs()
    }
    getSyncTags('attention', ATTENTION_FLAG)//
    getSyncTags('member', MEMBER_FLAG)//
    getSyncTags('region', REGION_FLAG)
    getSyncTags('zol', ZOL_FLAG)//
    getSyncTags('unitProperties', UNIT_PROPERTIES_FLAG)
    getSyncTags('equity', EQUITY_PARTICIPATION_FLAG)
    getSyncTags('companyType', COMPANY_TYPE_FLAG)
    getSyncTags('industry', INDUSTRIES_FLAG)
    getSyncTags('companyMarket', COMPANY_MARKET_FLAG)//
    getSyncTags('business', BUSINESS_FLAG)
    getSyncTags('highTech', HIGH_TECHNOLOGY_FLAG)//
    getSyncTags('businessArea', BUSINESS_AREA_FLAG)
    getSyncTags('segmentMarket', SEGMENT_MARKET_FLAG)
    getSyncTags('advantages', ADVANTAGES_FLAG)

    $('#tt').tabs({
        onSelect: function(title,index) {
            if (title == "项目管理") {
                $('#projectType').combobox({
                    valueField: 'id', 
                    textField: 'name',
                    panelHeight:'auto', 
                    limitToList: false,
                    data: getTags(PROJECT_TYPE_FLAG)
                });
                $('#projects').datagrid({
                    onDblClickRow: function(rowIndex, rowData) {  
                        window.open("./project.html?projectId=" + rowData.id)
                    },
                    rowStyler: function(index,row){
                        if (index % 2 == 0){
                            return 'background-color:#E6E6FA;color:#000;';
                        }
                    }
                })
                $('#projects').datagrid('loadData', getProjects())

            } else if (title == "企业管理") {
                var opts = $('#companys').datagrid('options');
                var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
                var limit = start + parseInt(opts.pageSize); 
                $('#companys').datagrid('loadData', searchCompanies(start, limit)) 
            } else if (title == "用户管理") {
                $('#users').datagrid('loadData', getListUsers())
            } else if (title == "标签管理") {
                $('#tagParents').combobox({
                    valueField: 'id', 
                    textField: 'name',
                    //panelHeight:'auto', 
                    limitToList: false,
                    data: getTags(PARENT_FLAG)
                });
                $('#parents').combobox({
                    valueField: 'id', 
                    textField: 'name',
                    //panelHeight:'auto', 
                    limitToList: false,
                    data: getTags(PARENT_FLAG),
                    onChange:function(){  
                        $('#tags').datagrid('loadData', getTags(($('#parents').combobox('getValue'))));  
                    } 
                });
                $('#tags').datagrid('loadData', getTags())
            }
        }
    });
    var opts = $('#companys').datagrid('options');
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var limit = start + parseInt(opts.pageSize);  
    $('#companys').datagrid('loadData', searchCompanies(start, limit))
}
