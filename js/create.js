/*全局变量*/
var COMPANY_ID = ''

$.messager.defaults.ok = "确认"

//检查session是否过期
isLogin()

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
            if (data.status == 2) {
                window.location.href = data.message
            } 
            var items = []
            $.each(data.obj,function(idx,item){ 
                items[idx] = {
                    id: item.id,
                    name: item.name
                }
            })
            result = items
        },
        error: function(){
            $.messager.alert('失败', '获取标签列表失败','error');
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
            $.each(data.obj,function(idx,item){ 
                var parent = convertIdToName(item.parentId)
                items[idx] = {
                    id: item.id,
                    name: item.name,
                    parent: parent,
                    order: item.order
                }
            })
            $('#' + id).combobox('loadData', items)
        },
        error: function(){
            //window.location.href="./login.html";
        }
    });
}

function cancel() {
    window.location.href = './ggreen.html'
}

function addCompany() {
    var tags = []
    var name = $('#name').textbox('getValue').trim()
    var attention = $('#attention').combobox('getValue').trim()
    var region = $('#region').combobox('getValue').trim()
    var zol = $('#zol').combobox('getValue').trim()
    var unitProperties = $('#unitProperties').combobox('getValue').trim()
    var createTime = $('#createTime').datebox('getValue').trim()
    var register = $('#register').textbox('getValue').trim()
    var equity = $('#equity').combobox('getValue').trim()
    var highTech = $('#highTech').combobox('getValues')
    var companyMarket = $('#companyMarket').combobox('getValue').trim()
    var sharesCode = $('#sharesCode').textbox('getValue').trim()
    var companyTypes = $('#companyTypes').combobox('getValue').trim()
    var industries = $('#industries').combobox('getValues')
    var business = $('#business').combobox('getValues')
    var businessArea = $('#businessArea').combobox('getValues')
    var segmentMarket = $('#segmentMarket').combobox('getValues')
    var techProduct = $('#techProduct').combobox('getValue').trim()
    var patents = $('#patents').textbox('getValue').trim()
    var utilityPatents = $('#utilityPatents').textbox('getValue').trim()
    var softwares = $('#softwares').textbox('getValue').trim()
    var advantages = $('#advantages').combobox('getValues')
    var staffNumber = $('#staffNumber').textbox('getValue').trim()
    var technicians = $('#technicians').textbox('getValue').trim() 
    var officeArea = $('#officeArea').textbox('getValue').trim() 
    var products = $('#products').textbox('getValue').trim()
    var telephone = $('#companyPhone').textbox('getValue').trim()
    var fax = $('#companyFax').textbox('getValue').trim()
    var website = $('#companyWebsite').textbox('getValue').trim()
    var address = $('#companyAddress').textbox('getValue').trim()
    var honor = $('#honor').textbox('getValue').trim()
    var brief = $('#brief').textbox('getValue').trim()
    if (!isEmpty(attention)) tags.push(attention)
    if (!isEmpty(region)) tags.push(region)    
    if (!isEmpty(zol)) tags.push(zol) 
    if (!isEmpty(unitProperties)) tags.push(unitProperties) 
    if (!isEmpty(equity)) tags.push(equity) 
    if (!isEmpty(companyTypes)) tags.push(companyTypes) 
    if (!isEmpty(industries)) tags = tags.concat(industries) 
    if (!isEmpty(companyMarket)) tags.push(companyMarket) 
    if (!isEmpty(business)) tags = tags.concat(business) 
    if (!isEmpty(highTech)) tags = tags.concat(highTech) 
    if (!isEmpty(businessArea)) tags = tags.concat(businessArea) 
    if (!isEmpty(segmentMarket)) tags = tags.concat(segmentMarket) 
    if (!isEmpty(advantages)) tags = tags.concat(advantages)   

    $.ajax({
        type:'post',
        url: "/company/add",
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        data: JSON.stringify({
          "tags": tags,
          "name": name,
          "establishedTime": createTime,
          "registeredCapital": register,
          "sharesCode": sharesCode,
          "patents": patents,
          "utilityPatents": utilityPatents,
          "softwares": softwares,
          "officeArea": officeArea,
          "staffNumber": staffNumber,
          "technicians": technicians,
          "products": products,
          "telephone": telephone,
          "fax": fax,
          "website": website,
          "address": address,
          "honor": honor,
          "brief": brief
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } else if (data.status == 0){
                COMPANY_ID = data.obj.id
                $.messager.alert('公司','添加公司成功!','info');
                $('#tt').tabs('select', '会员信息');
            } else {
                $.messager.alert('公司',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('公司','添加公司失败!','error');
        }
    });
}

function addMember() {
    if (COMPANY_ID == '') {
        $.messager.alert('公司','请先添加公司！','info');
    } else {
        var memberCode = $('#memberCode').textbox('getValue').trim()
        var tagId = $('#member').combobox('getValue').trim()
        var joiningTime = $('#joiningTime').datebox('getValue').trim()
        var validityTime = $('#validityTime').datebox('getValue').trim()

        $.ajax({
            type:'post',
            url: "/member/add",
            xhrFields:{
                withCredentials:true
            }, 
            crossDomain: true,
            credentials: 'include',  
            async: false, //同步调用
            data: JSON.stringify({
              "companyId": COMPANY_ID,
              "tagId": tagId,
              "memberCode": memberCode,
              "joiningTime": joiningTime,
              "validityTime": validityTime
            }),
            dataType:'json', 
            contentType: 'application/json;charset=UTF-8',
            success: function(data){
                if (data.status == 2) {
                    window.location.href = data.message
                } else if (data.status == 0){
                    $.messager.alert('公司','添加会员信息成功!','info');
                    $('#tt').tabs('select', '需求信息');
                } else {
                    $.messager.alert('公司',data.message,'error');
                }
                
            },
            error: function(){
                $.messager.alert('公司','添加会员信息失败!','error');
            }
        });
    }
}

function addContact() {
    if (COMPANY_ID == '') {
        $.messager.alert('公司','请先添加公司！','info');
    } else {
        var name = $('#contactNameInput').textbox('getValue').trim()
        var duty = $('#contactDutyInput').textbox('getValue').trim()
        var phone1 = $('#contactPhone1Input').textbox('getValue').trim()
        var phone2 = $('#contactPhone2Input').textbox('getValue').trim()
        var tel = $('#contactTelInput').textbox('getValue').trim()
        var mail = $('#mailInput').textbox('getValue').trim()
        var weixin = $('#weixinInput').textbox('getValue').trim()
        var qq = $('#qqInput').textbox('getValue').trim()
        var remark = $('#remarkInput').textbox('getValue').trim()
        var order = $('#contactOrder').numberbox('getValue')
        $.ajax({
            type:'post',
            url: "/contact/add",
            xhrFields:{
                withCredentials:true
            }, 
            crossDomain: true,
            credentials: 'include',  
            async: false, //同步调用
            data: JSON.stringify({
              "companyId": COMPANY_ID,
              "name": name,
              "duty": duty,
              "mail": mail,
              "weixin": weixin,
              "remark": remark,
              "qq": qq,
              "telephone": phone1 + "," + phone2,
              "phone":tel,
              "order": order
            }),
            dataType:'json', 
            contentType: 'application/json;charset=UTF-8',
            success: function(data){
                if (data.status == 2) {
                    window.location.href = data.message
                } else if (data.status == 0){
                    $.messager.alert('公司','添加联系人成功!','info');
                    $('#addContact').window('close')
                    $('#contact').datagrid('loadData', listContacts(COMPANY_ID))
                    $('#chatOthers').datagrid('loadData', listContacts(COMPANY_ID))
                } else {
                    $.messager.alert('公司',data.message,'error');
                }
                
            },
            error: function(){
                $.messager.alert('公司','添加联系人失败!','error');
            }
        });
    }
}

function listContacts(companyId) {
    var result = []
    if (COMPANY_ID == '') {
        $.messager.alert('公司','请先添加公司！','info');
    } else {
        $.ajax({
            type:'get',
            url: "/contact/list?companyId=" + companyId,
            xhrFields:{
                withCredentials:true
            }, 
            crossDomain: true,
            credentials: 'include',  
            async: false, //同步调用
            contentType: 'application/json;charset=UTF-8',
            success: function(data){
                if (data.status == 2) {
                    window.location.href = data.message
                } else if (data.status == 0){
                    var items = []
                    $.each(data.obj,function(idx,item){ 
                        var phone1 = ""
                        var phone2 = ""
                        var telephones = item.telephone.split(",")
                        if (telephones.length == 2) {
                            phone1 = telephones[0];phone2 = telephones[1];
                        } else if (telephones.length == 1) {
                            phone1 = telephones[0]
                        }
                        items[idx] = {
                            id: item.id,
                            contactName: item.name,
                            duty: item.duty,
                            phone1: phone1,
                            phone2: phone2,
                            telephone: item.phone,
                            mail: item.mail,
                            weixin: item.weixin,
                            qq: item.qq,
                            remark: item.remark,
                            order: item.order
                        }
                    })
                    result = items
                } else {
                    $.messager.alert('公司',data.message,'error');
                }
                
            },
            error: function(){
                $.messager.alert('公司','获取联系人失败!','error');
            }
        });
    }
    return result
}

function updateContractWindow() {
    var row = $('#contact').datagrid('getSelected');
    if (!row) {
        $.messager.alert('联系人','请先选择一个联系人!','info'); 
    } else {
        $('#contactId').textbox('setValue', row.id)
        $('#contactNameUpdate').textbox('setValue', row.contactName)
        $('#contactDutyUpdate').textbox('setValue', row.duty)
        $('#contactPhone1Update').textbox('setValue', row.phone1)
        $('#contactPhone2Update').textbox('setValue', row.phone2)
        $('#contactTelUpdate').textbox('setValue', row.telephone)
        $('#mailUpdate').textbox('setValue', row.mail)
        $('#weixinUpdate').textbox('setValue', row.weixin)
        $('#qqUpdate').textbox('setValue', row.qq)
        $('#remarkUpdate').textbox('setValue', row.remark)
        $('#contactOrderUpdate').numberbox('setValue', row.order)
        $('#updateContact').window('open') 
    }
}

function updateContact() {
    var id = $('#contactId').textbox('getValue').trim()
    var name = $('#contactNameUpdate').textbox('getValue').trim()
    var duty = $('#contactDutyUpdate').textbox('getValue').trim()
    var phone1 = $('#contactPhone1Update').textbox('getValue').trim()
    var phone2 = $('#contactPhone2Update').textbox('getValue').trim()
    var tel = $('#contactTelUpdate').textbox('getValue').trim()
    var mail = $('#mailUpdate').textbox('getValue').trim()
    var weixin = $('#weixinUpdate').textbox('getValue').trim()
    var qq = $('#qqUpdate').textbox('getValue').trim()
    var remark = $('#remarkUpdate').textbox('getValue').trim()
    var order = $('#contactOrderUpdate').numberbox('getValue').trim()
    $.ajax({
        type:'put',
        url: "/contact/update",
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        data: JSON.stringify({
            "id": id,
            "name": name,
            "duty": duty,
            "mail": mail,
            "weixin": weixin,
            "remark": remark,
            "qq": qq,
            "telephone": phone1 + "," + phone2,
            "phone":tel,
            "order": order
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } else if (data.status == 0){
                $.messager.alert('企业','更新联系人成功!','info');
                $('#updateContact').window('close')
                $('#contact').datagrid('loadData', listContacts(COMPANY_ID))
                $('#chatOthers').datagrid('loadData', listContacts(COMPANY_ID))
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','更新联系人失败!','error');
        }
    });
}

function updateBaseContact() {
    var telephone = $('#companyPhone').textbox('getValue').trim()
    var fax = $('#companyFax').textbox('getValue').trim()
    var website = $('#companyWebsite').textbox('getValue').trim()
    var address = $('#companyAddress').textbox('getValue').trim()
    $.ajax({
        type:'put',
        url: "/company/update",
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        data: JSON.stringify({
            "id": COMPANY_ID,
            "telephone": telephone,
            "fax": fax,
            "website": website,
            "address": address 
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } else if (data.status == 0){
                COMPANY_ID = data.obj.id
                $.messager.alert('企业','更新企业联系信息成功!','info');
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','更新企业联系信息失败!','error');
        }
    });
}

function deleteContact() {
    var row = $('#contact').datagrid('getSelected');
    if (!row) {
        $.messager.alert('企业','请先选择一条联系人信息!','info'); 
    } else {
        var message = "确认删除 " + row.contactName + " 联系人?"
        $.messager.confirm('联系人', message, function(r) {
            if (r) {
                $.ajax({
                    type:'delete',
                    url: "/contact/delete?id="+row.id,
                    xhrFields:{
                        withCredentials:true
                    }, 
                    crossDomain: true,
                    credentials: 'include',  
                    async: false, //同步调用
                    contentType: 'application/json;charset=UTF-8',
                    success: function(data){
                        if (data.status == 2) {
                            window.location.href = data.message
                        } else if (data.status == 0){
                            $.messager.alert('企业','删除联系人信息成功!','info');
                            $('#contact').datagrid('loadData', listContacts(COMPANY_ID))
                            $('#chatOthers').datagrid('loadData', listContacts(COMPANY_ID))
                        } else {
                            $.messager.alert('企业',data.message,'error');
                        }
                    },
                    error: function(){
                        $.messager.alert('企业','删除联系人信息失败!','error');
                    }
                });
            }
        })
    }
}

function addChatClick() {
    if (COMPANY_ID == '') {
        $.messager.alert('企业','请先添加企业！','info');
    } else {
         $('#chatType').combobox({
            valueField: 'id', 
            textField: 'name',
            panelHeight:'auto', 
            limitToList: true,
            data: getTags(CHAT_TYPE_FLAG)
        });

        $('#chatOwners').combobox({
            valueField: 'id', 
            textField: 'nickName',
            panelHeight:'auto', 
            limitToList: true,
            multiple: true,
            data: getListUsers(),
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

        $('#chatOthers').combobox({
            valueField: 'id', 
            textField: 'contactName',
            panelHeight:'auto', 
            limitToList: true,
            multiple: true,
            data: listContacts(COMPANY_ID),
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
        $('#addChat').window('open')
    }
}

function addChat() {
    var chatTime = $('#chatTime').datebox('getValue').trim()
    var chatType = $('#chatType').combobox('getValue').trim()
    var chatAddress = $('#chatAddress').textbox('getValue').trim()
    var chatOthers = $('#chatOthers').combobox('getText')
    var chatOwners = $('#chatOwners').combobox('getText')
    var chatContent = $('#chatContent').textbox('getValue')
    $.ajax({
        type:'post',
        url: "/chat/add",
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        data: JSON.stringify({
            "companyId": COMPANY_ID,
            "chatTime": chatTime,
            "chatType": chatType,
            "chatAddress": chatAddress,
            "customers": chatOthers,
            "owners": chatOwners,
            "content": chatContent
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } else if (data.status == 0){
                $.messager.alert('企业','添加互动信息成功!','info');
                $('#addChat').window('close')
                var opts = $('#chat').datagrid('options');
                var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
                var limit = start + parseInt(opts.pageSize);
                $('#chat').datagrid('loadData', listChats(COMPANY_ID, start, limit))
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','添加联系人失败!','error');
        }
    });
}

function updateChatClick() {
    var row = $('#chat').datagrid('getSelected');
    if (!row) {
        $.messager.alert('互动信息','请先选择一条互动信息!','info'); 
    } else {
        $('#chatTypeUpdate').combobox({
            valueField: 'id', 
            textField: 'name',
            panelHeight:'auto', 
            limitToList: true,
            data: getTags(CHAT_TYPE_FLAG)
        });

        $('#chatOwnersUpdate').combobox({
            valueField: 'id', 
            textField: 'nickName',
            panelHeight:'auto', 
            limitToList: true,
            multiple: true,
            data: getListUsers(),
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

        $('#chatOthersUpdate').combobox({
            valueField: 'id', 
            textField: 'contactName',
            panelHeight:'auto', 
            limitToList: true,
            multiple: true,
            data: listContacts(COMPANY_ID),
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
        $('#chatId').textbox('setValue', row.id)
        $('#chatTimeUpdate').datebox('setValue', row.chatTime.substring(0,10))
        $('#chatTypeUpdate').combobox('setText', row.chatType)
        $('#chatAddressUpdate').textbox('setValue', row.chatAddress)
        $('#chatOthersUpdate').combobox('setText', row.others)
        $('#chatOwnersUpdate').combobox('setText', row.owners)
        $('#chatContentUpdate').textbox('setValue', row.content)
        $('#updateChat').window('open') 
    }
}

function updateChat() {
    var chatId = $('#chatId').textbox('getValue')
    var chatTime = $('#chatTimeUpdate').datebox('getValue').trim()
    var chatType = $('#chatTypeUpdate').combobox('getValue').trim()
    var chatAddress = $('#chatAddressUpdate').textbox('getValue').trim()
    var chatOthers = $('#chatOthersUpdate').combobox('getText').trim()
    var chatOwners = $('#chatOwnersUpdate').combobox('getText').trim()
    var chatContent = $('#chatContentUpdate').textbox('getValue').trim()
    $.ajax({
        type:'put',
        url: "/chat/update",
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        data: JSON.stringify({
            "id": chatId,
            "chatTime": chatTime,
            "chatType": chatType,
            "chatAddress": chatAddress,
            "customers": chatOthers,
            "owners": chatOwners,
            "content": chatContent
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } else if (data.status == 0){
                $.messager.alert('企业','更新互动信息成功!','info');
                $('#updateChat').window('close')
                var opts = $('#chat').datagrid('options');
                var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
                var limit = start + parseInt(opts.pageSize);
                $('#chat').datagrid('loadData', listChats(COMPANY_ID, start, limit))
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','更新互动信息失败!','error');
        }
    });
}

function deleteChat() {
    var row = $('#chat').datagrid('getSelected');
    if (!row) {
        $.messager.alert('互动信息','请先选择一条互动信息!','info'); 
    } else {
        var message = "确认删除该条互动信息?"
        $.messager.confirm('互动信息', message, function(r) {
            if (r) {
                $.ajax({
                    type:'delete',
                    url: "/chat/delete?id="+row.id,
                    xhrFields:{
                        withCredentials:true
                    }, 
                    crossDomain: true,
                    credentials: 'include',  
                    async: false, //同步调用
                    contentType: 'application/json;charset=UTF-8',
                    success: function(data){
                        if (data.status == 2) {
                            window.location.href = data.message
                        } else if (data.status == 0){
                            $.messager.alert('企业','删除互动信息成功!','info');
                            var opts = $('#chat').datagrid('options');
                            var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
                            var limit = start + parseInt(opts.pageSize);
                            $('#chat').datagrid('loadData', listChats(COMPANY_ID, start, limit))
                        } else {
                            $.messager.alert('企业',data.message,'error');
                        }
                    },
                    error: function(){
                        $.messager.alert('企业','删除互动信息失败!','error');
                    }
                })
            }
        })
    }
}

function listChats(companyId, start, limit) {
    var result = {}
    $.ajax({
        type:'get',
        url: "/chat/list?companyId=" + companyId + "&start=" + start + "&limit=" + limit,
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            var items = []
            if (data.status == 2) {
                window.location.href = data.message
            } else if (data.status == 0){
                $.each(data.obj.list, function(idx,item){ 
                    items[idx] = {
                        id: item.id,
                        companyId: item.companyId,
                        chatTime: item.chatTime.substring(0, 10),
                        chatType: item.chatType,
                        chatAddress: item.chatAddress,
                        others: item.customers,
                        owners: item.owners,
                        content: item.content
                    }
                })
                result['rows'] = items
                result['total'] = data.obj.count
            } else {
                result['rows'] = items
                result['total'] = 0
            }
            
        },
        error: function(){
            $.messager.alert('企业','获取互动信息失败!','error');
        }
    });
    return result
}

function addInvoice() {
    if (COMPANY_ID == '') {
        $.messager.alert('企业','请先添加企业！','info');
    } else {
        var invoiceName = $('#invoiceName').textbox('getValue').trim()
        var invoiceNumber = $('#invoiceNumber').textbox('getValue').trim()
        var invoiceAddress = $('#invoiceAddress').textbox('getValue').trim()
        var invoicePhone = $('#invoicePhone').textbox('getValue').trim()
        var invoiceBank = $('#invoiceBank').textbox('getValue').trim()
        var invoiceAccount = $('#invoiceAccount').textbox('getValue').trim()
        $.ajax({
            type:'post',
            url: "/invoice/add",
            xhrFields:{
                withCredentials:true
            }, 
            crossDomain: true,
            credentials: 'include',  
            async: false, //同步调用
            data: JSON.stringify({
                "companyId": COMPANY_ID,
                "name": invoiceName,
                "payNumber": invoiceNumber,
                "address": invoiceAddress,
                "telephone": invoicePhone,
                "bankName": invoiceBank,
                "accountNumber": invoiceAccount
            }),
            dataType:'json', 
            contentType: 'application/json;charset=UTF-8',
            success: function(data){
                if (data.status == 2) {
                    window.location.href = data.message
                } else if (data.status == 0){
                    $.messager.alert('企业','添加开票信息成功!','info');
                    $('#addInvoice').window('close')
                    $('#invoice').datagrid({'data': listInvoices(COMPANY_ID)})
                } else {
                    $.messager.alert('企业',data.message,'error');
                }
                
            },
            error: function(){
                $.messager.alert('企业','添加开票信息失败!','error');
            }
        });
    }
}

function listInvoices(companyId) {
    var result = []
    $.ajax({
        type:'get',
        url: "/invoice/list?companyId=" + companyId,
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        contentType: 'application/json;charset=UTF-8',
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } else if (data.status == 0){
                var items = []
                $.each(data.obj,function(idx,item){ 
                    items[idx] = {
                        id: item.id,
                        invoiceName: item.name,
                        invoiceAddress: item.address,
                        invoiceNumber: item.payNumber,
                        invoicePhone: item.telephone,
                        invoiceBank: item.bankName,
                        invoiceAccount: item.accountNumber
                    }
                })
                result = items
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','获取开票信息失败!','error');
        }
    });
    return result
}

function updateInvoiceClick() {
    var row = $('#invoice').datagrid('getSelected');
    if (!row) {
        $.messager.alert('开票信息','请先选择一条开票信息!','info'); 
    } else {
        $('#invoiceId').textbox('setValue', row.id)
        $('#invoiceNameUpdate').textbox('setValue', row.invoiceName)
        $('#invoiceNumberUpdate').textbox('setValue', row.invoiceNumber)
        $('#invoiceAddressUpdate').textbox('setValue', row.invoiceAddress)
        $('#invoicePhoneUpdate').textbox('setValue', row.invoicePhone)
        $('#invoiceBankUpdate').textbox('setValue', row.invoiceBank)
        $('#invoiceAccountUpdate').textbox('setValue', row.invoiceAccount)
        $('#updateInvoice').window('open') 
    }
}

function updateInvoice() {
    var invoiceId = $('#invoiceId').textbox('getValue')
    var invoiceName = $('#invoiceNameUpdate').textbox('getValue').trim()
    var invoiceNumber = $('#invoiceNumberUpdate').textbox('getValue').trim()
    var invoiceAddress = $('#invoiceAddressUpdate').textbox('getValue').trim()
    var invoicePhone = $('#invoicePhoneUpdate').textbox('getValue').trim()
    var invoiceBank = $('#invoiceBankUpdate').textbox('getValue').trim()
    var invoiceAccount = $('#invoiceAccountUpdate').textbox('getValue').trim()
    $.ajax({
        type:'put',
        url: "/invoice/update",
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        data: JSON.stringify({
            "id": invoiceId,
            "name": invoiceName,
            "payNumber": invoiceNumber,
            "address": invoiceAddress,
            "telephone": invoicePhone,
            "bankName": invoiceBank,
            "accountNumber": invoiceAccount
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } else if (data.status == 0){
                $.messager.alert('企业','更新互动信息成功!','info');
                $('#updateInvoice').window('close')
                $('#invoice').datagrid({'data': listInvoices(COMPANY_ID)})
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','更新互动信息失败!','error');
        }
    });
}

function deleteInvoice() {
    var row = $('#invoice').datagrid('getSelected');
    if (!row) {
        $.messager.alert('开票信息','请先选择一条开票信息!','info'); 
    } else {
        var message = "确认删除 " + row.invoiceName + " 开票信息?"
        $.messager.confirm('互动信息', message, function(r) {
            if (r) {
                $.ajax({
                    type:'delete',
                    url: "/invoice/delete?id="+row.id,
                    xhrFields:{
                        withCredentials:true
                    }, 
                    crossDomain: true,
                    credentials: 'include',  
                    async: false, //同步调用
                    contentType: 'application/json;charset=UTF-8',
                    success: function(data){
                        if (data.status == 2) {
                            window.location.href = data.message
                        } else if (data.status == 0){
                            $.messager.alert('企业','删除开票信息成功!','info');
                            $('#invoice').datagrid({'data': listInvoices(COMPANY_ID)})
                        } else {
                            $.messager.alert('企业',data.message,'error');
                        }
                    },
                    error: function(){
                        $.messager.alert('企业','删除开票信息失败!','error');
                    }
                });
            }
        })
    }
}

function addHolder() {
    if (COMPANY_ID == '') {
        $.messager.alert('企业','请先添加企业！','info');
    } else {
        var holderName = $('#holderName').textbox('getValue').trim()
        var holderAmount = $('#holderAmount').textbox('getValue').trim()
        var holderPercent = $('#holderPercent').textbox('getValue').trim()
        $.ajax({
            type:'post',
            url: "/holder/add",
            xhrFields:{
                withCredentials:true
            }, 
            crossDomain: true,
            credentials: 'include',  
            async: false, //同步调用
            data: JSON.stringify({
                "companyId": COMPANY_ID,
                "name": holderName,
                "amount": holderAmount,
                "percent": holderPercent
            }),
            dataType:'json', 
            contentType: 'application/json;charset=UTF-8',
            success: function(data){
                if (data.status == 2) {
                    window.location.href = data.message
                } else if (data.status == 0){
                    $.messager.alert('企业','添加股东信息成功!','info');
                    $('#addHolder').window('close')
                    $('#holder').datagrid({'data': listHolders(COMPANY_ID)})
                } else {
                    $.messager.alert('企业',data.message,'error');
                }
                
            },
            error: function(){
                $.messager.alert('企业','添加股东信息失败!','error');
            }
        });
    }
}

function listHolders(companyId) {
    var result = []
    $.ajax({
        type:'get',
        url: "/holder/list?companyId=" + companyId,
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        contentType: 'application/json;charset=UTF-8',
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } else if (data.status == 0){
                var items = []
                $.each(data.obj,function(idx,item){ 
                    items[idx] = {
                        id: item.id,
                        holderName: item.name,
                        holderAmount: item.amount,
                        holderPercent: item.percent
                    }
                })
                result = items
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','获取股东信息失败!','error');
        }
    });
    return result
}

function deleteHolder() {
    var row = $('#holder').datagrid('getSelected');
    if (!row) {
        $.messager.alert('股东信息','请先选择一条股东信息!','info'); 
    } else {
        var message = "确认删除 " + row.holderName + " 股东信息?"
        $.messager.confirm('股东信息', message, function(r) {
            if (r) {
                $.ajax({
                    type:'delete',
                    url: "/holder/delete?id="+row.id,
                    xhrFields:{
                        withCredentials:true
                    }, 
                    crossDomain: true,
                    credentials: 'include',  
                    async: false, //同步调用
                    contentType: 'application/json;charset=UTF-8',
                    success: function(data){
                        if (data.status == 2) {
                            window.location.href = data.message
                        } else if (data.status == 0){
                            $.messager.alert('企业','删除股东信息成功!','info');
                            $('#holder').datagrid({'data': listHolders(COMPANY_ID)})
                        } else {
                            $.messager.alert('企业',data.message,'error');
                        }
                    },
                    error: function(){
                        $.messager.alert('企业','删除股东信息失败!','error');
                    }
                });
            }
        })
    }
}

function updateHolderClick() {
    var row = $('#holder').datagrid('getSelected');
    if (!row) {
        $.messager.alert('股东信息','请先选择一条股东信息!','info'); 
    } else {
        $('#holderId').textbox('setValue', row.id)
        $('#holderNameUpdate').textbox('setValue', row.holderName)
        $('#holderAmountUpdate').numberbox('setValue', row.holderAmount)
        $('#holderPercentUpdate').textbox('setValue', row.holderPercent)
        $('#updateHolder').window('open') 
    }
}

function updateHolder() {
    var holderId = $('#holderId').textbox('getValue')
    var holderName = $('#holderNameUpdate').textbox('getValue').trim()
    var holderAmount = $('#holderAmountUpdate').numberbox('getValue').trim()
    var holderPercent = $('#holderPercentUpdate').textbox('getValue').trim()
    $.ajax({
        type:'put',
        url: "/holder/update",
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        data: JSON.stringify({
            "id": holderId,
            "name": holderName,
            "amount": holderAmount,
            "percent": holderPercent
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } else if (data.status == 0){
                $.messager.alert('企业','更新股东信息成功!','info');
                $('#updateHolder').window('close')
                $('#holder').datagrid({'data': listHolders(COMPANY_ID)})
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','更新股东信息失败!','error');
        }
    });
}

function addBusinessData() {
    if (COMPANY_ID == '') {
        $.messager.alert('企业','请先添加企业！','info');
    } else {
        var year = $('#businessYear').textbox('getValue').trim()
        var totalAssets = $('#businessTotalAssets').textbox('getValue').trim()
        var netAssets = $('#businessNetAssets').textbox('getValue').trim()
        var revenue = $('#businessRevenue').textbox('getValue').trim()
        var profit = $('#businessProfit').textbox('getValue').trim()
        var debtRatio = $('#businessDebtRatio').textbox('getValue').trim()
        var contractAmount = $('#businessContractAmount').textbox('getValue').trim()
        var investedAmount = $('#businessInvestedAmount').textbox('getValue').trim()
        var businessNumber = $('#businessNumber').textbox('getValue').trim()
        $.ajax({
            type:'post',
            url: "/business/add",
            xhrFields:{
                withCredentials:true
            }, 
            crossDomain: true,
            credentials: 'include',  
            async: false, //同步调用
            data: JSON.stringify({
                "year": year,
                "companyId": COMPANY_ID,
                "totalAsset": totalAssets,
                "netAsset": netAssets,
                "revenue": revenue,
                "profit": profit,
                "debtRatio": debtRatio,
                "contractAmount": contractAmount,
                "investedAmount": investedAmount,
                "number": businessNumber
            }),
            dataType:'json', 
            contentType: 'application/json;charset=UTF-8',
            success: function(data){
                if (data.status == 2) {
                    window.location.href = data.message
                } else if (data.status == 0){
                    $.messager.alert('企业','添加经营信息成功!','info');
                    $('#addBusinessData').window('close')
                    $('#businessData').datagrid({'data': listBusinessDatas(COMPANY_ID)})
                } else {
                    $.messager.alert('企业',data.message,'error');
                }
                
            },
            error: function(){
                $.messager.alert('企业','添加经营信息失败!','error');
            }
        });
    }
}

function updateBusinessData() {
    var businessDataId = $('#businessDataId').textbox('getValue')
    var businessYearUpdate = $('#businessYearUpdate').textbox('getValue').trim()
    var businessTotalAssetsUpdate = $('#businessTotalAssetsUpdate').textbox('getValue').trim()
    var businessNetAssetsUpdate = $('#businessNetAssetsUpdate').textbox('getValue').trim()
    var businessRevenueUpdate = $('#businessRevenueUpdate').textbox('getValue').trim()
    var businessProfitUpdate = $('#businessProfitUpdate').textbox('getValue').trim()
    var businessDebtRatioUpdate = $('#businessDebtRatioUpdate').textbox('getValue').trim()
    var businessContractAmountUpdate = $('#businessContractAmountUpdate').textbox('getValue').trim()
    var businessInvestedAmountUpdate = $('#businessInvestedAmountUpdate').textbox('getValue').trim()
    var businessNumberUpdate = $('#businessNumberUpdate').textbox('getValue').trim()
    $.ajax({
        type:'put',
        url: "/business/update",
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        data: JSON.stringify({
            "id": businessDataId,
            "year": businessYearUpdate,
            "totalAsset": businessTotalAssetsUpdate,
            "netAsset": businessNetAssetsUpdate,
            "revenue": businessRevenueUpdate,
            "profit": businessProfitUpdate,
            "debtRatio": businessDebtRatioUpdate,
            "contractAmount": businessContractAmountUpdate,
            "investedAmount": businessInvestedAmountUpdate,
            "number": businessNumberUpdate
        }),
        dataType:'json', 
        contentType: 'application/json;charset=UTF-8',
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } else if (data.status == 0){
                $.messager.alert('企业','更新经营信息成功!','info');
                $('#updateBusinessData').window('close')
                $('#businessData').datagrid({'data': listBusinessDatas(COMPANY_ID)})
            } else {
                $.messager.alert('企业', data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','更新经营信息失败!','error');
        }
    });
}

function updateBusinessDataClick() {
    var row = $('#businessData').datagrid('getSelected');
    if (!row) {
        $.messager.alert('经营信息','请先选择一条经营信息!','info'); 
    } else {
        $('#businessDataId').textbox('setValue', row.id)
        $('#businessYearUpdate').textbox('setValue', row.businessYear)
        $('#businessTotalAssetsUpdate').numberbox('setValue', row.businessTotalAssets)
        $('#businessNetAssetsUpdate').numberbox('setValue', row.businessNetAssets)
        $('#businessRevenueUpdate').numberbox('setValue', row.businessRevenue)
        $('#businessProfitUpdate').numberbox('setValue', row.businessProfit)
        $('#businessDebtRatioUpdate').textbox('setValue', row.businessDebtRatio)
        $('#businessContractAmountUpdate').numberbox('setValue', row.businessContractAmount)
        $('#businessInvestedAmountUpdate').numberbox('setValue', row.businessInvestedAmount)
        $('#businessNumberUpdate').numberbox('setValue', row.businessNumber)
        $('#updateBusinessData').window('open') 
    }
}

function deleteBusinessData() {
    var row = $('#businessData').datagrid('getSelected');
    if (!row) {
        $.messager.alert('经营信息','请先选择一条经营信息!','info'); 
    } else {
        var message = "确认删除 " + row.businessYear + " 年度经营信息?"
        $.messager.confirm('经营信息', message, function(r) {
            if (r) {
                $.ajax({
                    type:'delete',
                    url: "/business/delete?id="+row.id,
                    xhrFields:{
                        withCredentials:true
                    }, 
                    crossDomain: true,
                    credentials: 'include',  
                    async: false, //同步调用
                    contentType: 'application/json;charset=UTF-8',
                    success: function(data){
                        if (data.status == 2) {
                            window.location.href = data.message
                        } else if (data.status == 0){
                            $.messager.alert('企业','删除经营信息成功!','info');
                            $('#businessData').datagrid({'data': listBusinessDatas(COMPANY_ID)})
                        } else {
                            $.messager.alert('企业',data.message,'error');
                        }
                    },
                    error: function(){
                        $.messager.alert('企业','删除经营信息失败!','error');
                    }
                });
            }
        })
    }
}

function listBusinessDatas(companyId) {
    var result = []
    $.ajax({
        type:'get',
        url: "/business/list?companyId=" + companyId,
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        contentType: 'application/json;charset=UTF-8',
        success: function(data){
            if (data.status == 2) {
                window.location.href = data.message
            } else if (data.status == 0){
                var items = []
                $.each(data.obj,function(idx,item){ 
                    items[idx] = {
                        id: item.id,
                        businessYear: item.year,
                        businessTotalAssets: item.totalAsset,
                        businessNetAssets: item.netAsset,
                        businessRevenue: item.revenue,
                        businessProfit: item.profit,
                        businessDebtRatio: item.debtRatio,
                        businessContractAmount: item.contractAmount,
                        businessInvestedAmount: item.investedAmount,
                        businessNumber: item.number
                    }
                })
                result = items
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','获取经营信息失败!','error');
        }
    });
    return result
}

function updateRequires() {
    if (COMPANY_ID == '') {
        $.messager.alert('企业','请先添加企业！','info');
    } else {
        var tags = []
        var brands = $('#requireBrand').combobox('getValues')
        var resources = $('#requireResource').combobox('getValues')
        var finances = $('#requireFinance').combobox('getValues')
        var ability = $('#requireAbility').combobox('getValues')
        var internations = $('#requireInternation').combobox('getValues')
        var standards = $('#requireStandard').combobox('getValues')
        var identify = $('#requireIdentify').combobox('getValues')
        var consults = $('#requireConsult').combobox('getValues')
        var others = $('#requireOther').combobox('getValues')
        if (!isEmpty(brands)) tags = tags.concat(brands) 
        if (!isEmpty(resources)) tags = tags.concat(resources) 
        if (!isEmpty(finances)) tags = tags.concat(finances) 
        if (!isEmpty(ability)) tags = tags.concat(ability) 
        if (!isEmpty(internations)) tags = tags.concat(internations) 
        if (!isEmpty(standards)) tags = tags.concat(standards) 
        if (!isEmpty(identify)) tags = tags.concat(identify) 
        if (!isEmpty(consults)) tags = tags.concat(consults) 
        if (!isEmpty(others)) tags = tags.concat(others) 
        $.ajax({
            type:'put',
            url: "/require/update",
            xhrFields:{
                withCredentials:true
            }, 
            crossDomain: true,
            credentials: 'include',  
            async: false, //同步调用
            data: JSON.stringify({
                "companyId": COMPANY_ID,
                "tags": tags
            }),
            dataType:'json', 
            contentType: 'application/json;charset=UTF-8',
            success: function(data) {
                if (data.status == 2) {
                    window.location.href = data.message
                } else if (data.status == 0){
                    $.messager.alert('企业','更新需求信息成功!','info');
                } else {
                    $.messager.alert('企业',data.message,'error');
                }
                
            },
            error: function(){
                $.messager.alert('企业','更新需求信息失败!','error');
            }
        });
    }
}

function getProjects(companyId) {
    var result
    $.ajax({
        url: "/projectcompany/list?companyId=" + companyId,
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
                    projectName: item.projectName,
                    projectType: item.projectType,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    projectOthers: item.others,   
                    projectPeople: item.people,  
                    projectOwners: item.owners,
                    projectAmount: item.amount           
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

function getProjectDetail(projectId) {
    var result
    $.ajax({
        url: "/project/get?projectId=" + projectId,
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
            result = data.obj
        },
        error: function(){
            window.location.href="./login.html";
        }
    });
    return result
}

function getAllProjects() {
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
                    name: item.name               
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

function addProject() {
    if (COMPANY_ID == '') {
        $.messager.alert('企业','请先添加企业！','info');
    } else {
        var projectId = $('#projectName').combobox('getValue').trim()
        var projectOthers = $('#projectOthers').combobox('getText').trim()
        var projectPeople = $('#projectPeople').combobox('getText').trim()
        var projectOwners = $('#projectOwners').combobox('getText').trim()
        var projectAmount = $('#projectAmount').numberbox('getValue').trim()
        $.ajax({
            type:'post',
            url: "/projectcompany/add",
            xhrFields:{
                withCredentials:true
            }, 
            crossDomain: true,
            credentials: 'include',  
            async: false, //同步调用
            data: JSON.stringify({
                "companyId": COMPANY_ID,
                "projectId": projectId,
                "people": projectPeople,
                "others": projectOthers,
                "owners": projectOwners,
                "amount": projectAmount
            }),
            dataType:'json', 
            contentType: 'application/json;charset=UTF-8',
            success: function(data){
                if (data.status == 2) {
                    window.location.href = data.message
                } else if (data.status == 0){
                    $.messager.alert('企业','添加合作信息成功!','info');
                    $('#addProject').window('close')
                    $('#projects').datagrid('loadData', getProjects(COMPANY_ID))
                } else {
                    $.messager.alert('企业',data.message,'error');
                }
                
            },
            error: function(){
                $.messager.alert('企业','添加合作信息成功!','error');
            }
        });
    }
}

function updateProjectClick() {
    var row = $('#projects').datagrid('getSelected');
    if (!row) {
        $.messager.alert('项目信息','请先选择一条项目信息!','info'); 
    } else {
        $('#projectTypeUpdate').combobox({
            valueField: 'id', 
            textField: 'name',
            panelHeight:'auto', 
            limitToList: false,
            data: getTags(PROJECT_TYPE_FLAG)
        });
        var allProject = getAllProjects()
        $('#projectNameUpdate').combobox({
            valueField: 'id', 
            textField: 'name',
            panelHeight:'auto', 
            limitToList: true,
            data: allProject,
            onSelect: function (row) {
                var data = getProjectDetail(row.id)
                $('#projectTypeUpdate').combobox('setText', data.type)
                $('#startDateUpdate').datebox('setValue', data.startDate)
                $('#endDateUpdate').datebox('setValue', data.endDate)
            }
        });
        $('#projectOwnersUpdate').combobox({
            valueField: 'id', 
            textField: 'nickName',
            panelHeight:'auto', 
            limitToList: true,
            multiple: true,
            data: getListUsers(),
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
        var others = listContacts(COMPANY_ID)
        $('#projectPeopleUpdate').combobox({
            valueField: 'id', 
            textField: 'contactName',
            panelHeight:'auto', 
            limitToList: true,
            multiple: true,
            data: others,
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

        $('#projectOthersUpdate').combobox({
            valueField: 'id', 
            textField: 'contactName',
            panelHeight:'auto', 
            limitToList: true,
            multiple: true,
            data: others,
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
        $('#projectCompanyId').textbox('setValue', row.id)
        $.each(allProject, function(idx,item){ 
            if (item.name == row.projectName) {
                $('#projectNameUpdate').combobox('setValue', item.id)
            }  
        })
        $('#projectTypeUpdate').combobox('setText', row.projectType)
        $('#startDateUpdate').datebox('setValue', row.startDate)
        $('#endDateUpdate').datebox('setValue', row.endDate)
        $('#projectOthersUpdate').textbox('setValue', row.projectOthers)
        $('#projectPeopleUpdate').textbox('setValue', row.projectPeople)
        $('#projectOwnersUpdate').textbox('setValue', row.projectOwners)
        $('#projectAmountUpdate').numberbox('setValue', row.projectAmount)
        $('#updateProject').window('open') 
    }
}

function updateProject() {
    if (COMPANY_ID == '') {
        $.messager.alert('企业','请先添加企业！','info');
    } else {
        var projectCompanyId = $('#projectCompanyId').textbox('getValue').trim()
        var projectId = $('#projectNameUpdate').combobox('getValue').trim()
        var projectOthers = $('#projectOthersUpdate').combobox('getText').trim()
        var projectPeople = $('#projectPeopleUpdate').combobox('getText').trim()
        var projectOwners = $('#projectOwnersUpdate').combobox('getText').trim()
        var projectAmount = $('#projectAmountUpdate').numberbox('getValue').trim()
        $.ajax({
            type:'put',
            url: "/projectcompany/update",
            xhrFields:{
                withCredentials:true
            }, 
            crossDomain: true,
            credentials: 'include',  
            async: false, //同步调用
            data: JSON.stringify({
                "id": projectCompanyId,
                "projectId": projectId,
                "people": projectPeople,
                "others": projectOthers,
                "owners": projectOwners,
                "amount": projectAmount
            }),
            dataType:'json', 
            contentType: 'application/json;charset=UTF-8',
            success: function(data){
                if (data.status == 2) {
                    window.location.href = data.message
                } else if (data.status == 0){
                    $.messager.alert('项目','更新合作信息成功!','info');
                    $('#updateProject').window('close')
                    $('#projects').datagrid('loadData', getProjects(COMPANY_ID))
                } else {
                    $.messager.alert('项目',data.message,'error');
                }
                
            },
            error: function(){
                $.messager.alert('企业','更新合作信息失败!','error');
            }
        });
    }
}

function deleteProject() {
    var row = $('#projects').datagrid('getSelected');
    if (!row) {
        $.messager.alert('合作信息','请先选择一条合作信息!','info'); 
    } else {
        var message = "确认删除 " + row.projectName + " 项目信息?"
        $.messager.confirm('合作信息', message, function(r) {
            if (r) {
                $.ajax({
                    type:'delete',
                    url: "/projectcompany/delete?id="+row.id,
                    xhrFields:{
                        withCredentials:true
                    }, 
                    crossDomain: true,
                    credentials: 'include',  
                    async: false, //同步调用
                    contentType: 'application/json;charset=UTF-8',
                    success: function(data){
                        if (data.status == 2) {
                            window.location.href = data.message
                        } else if (data.status == 0){
                            $.messager.alert('合作信息','删除合作信息成功!','info');
                            $('#projects').datagrid('loadData', getProjects(COMPANY_ID))
                        } else {
                            $.messager.alert('合作信息',data.message,'error');
                        }
                    },
                    error: function(){
                        $.messager.alert('合作信息','删除合作信息失败!','error');
                    }
                });
            }
        })
    }
}

function initProjectInfo() {
    $('#projects').datagrid('loadData', getProjects(COMPANY_ID))
    $('#projectType').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: getTags(PROJECT_TYPE_FLAG)
    });
    $('#projectName').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: true,
        data: getAllProjects(),
        onSelect: function (row) {
            var data = getProjectDetail(row.id)
            $('#projectType').combobox('setText', data.type)
            $('#startDate').datebox('setValue', data.startDate)
            $('#endDate').datebox('setValue', data.endDate)
        }
    });
    $('#projectOwners').combobox({
        valueField: 'id', 
        textField: 'nickName',
        panelHeight:'auto', 
        limitToList: true,
        multiple: true,
        data: getListUsers(),
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
    var others = listContacts(COMPANY_ID)
    $('#projectPeople').combobox({
        valueField: 'id', 
        textField: 'contactName',
        panelHeight:'auto', 
        limitToList: true,
        multiple: true,
        data: others,
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

    $('#projectOthers').combobox({
        valueField: 'id', 
        textField: 'contactName',
        panelHeight:'auto', 
        limitToList: true,
        multiple: true,
        data: others,
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
}

function initChatInfo() {
    $('#chat').datagrid('getPager').pagination({
        'displayMsg': '共计{total}次互动',
        'showPageList': false,
        'showPageInfo': true,
        onSelectPage: function(pageNum, pageSize) {
            $('#chat').datagrid('loadData', listChats(COMPANY_ID, (pageNum - 1) * pageSize, pageSize))
        }
    });

    var opts = $('#chat').datagrid('options');
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var limit = start + parseInt(opts.pageSize); 

    $('#chatOwners').combobox({
        valueField: 'id', 
        textField: 'nickName',
        panelHeight:'auto', 
        limitToList: true,
        multiple: true,
        data: getListUsers(),
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

    $('#chatOthers').combobox({
        valueField: 'id', 
        textField: 'contactName',
        panelHeight:'auto', 
        limitToList: true,
        multiple: true,
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
}


$(function() {
    // $('#region').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     //panelHeight:'auto', 
    //     limitToList: true,
    //     //data: getTags(REGION_FLAG)
    // });
    // $('#attention').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto', 
    //     limitToList: false,
    //     //data: getTags(ATTENTION_FLAG)
    // });
    // $('#zol').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     //panelHeight:'auto', 
    //     limitToList: false,
    //     //data: getTags(ZOL_FLAG)
    // });
    // $('#unitProperties').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto', 
    //     limitToList: false,
    //     //data: getTags(UNIT_PROPERTIES_FLAG)
    // });
    // $('#equity').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto', 
    //     limitToList: false,
    //     //data: getTags(EQUITY_PARTICIPATION_FLAG)
    // });
    $('#highTech').combobox({
        // valueField: 'id', 
        // textField: 'name',
        // panelHeight:'auto', 
        // limitToList: false,
        // multiple: true,
        // data: getTags(HIGH_TECHNOLOGY_FLAG),
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
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
    // $('#companyMarket').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto', 
    //     limitToList: false,
    //     data: getTags(COMPANY_MARKET_FLAG)
    // });
    // $('#companyTypes').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto', 
    //     limitToList: false,
    //     data: getTags(COMPANY_TYPE_FLAG)
    // });
    $('#industries').combobox({
        // valueField: 'id', 
        // textField: 'name',
        // panelHeight:'auto', 
        // limitToList: false,
        // multiple: true,
        // data: getTags(INDUSTRIES_FLAG),
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
    $('#business').combobox({
        // valueField: 'id', 
        // textField: 'name',
        // panelHeight:'auto', 
        // limitToList: false,
        // multiple: true,
        // data: getTags(BUSINESS_FLAG),
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
    $('#businessArea').combobox({
        // valueField: 'id', 
        // textField: 'name',
        // panelHeight:'auto', 
        // limitToList: false,
        // multiple: true,
        // data: getTags(BUSINESS_AREA_FLAG),
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
    $('#segmentMarket').combobox({
        // valueField: 'id', 
        // textField: 'name',
        // //panelHeight:'auto', 
        // limitToList: false,
        // multiple: true,
        // data: getTags(SEGMENT_MARKET_FLAG),
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

    // $('#techProduct').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto', 
    //     limitToList: false,
    //     data: getTags(TECHNOLOGY_PRODUCT_FLAG)
    // });
    $('#advantages').combobox({
        // valueField: 'id', 
        // textField: 'name',
        // panelHeight:'auto', 
        // limitToList: false,
        // multiple: true,
        // data: getTags(ADVANTAGES_FLAG),
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
    // $('#member').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto', 
    //     limitToList: false,
    //     data: getTags(MEMBER_FLAG)
    // });
    $('#requireBrand').combobox({
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
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
    $('#requireResource').combobox({
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
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
    $('#requireFinance').combobox({
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
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
    $('#requireAbility').combobox({
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
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
    $('#requireInternation').combobox({
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
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
    $('#requireStandard').combobox({
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
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
    $('#requireIdentify').combobox({
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
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
    $('#requireConsult').combobox({
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
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
    $('#requireOther').combobox({
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onSelect: function (row) {
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
})

/*页面加载*/ 
window.onload = function () {
    getSyncTags('region', REGION_FLAG) 
    getSyncTags('attention', ATTENTION_FLAG)
    getSyncTags('zol', ZOL_FLAG)
    getSyncTags('unitProperties', UNIT_PROPERTIES_FLAG)
    getSyncTags('equity', EQUITY_PARTICIPATION_FLAG)
    getSyncTags('highTech', HIGH_TECHNOLOGY_FLAG)
    getSyncTags('companyMarket', COMPANY_MARKET_FLAG)
    getSyncTags('companyTypes', COMPANY_TYPE_FLAG)
    getSyncTags('industries', INDUSTRIES_FLAG)
    getSyncTags('business', BUSINESS_FLAG)
    getSyncTags('businessArea', BUSINESS_AREA_FLAG)
    getSyncTags('segmentMarket', SEGMENT_MARKET_FLAG)
    getSyncTags('advantages', ADVANTAGES_FLAG)
    getSyncTags('techProduct', TECHNOLOGY_PRODUCT_FLAG)
    getSyncTags('member', MEMBER_FLAG)

    getSyncTags('requireBrand', REQUIRE_BRAND_FLAG)
    getSyncTags('requireResource', REQUIRE_RESOURCE_FLAG)
    getSyncTags('requireFinance', REQUIRE_FINANCE_FLAG)
    getSyncTags('requireAbility', REQUIRE_ABILITY_FLAG)
    getSyncTags('requireInternation', REQUIRE_INTERNATION_FLAG)
    getSyncTags('requireStandard', REQUIRE_STANDARD_FLAG)
    getSyncTags('requireIdentify', REQUIRE_INDENTIFACTION_FLAG)
    getSyncTags('requireConsult', REQUIRE_CONSULT_FLAG)
    getSyncTags('requireOther', REQUIRE_OTHER_FLAG)

    getSyncTags('chatType', CHAT_TYPE_FLAG)

    // $('#chatType').combobox({
    //     valueField: 'id', 
    //     textField: 'name',
    //     panelHeight:'auto', 
    //     limitToList: true,
    //     data: getTags(CHAT_TYPE_FLAG)
    // });

    $('#tt').tabs({
        onSelect: function(title,index) {
            if (title == "基本信息") {
                
            } else if (title == "会员信息") {
                
            } else if (title == "需求信息") {
                
            } else if (title == "联系信息") {
                $('#contact').datagrid('loadData', listContacts(COMPANY_ID));
            } else if (title == "互动信息") {
                initChatInfo()
            } else if (title == "合作信息") {
                initProjectInfo() 
            } else if (title == "经营信息") {
                $('#holder').datagrid({'data': listHolders(COMPANY_ID)})
                $('#businessData').datagrid('loadData', listBusinessDatas(COMPANY_ID))
            } else if (title == "开票信息") {
                $('#invoice').datagrid({'data': listInvoices(COMPANY_ID)})
            }
        }
    });
}