// 主页选项卡
$(function(){   
    $(".show-title>li").mouseenter(function(){
        $(this).addClass("show-title-active").siblings().removeClass("show-title-active");
        $(".show-content").eq($(this).index()).css({
            display:"block"
        }).siblings().css({
            display:"none"
        })
    })
})


//注册选项卡
$(function(){
    $(".xuanxiang").children().click(function(){
        $(this).addClass("phone").siblings().removeClass("phone");
        $(".c-r-bot").children().eq($(this).index()).css({
            display:"block"
        }).siblings().css({
            display:"none"
        })
    })
})