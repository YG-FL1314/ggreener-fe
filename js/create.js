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
          "address": address
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
        var duty = $('#contactDutyInput').combobox('getValue').trim()
        var phone1 = $('#contactPhone1Input').textbox('getValue').trim()
        var phone2 = $('#contactPhone2Input').textbox('getValue').trim()
        var tel = $('#contactTelInput').textbox('getValue').trim()
        var mail = $('#mailInput').textbox('getValue').trim()
        var weixin = $('#weixinInput').textbox('getValue').trim()
        var qq = $('#qqInput').textbox('getValue').trim()
        var remark = $('#remarkInput').textbox('getValue').trim()
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
              "dutyId": duty,
              "mail": mail,
              "weixin": weixin,
              "remark": remark,
              "qq": qq,
              "telephone": phone1 + "," + phone2,
              "phone":tel
            }),
            dataType:'json', 
            contentType: 'application/json;charset=UTF-8',
            success: function(data){
                if (data.status == 2) {
                    window.location.href = data.message
                } else if (data.status == 0){
                    $.messager.alert('公司','添加联系人成功!','info');
                    $('#addContact').window('close')
                    $('#contact').datagrid({'data': listContacts(COMPANY_ID)})
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
                            remark: item.remark
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

function addChatClick() {
    if (COMPANY_ID == '') {
        $.messager.alert('企业','请先添加企业！','info');
    } else {
        $('#addChat').window('open')
    }
}

function addChat() {
    var chatTime = $('#chatTime').datetimebox('getValue').trim()
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
                $('#chat').datagrid({'data': listChats(COMPANY_ID)})
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
            textField: 'name',
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
        $('#chatTimeUpdate').datetimebox('setValue', row.chatTime)
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
    var chatTime = $('#chatTimeUpdate').datetimebox('getValue').trim()
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
                $('#chat').datagrid({'data': listChats(COMPANY_ID)})
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
                $('#chat').datagrid({'data': listChats(COMPANY_ID)})
            } else {
                $.messager.alert('企业',data.message,'error');
            }
        },
        error: function(){
            $.messager.alert('企业','删除互动信息失败!','error');
        }
    });
    }
}

function listChats(companyId) {
    var result = []
    $.ajax({
        type:'get',
        url: "/chat/list?companyId=" + companyId,
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
                        companyId: item.companyId,
                        chatTime: item.chatTime,
                        chatType: item.chatType,
                        chatAddress: item.chatAddress,
                        others: item.customers,
                        owners: item.owners,
                        content: item.content
                    }
                })
                result = items
            } else {
                $.messager.alert('企业',data.message,'error');
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
}

function updateHolderClick() {
    var row = $('#holder').datagrid('getSelected');
    if (!row) {
        $.messager.alert('股东信息','请先选择一条股东信息!','info'); 
    } else {
        $('#holderId').textbox('setValue', row.id)
        $('#holderNameUpdate').textbox('setValue', row.holderName)
        $('#holderAmountUpdate').textbox('setValue', row.holderAmount)
        $('#holderPercentUpdate').textbox('setValue', row.holderPercent)
        $('#updateHolder').window('open') 
    }
}

function updateHolder() {
    var holderId = $('#holderId').textbox('getValue')
    var holderName = $('#holderNameUpdate').textbox('getValue').trim()
    var holderAmount = $('#holderAmountUpdate').textbox('getValue').trim()
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


/*页面加载*/ 
window.onload = function () { 
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
    $('#unitProperties').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: getTags(UNIT_PROPERTIES_FLAG)
    });
    $('#equity').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: getTags(EQUITY_PARTICIPATION_FLAG)
    });
    $('#highTech').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        multiple: true,
        data: getTags(HIGH_TECHNOLOGY_FLAG),
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
    $('#companyMarket').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: getTags(COMPANY_MARKET_FLAG)
    });
    $('#companyTypes').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: getTags(COMPANY_TYPE_FLAG)
    });
    $('#industries').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        multiple: true,
        data: getTags(INDUSTRIES_FLAG),
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
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        multiple: true,
        data: getTags(BUSINESS_FLAG),
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
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        multiple: true,
        data: getTags(BUSINESS_AREA_FLAG),
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
        valueField: 'id', 
        textField: 'name',
        //panelHeight:'auto', 
        limitToList: false,
        multiple: true,
        data: getTags(SEGMENT_MARKET_FLAG),
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

    $('#techProduct').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: getTags(TECHNOLOGY_PRODUCT_FLAG)
    });
    $('#advantages').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        multiple: true,
        data: getTags(ADVANTAGES_FLAG),
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
    $('#member').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: getTags(MEMBER_FLAG)
    });
    $('#contactDutyInput').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: getTags(DUTY_FLAG)
    });
}