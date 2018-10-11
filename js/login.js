function submitForm(){
   var name = document.getElementById("name").value;
   var password = document.getElementById("password").value;
   url = "/user/login?name=" + "qingju" + "&password=" + "ggreener"
   $.ajax({    
        type:'get',        
        url: url,    
        cache:true,  
        xhrFields:{
			withCredentials:true
		}, 
        crossDomain: true,
        credentials: 'include',  
        dataType:'json',    
        success:function(data, request){
            window.location.href="./ggreen.html";
  
        },
		error:function(data, request){
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