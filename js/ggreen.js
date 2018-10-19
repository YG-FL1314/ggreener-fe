/*全局变量*/
const MEMBER_FLAG = 1
const COMPANY_FLAG = 8
const REGION_FLAG = 20
const ATTENTION_FLAG = 16
const ZOL_FLAG = 55


function getTags(parentId) {
    var result;
    $.ajax({
        url: "/tag/list?parentId=" + parentId,
        dataType: 'json',
        async: false,
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
/*页面加载*/ 
window.onload = function () { 
    $('#member').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto',
        limitToList: '6',
        data: getTags(MEMBER_FLAG)
    });

    $('#companyTypes').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: '6',
        data: getTags(COMPANY_FLAG)
    });
    $('#region').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: true,
        data: getTags(REGION_FLAG)
    });
    $('#attention').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: 'true',
        data: getTags(ATTENTION_FLAG)
    });
    $('#zol').combobox({
        valueField: 'id', 
        textField: 'name',
        panelHeight:'auto', 
        limitToList: '6',
        data: getTags(ZOL_FLAG)
    });
}