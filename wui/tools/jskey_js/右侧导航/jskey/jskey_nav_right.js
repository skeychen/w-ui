if(typeof ($jskey) != "object"){$jskey = {};}
;!function(){
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
