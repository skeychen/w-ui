var $jskey = $jskey || {};



document.write(
	"<style type='text/css'>" + 
		".jskey_focus{width:100%;height:100%;overflow:hidden;position:relative;margin:0 auto;padding:0;z-index:0;}" +
		".jskey_focus ul," +
		".jskey_focus li{list-style-type:none;height:100%;list-style:none;margin:0;padding:0;position:absolute;text-align:center;display:block;z-index:-1;}" +
		".jskey_focus ul li{overflow:hidden;}" +
		".jskey_focus ul li img{border:none;}" +
		".jskey_focus ul li div{position:absolute;overflow:hidden;}" +
		".jskey_focus .prevnext{width:40px;height:40px;line-height:40px;position:absolute;cursor:pointer;font-size:32px;text-align:center;color:#fff;background:#000;border-radius:20px;font-family:'\\5B8B\\4F53';font-weight:bold;}" +
		".jskey_focus .prev{left:0}.jskey_focus .next{right:0}" +
		//".jskey_focus .btnbg{position:absolute;width:100%;height:24px;left:0;bottom:0;background:none;}" +
		".jskey_focus .btn{position:absolute;width:100%;height:14px;padding:5px 0;bottom:0;text-align:right;text-align:center;}" +
		".jskey_focus .btn span{display:inline-block;_display:inline;_zoom:1;width:14px;height:14px;border-radius:7px;margin-bottom:5px;_font-size:0;margin-left:5px;cursor:pointer;background:#666;}" +
		".jskey_focus .btn span.on{background:#fff;}" +
	"</style>"
);



$jskey.focus = function(o){
	var obj = o.target;
	if(typeof o.target == "string"){obj = $("#" + o.target);}
	var box = $(obj).find(".jskey_focus");
	var len = box.find("ul li").length;
	var _w = box.width();//获取焦点图的宽度
	var _isEffect = false;
	if(o.effect && o.effect != ""){
		_isEffect = true;
		box.find("ul li").css({"left":"0","opacity":"0"});
		box.find("ul li").eq(0).css({"opacity":"1"});
	}
	var index = 0;
	var _timer = null;// 计时器

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	//鼠标滑入停止播放，滑出恢复播放
	box.hover(
		function(){clearInterval(_timer);},
		function(){palybox();}
	).trigger("mouseleave");
	var playbtn = function(){};
	function playbox(oldIndex){
		if(_isEffect){
			if(index != oldIndex){
				box.find("ul li").eq(oldIndex).animate({"opacity":"0"},800);
			}
			box.find("ul li").eq(index).animate({"opacity":"1"}, 500);
		}
		else{
			var nowLeft = -index*_w; //根据index值计算ul元素的left值
			box.find("ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
		}
		playbtn();
	}
	function playprev(){
		var oidx=index;index-=1;if(index==-1 ){index=len-1;}
		playbox(oidx);
	}
	function playnext(){
		var oidx=index;index+=1;if(index==len){index=0;}
		playbox(oidx);
	}
	function palybox(){
		_timer=setInterval(function(){playnext()},3000);
	}
	if(o.arrow){
		playbtn = function(){
			box.find(".btn span").removeClass("on").eq(index).addClass("on");//按钮样式切换
			box.find(".btn span").stop(true,false).animate({"opacity":"0.8"},300).eq(index).stop(true,false).animate({"opacity":"1"},300);//按钮透明度切换
		};
		//box.append("<div class='btnbg'></div>");
		var btn = "<div class='btn'>";
		for(var i=0; i < len; i++){
			btn += "<span></span>";
		}
		btn += "</div>";
		
		box.append(btn);
		box.find(".btnbg").css("opacity",0.2);
		//为小按钮添加鼠标滑入事件，以显示相应的内容
		box.find(".btn span").css("opacity",1).mouseover(function(){
			var oidx = index;
			index = box.find(".btn span").index(this);
			playbox(oidx);
		}).eq(0).trigger("mouseover");
	}
	if(o.button){
		//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
		box.append("<div class='prevnext prev'>&lt;</div><div class='prevnext next'>&gt;</div>");
		//上下页透明度处理
		box.find(".prevnext").css("opacity",0.2).css("top", parseInt((box.height()-40)/2) + "px").hover(
			function(){$(this).stop(true,false).animate({"opacity":"0.8"},300);},
			function(){$(this).stop(true,false).animate({"opacity":"0.2"},300);}
		);
		box.find(".prev").click(function(){playprev();});//上一页按钮
		box.find(".next").click(function(){playnext();});//下一页按钮
	}
	function x(w){
		if(_isEffect){
			_w = 0;
			box.find("ul").css("width", w);//ul的总宽度
			box.find("ul li").css("width", w).css("top", "0").css("height", box.height());
		}
		else{
			_w = w;
			box.find("ul").css("width",_w * len);//ul的总宽度
			box.find("ul li").css("width", _w).css("top", "0").css("height", box.height()).each(function(index){
				$(this).css("left", (_w * index) + "px");
			});
		}
	}
	x(_w);
	palybox();
	if(o.mode == "fit"){$(window).resize(function(){x($(window).width());});}
	try{
		var t, n, r, i;
		box.on("touchstart", function(e){
			t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			r = t.pageX;
			i = t.pageY;
		});
		box.on("touchmove", function(e){
			e.preventDefault()
		});
		box.on("touchend", function(e){
			t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			n = t.pageX - r;
			if(n > 0){
				playprev();
			}
			else{
				playnext();
			}
		});
	}
	catch(touchEx){}
};