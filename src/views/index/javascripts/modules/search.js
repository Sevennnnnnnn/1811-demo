// 当滚动条大于700时显示吸顶搜索框
$(function(){
    $(window).scroll(function(){
       if($(window).scrollTop()>=700){
            $(".search").slideDown();
            $(".searchs").slideDown();        
        } 
        else{
            $(".search").slideUp();
            $(".searchs").slideUp();
        }
    })    
})


//当滚动条大于700时楼梯

$(window).scroll(function(){
    if($(window).scrollTop()>=800){
        $(".fixed").fadeIn();      
    } 
    else{
        $(".fixed").fadeOut();
    } 
}) 
$("#to-top").on("click",function(){
    $("body,html").animate({
        scrollTop:0
    });
})    
