$(function(){
    function waterfall(){
        $.extend(waterfall.prototype,{
            init(){
                this.loadjson()
                .done($.proxy(function(res){
                    this.rendring(res.data.list)
                },this))
            },
            loadjson(){
                return $.ajax({
                    // url:"http://www.wookmark.com/api/json/popular",
                    url:"http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=0&trace=0&limit=10&endId=0&pid=106888&_=1526369583128",
                    dataType:"jsonp"
                })
                
            },
            rendring(json){
                var html = ``;
                for(var i=0;i<json.length;i++){
                    html+=`
                    <li>
                        <img src="${json[i].image}">
                        <h2>${json[i].title}</h2>
                    </li>`
                }
                $(".new-pic").html(html)
            }
        })
    }
    new waterfall().init()
})