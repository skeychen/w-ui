document.write("<style type='text/css'>.wza_line_x {border: 1px solid #ff0000;height: 0;left: 0;position: fixed;top: 135px;width: 100%;z-index: 100000;}\
.wza_line_y {border: 1px solid #ff0000;height: 100%;left: 135px;position: fixed;top: 0;width: 0;z-index: 100000;}\
.wza_magnifier_msg {background:none repeat scroll 0 0 #fff;display:block;height:120px;width:100%;font-size:60px;text-align:center;line-height:1;position:absolute;top:0;left:0;z-index:99999;border:1px solid #000;border-left:none;border-right:none;}\
.wza{background:none repeat scroll 0 0 #fff;width:100%;height:45px;display:none;position:absolute;top:0;left:0;z-index:99999;}\
  .wza_con{*zoom:1;width:1000px;height:38px;padding:5px 0 0 0;margin:0 auto;font-family:'Microsoft YaHei';}\
  .wza_con a,\
  .wza_con span{display:inline-block;color:#474747;font-size:18px;font-weight:bold;}\
  .wza_con .button{height:31px;line-height:31px;cursor:pointer;background-color:#f8f8f8;color:#000;border-radius:3px;padding:0 5px;border:1px solid #999;}\
  .wza_con .button:hover{background-color:#efefef;}\
	.wza_title{float:left;margin-left:18px;height:31px;line-height:31px;}\
	.wza_color{float:left;margin-left:5px;}\
	.wza_magnifier{float:left;margin-left:18px;}\
	.wza_page_big  {float:left;margin-left:18px;}\
	.wza_page_small{float:left;margin-left:5px;margin-right:18px;}\
	.wza_txt{float:left;margin-left:18px;}\
	.wza_line{float:left;margin-left:18px;}\
	.wza_hide{float:right;margin-left:5px;}\
	.wza_reset{float:right;margin-left:5px;}\
</style>");
// 无障碍阅读
$(function(e) {

var html = "<div class='wza'>\
<div class='wza_con'>\
	<a href='javascript:;' class='button wza_magnifier'>放大器</a>\
	<a href='javascript:;' class='button wza_page_big'>页面放大</a>\
	<a href='javascript:;' class='button wza_page_small'>页面缩小</a>\
	<a href='javascript:;' class='button wza_color' style='background-color:#ffffff; '>无</a>\
	<a href='javascript:;' class='button wza_color' style='background-color:#0074fc;color:#fed300'>字</a>\
	<a href='javascript:;' class='button wza_color' style='background-color:#fed300;color:#0074fc'>字</a>\
	<a href='javascript:;' class='button wza_color' style='background-color:#222222;color:#fed300'>字</a>\
	<a href='javascript:;' class='button wza_color' style='background-color:#c1c1c1;color:#222222'>字</a>\
	<a href='javascript:;' class='button wza_txt'>纯文本</a>\
	<a href='javascript:;' class='button wza_line'>打开辅助线</a>\
	<a href='javascript:;' class='button wza_hide'>隐藏</a>\
	<a href='javascript:;' class='button wza_reset'>重置</a>\
</div><div style='display:block;clear:both;'></div>\
</div>";
	$("body").append(html);


	var winWidth = $(window).width();
	var documentTop = $(document).scrollTop();
	var winHeight = $(window).height();
	
	// 放大器
	var txt = '<div class="wza_magnifier_msg" title="双击此区域可关闭放大器">&nbsp;</div>';
	txt = $(txt);
	$("body").append(txt); //插入放大框
	var txtshow = false;
	txt.hide();
	$(".wza_magnifier_msg").on("dblclick", function(e){
		assistant_txt();
	});
	$(".wza_magnifier").click(function(){assistant_txt();});
	var assistant_txt = function(){
		$(".wza_magnifier_msg").toggle("fast", function(){
			txtshow = $(".wza_magnifier_msg").css("display") != "none";
		});
	};
	$("body").mousemove(function (e){
		if(!txtshow){
			return;
		}
		var tar = e.target;
		var txt = "";
		if($(tar).is("select")){
			txt = $(tar).find("option:selected").text();
		}
		else if($(tar).is("input[type=text]")||$(tar).is("input[type=button]")){
			txt = $(tar).val();
		}
		else if($(tar).is("button")
				||$(tar).is("a")
				||$(tar).is("span")
				||$(tar).is("p")
				||$(tar).is("th")
				||$(tar).is("td")
				||$(tar).is("dt")
				||$(tar).is("dd")
				||$(tar).is("h1")||$(tar).is("h2")||$(tar).is("h3")||$(tar).is("h4")||$(tar).is("h5")||$(tar).is("h6")){
			txt = $(tar).text();
		}
		$(".wza_magnifier_msg").css("font-size",(txt.length>20 ? "40px" : "60px")).html(txt);
	});
	
	// 页面放大缩小
	var zoon = 1;
	$(".wza_page_big").click(function(){zoonfun(0);if(txtshow){assistant_txt();}});
	$(".wza_page_small").click(function(){zoonfun(1);if(txtshow){assistant_txt();}});
	var zoonfun = function(bool){
		if(bool==0){
			zoon+=.1;
			if(zoon > 2){zoon=2;}
		}else if(bool==1){
			if(zoon < .5){
				zoon=.5;
			}else if(zoon>1){
				zoon-=.1;
			}
		}
		if(bool == -1){zoon = 1;}
		var bodym = $("body");
		bodym.css({'transform-origin':'top center'});
		bodym.css({'transform':'scale('+zoon+','+zoon+')'});
		if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){ 
			bodym.css("zoom",zoon);
		}
	};
	
	// 配色
	var element_styles = []; // 修改的对象样式集合(记录已修改的)
	var element_doms = []; // 修改的对象集合(记录已修改的)
	var changeColorFlag = false;
	$(".wza_color").each(function(index, element) {
		var e =  $(this);// 初始化信息，用于还原使用
		this.wzabgcolor = e.css("background-color");
		this.wzacolor = e.css("color");
	});
	$(".wza_color").click(function(){
		var index = $(".wza_color").index(this);
		if(index !=0){
			change_color($(this).css("background-color"),$(this).css("color"));
			changeColorFlag = true;
			// 此处需要还原相关的字体设置
			$(".wza_color").each(function(index, element) {
				var e =  $(this);
				e.css("background-color", this.wzabgcolor);
				e.css("color", this.wzacolor);
			});
			return;
		}else{
			if(changeColorFlag){
				for(var i=0; i<element_doms.length; i++){
					$(element_doms[i]).attr("style",element_styles[i]);
				}
				$('body').css("background-color","#f7fcff");// 这里需要手工设置原body背景色
				changeColorFlag = false;
			}
		}
	});
	
	var change_color = function(bgcolor,txtcolor){
		var e = $($("body").find("div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td,ul, ol input,select,textare ,a ,span, header"));
		if(!changeColorFlag){
			for(var i =0; i<e.length; i++){
				element_doms[i] = $(e[i]);
				element_styles[i] = $(e[i]).attr('style')?$(e[i]).attr('style'):'';
			}
		}
		e.css("background-color",bgcolor);
		e.css("color",txtcolor);
		$('body').css("background-color",bgcolor);
	};
	
	
	// 辅助线
	$(".wza_line").toggle(function(){
		$(this).html("关闭辅助线");//.css("background-position","right bottom");
		assistant_line();
	}, function(){
		$(this).html("打开辅助线");//.css("background-position","right top");
		assistant_line();
	});
	var assistant_line = function(){
		if($(".wza_line_x").size()>0){
			$(".wza_line_x").remove();	
			$(".wza_line_y").remove();	
		}else{
			$("body").append('<div class="wza_line_x"></div>');
			$("body").append('<div class="wza_line_y"></div>');
			$(document).mousemove(function (o){
				var m = $(".wza_line_y").outerWidth(true);
				var n = $(".wza_line_x").outerHeight(true);
				var l = o.clientX - m;
				var k = o.clientY - n;
				$(".wza_line_x").css({left : 0, top : k});
				$(".wza_line_y").css({left : l, top : 0});
			});
		}
	};

	// 纯文本功能
	$(".wza_txt").click(function(){
		if(!$(this).hasClass("on")){
			//link[id != 'wza_style']
			$("link").each(function(index, element) {
				var e =  $(element);
				e.attr("url",e.attr("href"));
			});
			$("link").attr("href","");
			$("img").hide();
			$(this).addClass("on");
		}else{
			$("link").each(function(index, element) {
				var e =  $(element);
				e.attr("href",e.attr("url"));
			});
			$("img").show();
			$(this).removeClass("on");	
		}
	});
	
	// 重置
	$(".wza_reset").click(function(){window.location.reload();});
	
	// 隐藏
	$(".wza_hide").click(function(){$(".wza").slideUp(555);});
	
	$(window).on("resize", function(e){
		winWidth = $(window).width();
		documentTop = $(document).scrollTop();
		winHeight = $(window).height();
		if(winWidth < 1000){
			$(".wza").width("1000px");
		}else{
			$(".wza").width("100%");
		}
		$(".wza").css("top", documentTop + "px");
		$(".wza_magnifier_msg").css("top", (documentTop + 45) + "px");
	});
	$(window).on("scroll", function(e){
		documentTop = $(document).scrollTop();
		winHeight = $(window).height();
		$(".wza").css("top", documentTop + "px");
		$(".wza_magnifier_msg").css("top", (documentTop + 45) + "px");
	});
	$(".wza_magnifier_msg").css("top", (documentTop + 45) + "px");
});

	




