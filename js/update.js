/*全局变量*/
var COMPANY_ID = getQueryString("companyId")

function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
} 

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

function updateCompany() {
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
            "name": name,
            "attention": attention,
            "region": region,
            "zol": zol,
            "unitProperty": unitProperties,
            "establishedTime": createTime,
            "registeredCapital": register,
            "equity": equity,
            "highTechs": highTech,
            "companyMarket": companyMarket,
            "sharesCode": sharesCode,
            "companyType": companyTypes,
            "industries": industries,
            "business": business,
            "businessArea": businessArea,
            "segmentMarket": segmentMarket,
            "techProduct": techProduct,
            "patents": patents,
            "utilityPatents": utilityPatents,
            "softwares": softwares,
            "advantages": advantages,
            "staffNumber": staffNumber,
            "technicians": technicians,
            "officeArea": officeArea,
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
                $.messager.alert('企业','更新企业成功!','info');
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','更新企业失败!','error');
        }
    });
}

function updateMember() {
    if (COMPANY_ID == '') {
        $.messager.alert('企业','请先添加企业！','info');
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
                    $.messager.alert('企业','添加会员信息成功!','info');
                    $('#tt').tabs('select', '需求信息');
                } else {
                    $.messager.alert('企业',data.message,'error');
                }
                
            },
            error: function(){
                $.messager.alert('企业','添加会员信息失败!','error');
            }
        });
    }
}

function addContact() {
    if (COMPANY_ID == '') {
        $.messager.alert('企业','请先添加企业！','info');
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
                    $.messager.alert('企业','添加联系人成功!','info');
                    $('#addContact').window('close')
                    $('#contact').datagrid({'data': listContacts(COMPANY_ID)})
                } else {
                    $.messager.alert('企业',data.message,'error');
                }
                
            },
            error: function(){
                $.messager.alert('企业','添加联系人失败!','error');
            }
        });
    }
}

function listContacts(companyId) {
    var result = []
    if (COMPANY_ID == '') {
        $.messager.alert('企业','请先添加企业！','info');
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
                    $.messager.alert('企业',data.message,'error');
                }
                
            },
            error: function(){
                $.messager.alert('企业','获取联系人失败!','error');
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
        $('#contactDutyUpdate').textbox('setText', row.duty)
        $('#contactPhone1Update').textbox('setValue', row.phone1)
        $('#contactPhone2Update').textbox('setValue', row.phone2)
        $('#contactTelUpdate').textbox('setValue', row.座机)
        $('#mailUpdate').textbox('setValue', row.mail)
        $('#weixinUpdate').textbox('setValue', row.weixin)
        $('#qqUpdate').textbox('setValue', row.qq)
        $('#remarkUpdate').textbox('setValue', row.remark)
        $('#updateContact').window('open') 
    }
}

function updateContact() {
    var id = $('#contactId').textbox('getValue').trim()
    var name = $('#contactNameUpdate').textbox('getValue').trim()
    var duty = $('#contactDutyUpdate').combobox('getValue').trim()
    var phone1 = $('#contactPhone1Update').textbox('getValue').trim()
    var phone2 = $('#contactPhone2Update').textbox('getValue').trim()
    var tel = $('#contactTelUpdate').textbox('getValue').trim()
    var mail = $('#mailUpdate').textbox('getValue').trim()
    var weixin = $('#weixinUpdate').textbox('getValue').trim()
    var qq = $('#qqUpdate').textbox('getValue').trim()
    var remark = $('#remarkUpdate').textbox('getValue').trim()
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
                $.messager.alert('企业','更新联系人成功!','info');
                $('#updateContact').window('close')
                $('#contact').datagrid({'data': listContacts(COMPANY_ID)})
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','更新联系人失败!','error');
        }
    });
}

function getCompanyDetail(companyId) {
    $.ajax({
        type:'get',
        url: "/company/get?companyId=" + companyId,
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
            } else if (data.status == 0) {
                $('#name').textbox('setValue', data.obj.name)
                $('#attention').combobox('setValue', data.obj.attention)
                $('#region').combobox('setValue', data.obj.region)
                $('#zol').combobox('setValue', data.obj.zol)
                $('#unitProperties').combobox('setValue', data.obj.unitProperty)
                $('#createTime').datebox('setValue', data.obj.establishedTime.substring(0,10))
                $('#register').textbox('setValue', data.obj.registeredCapital)
                $('#equity').combobox('setValue', data.obj.equity)
                $('#highTech').combobox('setValues', data.obj.highTechs == null ? [] : data.obj.highTechs)
                $('#companyMarket').combobox('setValue', data.obj.companyMarket)
                $('#sharesCode').textbox('setValue', data.obj.sharesCode)
                $('#companyTypes').combobox('setValue', data.obj.companyType)
                $('#industries').combobox('setValues', data.obj.industries == null ? [] : data.obj.industries)
                $('#business').combobox('setValues', data.obj.business == null ? [] : data.obj.business)
                $('#businessArea').combobox('setValues', data.obj.businessArea == null ? [] : data.obj.businessArea)
                $('#segmentMarket').combobox('setValues', data.obj.segmentMarket == null ? [] : data.obj.segmentMarket)
                $('#techProduct').combobox('setValue', data.obj.techProduct)
                $('#patents').textbox('setValue', data.obj.patents)
                $('#utilityPatents').textbox('setValue', data.obj.utilityPatents)
                $('#softwares').textbox('setValue', data.obj.softwares)
                $('#advantages').combobox('setValues', data.obj.advantages == null ? [] : data.obj.advantages)
                $('#staffNumber').textbox('setValue', data.obj.staffNumber)
                $('#technicians').textbox('setValue', data.obj.technicians)
                $('#officeArea').textbox('setValue', data.obj.officeArea)
                $('#products').textbox('setValue', data.obj.products)
                $('#companyPhone').textbox('setValue', data.obj.telephone)
                $('#companyFax').textbox('setValue', data.obj.fax)
                $('#companyWebsite').textbox('setValue', data.obj.website)
                $('#companyAddress').textbox('setValue', data.obj.address)  
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','获取企业失败!','error');
        }
    });
}

function getMember(companyId) {
    $.ajax({
        type:'get',
        url: "/member/get?companyId=" + companyId,
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
            } else if (data.status == 0) {
                $('#memberCode').textbox('setValue', data.obj.memberCode)
                $('#member').combobox('setValue', data.obj.tagId)
                $('#joiningTime').datebox('setValue', data.obj.joiningTime.substring(0,10))
                $('#validityTime').datebox('setValue', data.obj.validityTime.substring(0,10))
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','获取会员信息失败!','error');
        }
    }); 
}

function updateMember() {
    var memberCode = $('#memberCode').textbox('getValue').trim()
    var member = $('#member').combobox('getValue').trim()
    var joiningTime = $('#joiningTime').combobox('getValue').substring(0,10)
    var validityTime = $('#validityTime').combobox('getValue').substring(0,10)
    $.ajax({
        type:'put',
        url: "/member/update",
        xhrFields:{
            withCredentials:true
        }, 
        crossDomain: true,
        credentials: 'include',  
        async: false, //同步调用
        data: JSON.stringify({
            "companyId": COMPANY_ID,
            "tagId": member,
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
                COMPANY_ID = data.obj.id
                $.messager.alert('企业','更新会员信息成功!','info');
            } else {
                $.messager.alert('企业',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('企业','更新会员信息失败!','error');
        }
    });
}

function addChat() {
    if (COMPANY_ID == '') {
        $.messager.alert('企业','请先添加企业！','info');
    } else {
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

function initCompanyInfo() {
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
    getCompanyDetail(COMPANY_ID) 
}

function initMemberInfo() {
    $('#member').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: getTags(MEMBER_FLAG)
    });
    getMember(COMPANY_ID)
}

function initContactInfo() {
    var data = getTags(DUTY_FLAG)
    $('#contactDutyInput').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: data
    });

    $('#contact').datagrid({'data': listContacts(COMPANY_ID)});
    $('#contactDutyUpdate').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: data
    });
}

function initChatInfo() {
    $('#chat').datagrid({'data': listChats(COMPANY_ID)});
    $('#chatType').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: true,
        data: getTags(CHAT_TYPE_FLAG)
    });

    $('#chatOwners').combobox({
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
}

/*页面加载*/ 
window.onload = function () {
    initCompanyInfo()
    $('#tt').tabs({
        onSelect: function(title,index) {
            if (title == "基本信息") {
                initCompanyInfo()
            } else if (title == "会员信息") {
                initMemberInfo()
            } else if (title == "需求信息") {
                
            } else if (title == "联系信息") {
                initContactInfo()
            } else if (title == "互动信息") {
                initChatInfo()
            } else if (title == "合作信息") {
                
            } else if (title == "经营信息") {
                
            } else if (title == "开票信息") {
                $('#invoice').datagrid({'data': listInvoices(COMPANY_ID)})
            }
        }
    });
}