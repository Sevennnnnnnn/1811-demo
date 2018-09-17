$(function(){
    function waterfall(){
        $.extend(waterfall.prototype,{
            init(){
                this.ajaxRendering();
            },

            handleEvent(){

                //鼠标滑过商品列表每一项商品时显示添加购物车按钮
                for(let i = 0;i < $(".span4").length;i ++){
                    $(".span4").eq(i).hover(function(){
                        $(".span4").eq(i).find(".J_xm-recommend-btn").css({"display":"block"})
                    }.bind(this),function(){
                        $(".span4").eq(i).find(".J_xm-recommend-btn").css({"display":"none"})
                    }.bind(this))
                }
                
            },

            ajaxRendering(){
                $.ajax({
                    url: "http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=0&trace=0&limit=10&endId=0&pid=106888&_=1526369583128",
                    dataType: "jsonp"
                }).done(function (res) {
                    var html = ``;
                    for ( var q = 0; q < 30; q++ ){
                        for (var i = 0; i < res.data.list.length; i++) {
                                                html += `
                                                    <li class="J_xm-recommend-list span4">
                                                        <dl>
                                                            <dt class="dtt">
                                                                <a href="../list/list.html">
                                                                    <img src="${res.data.list[i].image}" style="width: 160px;height: 240px;"> 
                                                                </a> 
                                                            </dt> 
                                                            <dd class="xm-recommend-name"> 
                                                                <a href="../list/list.html">${res.data.list[i].title.length > 15 ? res.data.list[i].title.replace(/(.{15}).+/,"$1...") : res.data.list[i].title}</a> 
                                                            </dd> 
                                                            <dd class="xm-recommend-price">${res.data.list[i].price}元</dd> 
                                                            <dd class="xm-recommend-tips">   <span>96人好评</span>    
                                                                <a class="btn btn-small btn-line-primary J_xm-recommend-btn" href="javascript:void(0)" style="display: none;">加入购物车</a>  
                                                            </dd> 
                                                            <dd class="xm-recommend-notice"></dd> 
                                                        </dl>  
                                                    </li>
                                                    `
                                            }
                    }
                   
                   $(".new-pic").html(html)
                }).done(function(){
                    this.handleEvent();
                }.bind(this))
            }
            
            
        })
    }
    new waterfall().init()
    
})