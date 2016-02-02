var $jskey = $jskey || {};



$jskey.$=function(id){return document.getElementById(id);};
$jskey.$byTagName=function(name){return document.getElementsByTagName(name);};
$jskey.$replace=function(str,t,u){str=str+"";var i=str.indexOf(t);var r="";while(i !=-1){r+=str.substring(0,i)+u;str=str.substring(i+t.length,str.length);i=str.indexOf(t);}r=r+str;return r;};
$jskey.$link=function(path){var k=document.createElement("link");k.rel="stylesheet";k.type="text/css";k.href=path;document.getElementsByTagName("head")[0].appendChild(k);k=null;};
$jskey.$src = $jskey.$replace($jskey.$byTagName("script")[$jskey.$byTagName("script").length - 1].src + "", "\\", "/");
$jskey.$path = $jskey.$src.substring(0, $jskey.$src.lastIndexOf("/") + 1);
try{if($jskey.$path.length>7 && $jskey.$path.substring($jskey.$path.length-7)!="/jskey/"){$jskey.$path="/web/js/jskey/";}}catch(e){}



$jskey.$link($jskey.$path + "themes/focus/focus.css");
$jskey.focus = function(o){
	var obj = o.target;
	if(typeof o.target == "string"){obj = $("#" + o.target);}
	var box = $(obj).find(".jskey_focus");
	var _width = box.width(); //获取焦点图的宽度（显示面积）
	box.find("ul li").css("width", _width);
	//box.find("ul li").width(_width);
	var len = box.find("ul li").length;
	var index = 0;
	var _timer;// 计时器

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	//鼠标滑入停止播放，滑出恢复播放
	box.hover(
		function(){clearInterval(_timer);},
		function(){palybox();}
	).trigger("mouseleave");
	var playbtn = function(){};
	function playbox(){
		var nowLeft = -index*_width; //根据index值计算ul元素的left值
		box.find("ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
		playbtn();
	}
	function palybox(){
		_timer=setInterval(function(){index++;if(index==len){index=0;}playbox();},3000);
	}
	if(o.arrow){
		playbtn = function(){
			box.find(".btn span").removeClass("on").eq(index).addClass("on");//按钮样式切换
			box.find(".btn span").stop(true,false).animate({"opacity":"0.3"},300).eq(index).stop(true,false).animate({"opacity":"1"},300);//按钮透明度切换
		};
		var btn = "<div class='btnbg'></div><div class='btn'>";
		for(var i=0; i < len; i++){
			btn += "<span></span>";
		}
		btn += "</div>";
		
		box.append(btn);
		box.find(".btnbg").css("opacity",0.2);
		//为小按钮添加鼠标滑入事件，以显示相应的内容
		box.find(".btn span").css("opacity",0.4).mouseover(function(){
			index = box.find(".btn span").index(this);
			playbox();
		}).eq(0).trigger("mouseover");
	}
	if(o.button){
		//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
		box.append("<div class='prevnext prev'></div><div class='prevnext next'></div>");
		//上下页透明度处理
		box.find(".prevnext").css("opacity",0.2).css("top", parseInt((box.height()-74)/2) + "px").hover(
			function(){$(this).stop(true,false).animate({"opacity":"0.8"},300);},
			function(){$(this).stop(true,false).animate({"opacity":"0.2"},300);}
		);
		box.find(".prev").click(function(){index-=1;if(index==-1 ){index=len-1;}playbox();});//上一页按钮
		box.find(".next").click(function(){index+=1;if(index==len){index=0;}    playbox();});//下一页按钮
	}
	palybox();
	if(o.mode == "fit"){
		$(window).resize(function(){
			_width = $(window).width();
			box.find("ul").css("width",_width * (box.find("ul li").length));//ul的总宽度
			box.find("ul li").css("width", _width);
			playbox()
		});
	}
};