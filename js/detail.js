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
                $('#holder').datagrid({'data': listHolders(COMPANY_ID)})
            } else if (title == "开票信息") {
                $('#invoice').datagrid({'data': listInvoices(COMPANY_ID)})
            }
        }
    });
}