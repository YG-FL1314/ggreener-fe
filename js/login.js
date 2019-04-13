
function submitForm(){
  var name = $('#name').textbox('getValue').trim()
  var password = $('#password').passwordbox('getValue').trim()

  url = "/user/login?name=" + name + "&password=" + password
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
    success:function(data){
      if (data.status == 0) {
        window.location.href="./ggreen.html";
      } else {
        $.messager.alert('登录失败', data.message,'error');
      }
    },
    error:function(data, request){
      $.messager.alert('登录失败', data.message,'error');
    }  
  }); 
}

$(document).keypress(function(e) {  
    if((e.keyCode || e.which)==13) {  
        submitForm(); 
    }  
}); 