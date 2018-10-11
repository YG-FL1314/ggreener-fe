function memberList() {
   url = "/tag/list?parentId=1"
   $.ajax({    
        type:'get',  
        xhrFields: {
            withCredentials: true
        },   
        url: url,    
        cache:true,   
        crossDomain: true,
        dataType:'json',    
        success:function(data){
            console.log(data)
        },
        error:function(data){
            $.messager.show({
                title:'登录失败',
                msg: data,
                showType:'fade',
                style:{
                    left:0,
                    right:'',
                }
            });
        }  
    }); 
}
var myloader = function(param,success,error){
        $.ajax({
            url: "/tag/list?parentId=1",
            dataType: 'json',
            success: function(data){
                var items = $.each(data.obj,function(idx,item){ 
                    return {
                        id: item.id,
                        name: item.name
                    };
                })
                success(items)
            },
            error: function(){
                error.apply(this, arguments);
            }
        });
    }
window.onload = function () { 
}