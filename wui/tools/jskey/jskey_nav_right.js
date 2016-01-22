var $jskey = $jskey || {};
;!function(){
document.write(
	"<style type='text/css'>" + 
	".jskey_nav_right{width:40px;position:fixed;right:0;top:88px;_position:absolute;text-align:left;cursor:pointer;background-image:url(about:blank);}" +
	".jskey_nav_right a{background:#fafafa;color:#39A4DC;width:30px;overflow:hidden;right:-1px;height:30px;line-height:30px;margin-top:1px;display:block;cursor:pointer;position:relative;padding-right:10px;}" +
	".jskey_nav_right a:hover{background:#39A4DC;color:#ffffff;text-decoration:none;}" +

	".jskey_nav_right a em{background:#39A4DC;color:#ffffff;display:block;float:left;width:30px;font-size:16px;text-align:center;margin-right:10px;text-decoration:none;}" +
	".jskey_nav_right a:hover em{background:#00b700;}" +

	".jskey_nav_right a.new em{background:#ff6600;color:#ffffff;}" +
	".jskey_nav_right a.new:hover em{background:#00b700;color:#ffffff;}" +
	"</style>"
);



$jskey.navRight = function(z, w){
	z.css("width",(w + 40) + "px");
	z.find("a").each(function(){$(this).css("right","-"+(w+10)+"px").css("width",(w+30)+"px");});
	var tx;
	z.hover(function(){
		tx=setTimeout(function(){z.find("a").each(function(i){var ta=$(this);setTimeout(function(){ta.animate({right:"0"},300);},50*i);});},300);
	},function(){
		if(tx){clearTimeout(tx);}z.find("a").each(function(i){var ta=$(this);setTimeout(function(){ta.animate({right:"-"+(w+10)},300,function(){});},50*i);});
	});
};
}();
