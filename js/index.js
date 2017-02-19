/**
 * Created by Administrator on 2016/10/14.
 */
$(function(){
    var floor = {
        mainCon: $('.main-con-item'),
        ulCon:$('.floor-bar ul'),
        floorBar:$('.floor-bar'),
        init:function(){
            this.loadData();
            this.pageResize();
        },
        loadData:function(){
            var that = this;
            $.ajax({
                url:"js/louceng.json",
                success:function(d){
                    // console.log(d);
                    var str='';
                    d.forEach(function(v,k){
                        var num = d[k].num;
                        var cloth = d[k].cloth;
                        str += '<li>'
                            +       '<a href="javascript:;" class="floor-first">'+num+'</a>'
                            +       '<a href="javascript:;">'+cloth+'</a>'
                            +   '</li>';
                    });
                    that.ulCon.append(str);
                    //数据加载完毕改变位置
                    that.localposi();
                }
            })
        },
        //初始化改变left
        localposi:function(){
            var that = this;
            var wid = this.mainCon.offset().left;
            this.floorBar.css({
                "left":wid-40
            });
            //意味着数据加载完毕，在执行相应事件
            this.scrollWheel();
            this.clickScroll();
        },
        //监听页面变化，动态改变left值
        pageResize:function(){
            var that = this;
            window.onresize = function(){
                that.localposi();
            }
        },
        //滚动楼层变色
        scrollWheel:function(){
            var that = this;
            $(window).scroll(function(){
                var lis = $('.floor-bar li');
                var scrollTop = $(document).scrollTop();

                if(scrollTop >= 150){
                    that.floorBar.show();
                }else{
                    that.floorBar.hide();
                }
                that.mainCon.each(function(k,v){
                    if($(v).offset().top - scrollTop <140){
                        lis.removeClass('select');
                        lis.eq(k).addClass('select');
                    }
                });
            })
        },
        //点击跳转楼层
        clickScroll:function(){
            var that = this;
            var lis = $('.floor-bar li');

            lis.each(function(k,v){
                $(v).click(function(){
                    //初始滚动条高度
                    var scrollTop = $(document).scrollTop();
                    // console.log( that.mainCon.eq(k).offset().top);

                    //大致算下速度
                    var speed = (that.mainCon.eq(k).offset().top - scrollTop)*(13/500);
                    // console.log(speed);
                    var timer = setInterval(function(){
                        scrollTop += speed;
                        if(scrollTop*speed >= that.mainCon.eq(k).offset().top*speed){
                            scrollTop = that.mainCon.eq(k).offset().top;
                            clearInterval(timer);
                        }
                        //让滚动条等于scrolltop  最大不超过that.mainCon.eq(k).offset().top
                        $(document).scrollTop(scrollTop);
                    },13)

                })
            });
            // that.mainCon.eq(8).scrollTop(1000)
        }
    };
    floor.init();

})
