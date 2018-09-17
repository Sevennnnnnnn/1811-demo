$(function(){
    var obtn=document.getElementById("btn");
        var oUsr=document.getElementById("usr");
        var oPwd=document.getElementById("pwd");
        obtn.onclick=function(){
            var sUsr=oUsr.value;
            var sPwd=oPwd.value;
            ajaxPost("php/register.php",`usr=${sUsr}&pwd=${sPwd}`)
            .then(function(res){
                var success=true;
                console.log(res);
                try{
                    JSON.parse(res);
                }catch(error){
                    console.log(error);
                    success=false;
                }
                if(success){
                    location.href="login";
                }
            })
        }
})