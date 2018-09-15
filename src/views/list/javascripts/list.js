$(function(){
    function Magnifier(){
        this.init();
    }
    $.extend(Magnifier.prototype,{
        init(){
            this.smallimg=$(".smallimg");
            this.check=$(".check");
            this.bigimg=$(".bigimg");
            this.cover=$(".cover");
            this.smallpic=$(".smallimg img");
            this.checkpic=$(".check img");
            this.bigpic=$(".bigimg img");
            this.smallpic.eq(0).show().siblings().hide();
            this.handelEvent();
            this.checkpic.click(function(){
                this.target=event.target;
                this.smallimg.children("img").eq($(this.target).index()).show().siblings().hide();
                this.bigimg.children("img").eq((this.bigpic.length-1)-$(this.target).index()).siblings().hide();    
            }.bind(this));
        },
        handelEvent(){
            this.smallimg.on("mouseenter", $.proxy(this.mousein, this))
            this.smallimg.on("mouseleave", $.proxy(this.mouseout, this))
            this.smallimg.on("mousemove", $.proxy(this.mousemove, this))
        },
        mousein(){
            this.cover.fadeIn();
            this.bigimg.fadeIn();
        },
        mouseout(){
            this.cover.fadeOut();
            this.bigimg.fadeOut();
        },
        mousemove(event){
            var evt = event;
                var nLeft = evt.offsetX;
                var nTop = evt.offsetY;
                this.elemmove({
                    left:nLeft - this.cover.width() / 2,
                    top:nTop - this.cover.height() / 2
                })
        },
        elemmove(pos){
            var maxLeft = this.smallimg.width() - this.cover.width();
            pos.left = pos.left <= 0 ? 0 : pos.left;
            pos.left = pos.left >= maxLeft  ? maxLeft : pos.left;

            var maxTop = this.smallimg.height() - this.cover.height();
            pos.top = pos.top <= 0 ? 0 : pos.top;
            pos.top = pos.top >= maxTop ? maxTop : pos.top;
            
            this.cover.css({
                left:pos.left,
                top:pos.top
            })
            this.bigpic.eq((this.bigpic.length-1)-$(this.target).index()).show().siblings().hide()
            this.bigpic.css({
                left:-parseInt(this.bigpic.width()/this.smallimg.width())*this.cover.position().left,
                top:-parseInt(this.bigpic.height()/this.smallimg.height())*this.cover.position().top
            })
        }
    })
    new Magnifier();
})