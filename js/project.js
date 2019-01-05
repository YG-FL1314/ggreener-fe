/*全局变量*/
var PROJECT_ID = getQueryString("projectId")

function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
} 

function getProject(projectId) {
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
            var items = []
            items[0] = {
                id: data.obj.id,
                projectName: data.obj.name,
                projectType: data.obj.type,
                projectAddress: data.obj.address,
                startDate: data.obj.startDate,
                endDate: data.obj.endDate,
                projectRemark: data.obj.remark,
                amount: data.obj.amount                
            }
            result = items
        },
        error: function(){
            window.location.href="./login.html";
        }
    });
    return result
}

function getCompanyByProject(projectId) {
    var result
    $.ajax({
        url: "/projectcompany/list?projectId=" + projectId,
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
                    companyName: item.companyName,
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

$(function() {
    
})

/*页面加载*/ 
window.onload = function () { 
    $('#projects').datagrid('loadData', getProject(PROJECT_ID))
    $('#companies').datagrid('loadData', getCompanyByProject(PROJECT_ID))
}
