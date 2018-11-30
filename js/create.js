/*全局变量*/

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

function cancel() {
    window.location.href = './ggreen.html'
}

//检查session是否过期
isLogin()

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
    var highTech = $('#highTech').combobox('getValue').trim()
    var companyMarket = $('#companyMarket').combobox('getValue').trim()
    var sharesCode = $('#sharesCode').textbox('getValue').trim()
    var companyTypes = $('#companyTypes').combobox('getValue').trim()
    var industries = $('#industries').combobox('getValue').trim()
    var business = $('#business').combobox('getValue').trim()
    var businessArea = $('#businessArea').combobox('getValue').trim()
    var segmentMarket = $('#segmentMarket').combobox('getValue').trim()
    var techProduct = $('#techProduct').combobox('getValue').trim()
    var patents = $('#patents').textbox('getValue').trim()
    var utilityPatents = $('#utilityPatents').textbox('getValue').trim()
    var softwares = $('#softwares').textbox('getValue').trim()
    var advantages = $('#advantages').combobox('getValue').trim()
    var staffNumber = $('#staffNumber').textbox('getValue').trim()
    var technicians = $('#technicians').textbox('getValue').trim()
    var officeArea = $('#officeArea').textbox('getValue').trim()
    var products = $('#products').textbox('getValue').trim()
    var telephone = $('#companyPhone').textbox('getValue').trim()
    var fax = $('#companyFax').textbox('getValue').trim()
    var website = $('#companyWebsite').textbox('getValue').trim()
    var address = $('#companyAddress').textbox('getValue').trim()
    tags.push(attention);tags.push(region);tags.push(zol);tags.push(unitProperties);tags.push(equity);
    tags.push(highTech);tags.push(companyMarket);tags.push(companyTypes);tags.push(industries);tags.push(business);
    tags.push(businessArea);tags.push(segmentMarket);tags.push(techProduct);tags.push(advantages);

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
                $.messager.alert('公司','添加公司成功!','info');
            } else {
                $.messager.alert('公司',data.message,'error');
            }
            
        },
        error: function(){
            $.messager.alert('公司','添加公司失败!','error');
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
        data: getTags(HIGH_TECHNOLOGY_FLAG)
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
        data: getTags(INDUSTRIES_FLAG)
    });
    $('#business').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: getTags(BUSINESS_FLAG)
    });
    $('#businessArea').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: false,
        data: getTags(BUSINESS_AREA_FLAG)
    });
    $('#segmentMarket').combobox({
        valueField: 'id', 
        textField: 'name',
        //panelHeight:'auto', 
        limitToList: false,
        data: getTags(SEGMENT_MARKET_FLAG)
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
        data: getTags(ADVANTAGES_FLAG)
    });
    
    
}