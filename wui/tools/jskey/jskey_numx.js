/**
 * 统计数字类
 * @version 1
 * @datetime 2020-05-20 15:20
 * @author skey_chen
 * @copyright 2011-2020 &copy; skey_chen@163.com
 * @license LGPL
 */
var $jskey = $jskey || {};



$jskey.extend = function(d, s){
	for(var p in s) {
		if(typeof s[p] == 'object'){
			d[p] = d[p] || {};
			$jskey.extend(d[p], s[p]);
		}else{
			d[p] = d[p]||s[p];
		}
	}
	return d;
};



$jskey.$ = function(id){
	return document.getElementById(id);
};



;!function(){"use strict";


/*
document.write(
	"<style type='text/css'>" +
		".jskey_numx{font-size:0;clear:both;text-align:center;width:auto;}" +
		".jskey_numx *{display:inline-block;vertical-align:top;font-size:12px;color:#333333;width:auto;padding:0;}" +
		".jskey_numx .numbox{margin:0 auto;display:inline-block;overflow:hidden;}" +
		".jskey_numx .numbox .num{border-radius:2px;margin:0;display:block;}" +
	"</style>"
);
*/
/*
$jskey.numx({num:0,maxlen:0,height:200,times:300,
	target:'p',// 放置翻页控件信息的html的DOM的id
    dom:{
    	"tag":"div", "style":{"className":"jskey_numx"},
    	"item":{"tag":"div", "style":{"className":""}}
    },
	fn:function(e){// 回调函数，初始化完成时也会执行一次
		fn(e);
	}
});
*/
var count = 0;
var allnum = "";
for(var i = 0; i <= 9; i++){
	allnum += '<div class="num">'+ i +'</div>';
}
allnum = allnum + allnum;
$jskey.Numx = function(p){
	this.config = p || {};
	this.k = count++;
	this.numArray = [];
	this.num = 0;
	this.maxlen = 16;
	this.kid = "";
	this.numArray = [];
	this.o = null;
	this.config_();
	this.init_();
};
$jskey.Numx.prototype.config_ = function(){
	var E = this;
	var d = {dom:{tag:"div", style:{className:"jskey_numx"}, item:{tag:"div", style:{className:"numxbox"}}}};
	E.config = E.config||{};
	$jskey.extend(E.config, d);
	var C = E.config;
	
	C.num = C.num||0;
	if(C.num < 0){C.num = 0;}
	E.num = C.num;
	
	C.maxlen = C.maxlen||16;
	if(C.maxlen <= 0){C.maxlen = 16;}
	E.maxlen = C.maxlen;
	
	C.height = C.height||80;
	if(C.height <= 0){C.height = 80;}
	E.height = C.height;
	
	E.fullHeight = C.height*10;
	
	E.numArray = [];
	E.kid = "jskey_"+ E.k +"_numx";
	C.dom.tag = C.dom.tag.toLowerCase();
	C.dom.item.tag = C.dom.item.tag.toLowerCase();
	E.o = C.target || C.object || C.cont;
	switch(typeof E.o === 'object' ? (E.o.length === undefined ? 2 : 3) : 1){
		case 3:break;// jquery对象
		case 1:E.o = $jskey.$(E.o);
		case 2:E.o.html = function(v){this.innerHTML = v;};break;
	}
};
//初次渲染
$jskey.Numx.prototype.init_ = function(){
	var E = this;
	var vstr = E.num + "";
	var vlen = vstr.length;
	if(vlen > E.maxlen){
		vstr = vstr.substring(E.maxlen - vlen, vlen);
		vlen = vstr.length;
	}
	var arr = E.numArray;// 个位数开始
	for(var i = 0; i < vlen; i++){var j = vlen - i;
		arr.push(parseInt(vstr.substring(j-1, j)));
	}
	if(E.maxlen > vlen){for(var i = vlen; i < E.maxlen; i++){arr.push(0);}}// 没有数据的补0
	E.kid = "jskey_"+ E.k +"_numx";
	
	var D = E.config.dom;
	var H = '';
	for(var i = (E.maxlen - 1); i >= 0; i--){
		var x = '<div id="' + E.kid + i +'" class="numx" style="margin-top:-'+(arr[i]*E.height)+'px">'+allnum+'</div>';
		H += '<'+D.item.tag+' class="'+D.item.style.className+'" style="line-height:'+E.height+'px;height:'+E.height+'px;">' + x + '</'+D.item.tag+'>';
	}
	H = '<'+D.tag+' onselectstart="return false;" class="'+D.style.className+'">' + H + '</'+D.tag+'>';
	this.o.html(H);
};
// 加减到指定数字
$jskey.Numx.prototype.to = function(v){
	var E = this;
	
	var vstr = v + "";
	var vlen = vstr.length;
	if(vlen > E.maxlen){
		vstr = vstr.substring(E.maxlen - vlen, vlen);
		vlen = vstr.length;
	}
	
	var varr = [];
	for(var i = 0; i < E.maxlen; i++){varr.push(0);}
	for(var i = 0; i < vlen; i++){var j = vlen - i;
		varr[i] = parseInt(vstr.substring(j-1, j));
	}
	
	var val = v - E.num;
	E.num = v;
	if(val == 0){}else if(val > 0){E.toUp(E, val);}else{E.toDown(E, -1*val);}
};
// 加1
$jskey.Numx.prototype.toUp = function(E, val){
	if(val == 0){return;}
	var i = 0;
	while(i < E.maxlen){
		var v = E.numArray[i];
		var o = $("#" + E.kid + i);
		if(v == 9){
			E.numArray[i] = 0;
			if(i == 0){
				o.stop();
			}
			o.animate({marginTop:("-"+E.fullHeight+"px")}, i == 0 ? 1 : Math.pow(5, i+1));
			i++;
		}else{
			if(v == 0){o.css("marginTop", "0px");}// 复原回上0
			E.numArray[i] = E.numArray[i]+1;
			if(i == 0){
				o.stop();
			}
			o.animate({marginTop:("-"+(E.numArray[i]*E.height)+"px")}, i == 0 ? 1 : Math.pow(5, i+1));
			break;
		}
	}
	val--;
	E.toUp(E, val);
	return;
};
// 减1
$jskey.Numx.prototype.toDown = function(E, val){
	if(val == 0){return;}
	var i = 0;
	while(i < E.maxlen){
		var v = E.numArray[i];
		var o = $("#" + E.kid + i);
		if(v == 0){
			o.css("marginTop", "-"+E.fullHeight+"0px");// 复原回下0
			E.numArray[i] = 9;
			o.animate({marginTop:("-"+(E.numArray[i]*E.height)+"px")}, i == 0 ? 1 : Math.pow(5, i+1));
			i++;
		}else{
			E.numArray[i] = E.numArray[i]-1;
			o.animate({marginTop:("-"+(E.numArray[i]*E.height)+"px")}, i == 0 ? 1 : Math.pow(5, i+1));
			break;
		}
	}
	val--;
	E.toDown(E, val);
	return;
};
// 加减到指定数字
$jskey.Numx.prototype.move = function(v){
	var E = this;
	var vstr = v + "";
	var vlen = vstr.length;
	if(vlen > E.maxlen){
		vstr = vstr.substring(E.maxlen - vlen, vlen);
		vlen = vstr.length;
	}
	var varr = [];
	for(var i = 0; i < E.maxlen; i++){varr.push(-1);}
	for(var i = 0; i < vlen; i++){var j = vlen - i;
		varr[i] = parseInt(vstr.substring(j-1, j));
	}
	var val = v - E.num;
	if(val == 0){}else if(val > 0){E.moveUp(E, v, varr);}else{E.moveDown(E, v, varr);}
};
// 加到指定数字
$jskey.Numx.prototype.moveUp = function(E, v, varr){
	var i = 0;
	while(i < E.maxlen){
		if(varr[i] == -1){// 加大了的数，高位肯定都是0
			for(var j=i; j<E.maxlen; j++){varr[j] = 0;}break;
		}else if(varr[i] == E.numArray[i]){
		}else{
			var o = $("#" + E.kid + i);
			var top = parseInt(o.css("marginTop").replace('px', '').replace('-', ''));// 取正
			var tmp = varr[i];
			if(top > E.fullHeight){o.css("marginTop", "-"+(top-E.fullHeight)+"px");}// 复位上
			if(tmp < E.numArray[i]){tmp = tmp+10;}// 滚动到下面的数字
			o.animate({marginTop:("-"+(tmp*E.height)+"px")}, 300, function(){});
		}
		i = i+1;
	}
	E.numArray = varr;
	E.num = v;
};
// 减到指定数字
$jskey.Numx.prototype.moveDown = function(E, v, varr){
	var i = E.maxlen - 1;
	while(i >= 0){
		if(varr[i] == -1){var o = $("#"+E.kid+i);o.css("marginTop", "0px");varr[i] = 0;
		}else if(varr[i] == E.numArray[i]){
		}else{
			var o = $("#"+E.kid+i);
			var top = parseInt(o.css("marginTop").replace('px', '').replace('-', ''));// 取正
			var tmp = varr[i];
			if(top < E.fullHeight){o.css("marginTop", "-"+(top+E.fullHeight)+"px");}// 复位下
			if(tmp > E.numArray[i]){tmp = tmp + 10;}// 滚动到上面的数字
			o.animate({marginTop:("-"+(tmp*E.height)+"px")}, 300, function(){});
		}
		i = i-1;
	}
	E.numArray = varr;
	E.num = v;
};


$jskey.numx = function(p){
	return new $jskey.Numx(p);
};



}();