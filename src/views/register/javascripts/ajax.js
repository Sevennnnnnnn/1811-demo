function jsonp(url,callback){
    // callback 是传入回调函数的字段名（给后端看的字段名）;
     callback = callback ? callback : "callback";
     var cbName = "cb"+(""+Math.random()).replace(/^0\./,"");
     //console.log(cbName);
     var promise = new Promise(function(resolved,rejected){
         window[cbName] = function(res){
             resolved(res);
         }
     })
     var callbackName = `${callback}=${cbName}`;
     url += "&"+callbackName;
     var script = document.createElement("script");
     script.src = url;
     script.onload = function(){
         this.remove();
     }
     document.body.appendChild(script);
     return promise
 };
 
 function ajaxGet(url){
    var xhr = new XMLHttpRequest();
    xhr.open("GET",url);
    xhr.send(null);
    var promise = new Promise(function(reolved,rejected){
        xhr.onload = function(){
            if(xhr.status == 200){
                reolved(xhr.response);
            }else{
                rejected("ajax错误，错误代码为:"+xhr.status);
            }
        }
    })
    return promise;
}

function ajaxPost(url,data){
    var xhr = new XMLHttpRequest();
    xhr.open("POST",url);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(data);
    var promise = new Promise(function(reolved,rejected){
        xhr.onload = function(){
            if(xhr.status == 200){
                reolved(xhr.response);
            }else{
                rejected("ajax错误，错误代码为:"+xhr.status);
            }
        }
    })
    return promise;
}