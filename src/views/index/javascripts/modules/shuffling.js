//banner图自动播放
$(function(){
    function Imgscroll(selector){
        this.index=0;
        this.el=$(selector);
        this.start();
        this.timer=null;
        this.mouseoverOn();
    }
    Imgscroll.prototype={
        start:function(){
           clearInterval(this.timer); 
           this.timer=setInterval(function(){
                this.imgmove();
                this.imgnav();
           }.bind(this),5000)
        },
        //切换图片
        imgmove:function(){
            this.li=this.el.children(".banner-list").children("li")[this.index];                       
            this.index++;
            if(this.index>1){
                this.index=0;
            }
            // console.log(this.li);
            $(this.li).stop().fadeOut(1000).siblings().stop().fadeIn(1000);
        },
        //改变按钮样式
        imgnav:function(){
            this.p=this.el.find(".check").children("p")[this.index];
            // console.log(this.p)
            $(this.p).css({
                background:"#ffffff",
                color:"#333333"
            },);
            $(this.p).siblings().css({
                background:"#333333",
                color:"#ffffff"
            },);
        },
        //鼠标滑过按钮时改变按钮样式，改变图片
        mouseoverOn:function(){
            var that=this;
            this.el.find("p").on("mouseover",function(){
                that.index=$(this).index();
                that.imgmove();
                that.imgnav();
            })
        }
    }
    new Imgscroll(".banner");
})
