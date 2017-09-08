(function($){



document.write(
"<style type='text/css'>" + 
".nav-tool{position:relative;margin:0 auto;clear:both;width:100%;height:100%;}" +
".nav-tool *{margin:0;padding:0;}" +
".nav-tool a,.nav-up a:link{color:#eee;text-decoration:none;display:inline-block;}" +
".nav-tool a:link{cursor:pointer;}" +
".nav-tool a:hover{color:#fff;text-decoration:none;outline:none;}" +

".nav-up{position:absolute;top:0;width:100%;z-index:47;}" +
".nav-up ul{diaplay:block;list-style-type:none;}" +
".nav-down{position:absolute;width:100%;}" +
".nav-down .nav-down-menu{z-index:99;position:absolute;top:0px;display:none;}" +
".nav-down dl{text-align:center;}" +
".nav-down dt{}" +
".nav-down dt a{font-weight:normal;display:block;min-width:66px;}" +
".nav-down dd{}" +
".nav-down dd a{font-weight:normal;display:block;min-width:66px;}" +

".nav-up{height:38px;}" +
".nav-up li{float:left;background-color:inherit;}" +
".nav-up a{line-height:38px;height:38px;padding:0 26px;font-weight:normal;font-size:14px;}" +
".nav-up .nav-up-hover a{}" +
".nav-up .nav-up-hover a:hover{}" +
".nav-down{top:38px;left:0px;}" +
".nav-down .nav-down-menu{width:100%;}" +
".nav-down dl{margin:1px;}" +
".nav-down dt{}" +
".nav-down dt a{padding:0 25px;line-height:38px;height:38x;color:#ddd;font-size:14px;}" +
".nav-down dt a:hover{}" +
".nav-down dd{}" +
".nav-down dd a{padding:0 25px;line-height:35px;height:35x;color:#ccc;font-size:12px;}" +
".nav-down dd a:hover{}" +
"</style>"
);



$.fn.navtool = function(o){
	o = $.extend({height:38,bgColor:"#202833",bgColorHover:"#344157",bgColorMenu:"#344157",close:true}, o);
	o.style = "line-height:" + o.height + "px;height:" + o.height + "px;";
	var m = $(this), ts = [];
	m.find(".nav-up").css("height", o.height + "px").css("background-color", o.bgColor);
	m.find(".nav-up a").each(function(){$(this).attr({"style":o.style});});
	m.find(".nav-down").css("top", o.height + "px");
	m.find(".nav-down-menu").css("background-color", o.bgColorMenu).each(function(){
		var _t = $(this);
		var _n = _t.attr("data-nav") || "";
		var _w = _n.indexOf("!") == 0;
		if(_w && o.close){
			var dd = m.find(".nav-up li[data-nav='"+_n+"']").eq(0);
			if(dd.length > 0){
				_t.css({marginLeft:dd.position().left});
				if(_t.width() == null || _t.width() >= m.width()){
					_t.css({width:dd.width()});
					_t.children("dl").css({margin:"1"}).find("a").css({padding:"0"});
				}
			}
		}
		else{
			_t.children("dl").css({float:"left"});
		}
	});
	if(!o.close){
		m.find(".nav-down-menu").css("z-index", 1);
		var x = m.find(".nav-up [data-nav]:eq(0)");
		x.css("background-color", o.bgColorHover);
		x.addClass("nav-up-hover");
		m.find(".nav-down").find("[data-nav='" + x.attr("data-nav") + "']").slideDown(0);
	}
	function m_out(){
		var _n = $(this).attr("data-nav") || "";
		if(o.close){
			clearTimeout(ts[_n+"_timer"]);
			clearTimeout(ts["x_timer"]);
			ts[_n+"_timer"] = setTimeout(function(){
				m.find(".nav-up li").each(function(){$(this).attr("style", "").removeClass("nav-up-hover");});
				m.find(".nav-down").find("[data-nav='"+_n+"']").stop(true,true).slideUp(200);
			}, 150);
		}
	}
	function m_in(){
		var _t = $(this);
		var _n = _t.attr("data-nav") || "";
		clearTimeout(ts[_n+"_timer"]);
		clearTimeout(ts["x_timer"]);
		ts[_n+"_timer"] = setTimeout(function(){
			if(!o.close){m.find(".nav-down").find("[data-nav]").slideUp(0);}
			m.find(".nav-up li").each(function(){
				if(_t[0] == $(this)[0] || _n == $(this).attr("data-nav")){
					$(this).addClass("nav-up-hover").attr("style", "background-color:" + o.bgColorHover);
				}
				else{
					$(this).removeClass("nav-up-hover").attr("style", "");
				}
			});
			m.find(".nav-down").find("[data-nav='"+_n+"']").stop(true,true).slideDown(o.close?200:0);
		}, 150);
	}
	function n_in(){
		var _n = $(this).attr("data-nav") || "";
		clearTimeout(ts[_n+"_timer"]);
	}
	m.find(".nav-up li").hover(m_in, m_out);
	m.find(".nav-down .nav-down-menu").hover(n_in, m_out);
};



})(jQuery);