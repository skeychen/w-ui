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
	this.config = p || {};// {numArray,num,maxlen,idx}
	this.config.i = count++;
	this.numArray = [];
	this.o = null;
	this.config_();
	this.init_();
};
$jskey.Numx.prototype.config_ = function(){
	var C = this.config;
	var d = {dom:{tag:"div", style:{className:"jskey_numx"}, item:{tag:"div", style:{className:"numxbox"}}}};
	C = C||{};
	$jskey.extend(C, d);
	
	C.num = C.num||0;
	if(C.num < 0){C.num = 0;}
	
	C.maxlen = C.maxlen||16;
	if(C.maxlen <= 0){C.maxlen = 16;}
	
	C.times = C.times||500;
	if(C.times < 0){C.times = 500;}
	
	C.height = C.height||80;
	if(C.height <= 0){C.height = 80;}
	C.fullHeight = C.height*10;
	
	C.numArray = [];
	C.dom.tag = C.dom.tag.toLowerCase();
	C.dom.item.tag = C.dom.item.tag.toLowerCase();
	this.o = C.target || C.object || C.cont;
	switch(typeof this.o === 'object' ? (this.o.length === undefined ? 2 : 3) : 1){
		case 3:break;// jquery对象
		case 1:this.o = $jskey.$(this.o);
		case 2:this.o.html = function(v){this.innerHTML = v;};break;
	}
};
//初次渲染
$jskey.Numx.prototype.init_ = function(){
	var C = this.config;
	var maxlen = C.maxlen;
	var vstr = C.num + "";
	var arr = C.numArray;
	var vlen = vstr.length;
	if(vlen > maxlen){
		vstr = vstr.substring(maxlen - vlen, vlen);
		vlen = vstr.length;
	}
	for(var i = 0; i < vlen; i++){
		var j = vlen - i;
		arr.push(parseInt(vstr.substring(j-1, j)));// 个位数开始
	}
	// 没有数据的补0
	if(maxlen > vlen){
		for(var i = vlen; i < maxlen; i++){
			arr.push(0);
		}
	}
	var C = this.config;
	C.idx = "jskey_"+ C.i +"_numx";
	var H = '';
	for(var i = (maxlen - 1); i >= 0; i--){
		var x = '<div id="' + C.idx + i +'" class="numx" style="margin-top:-'+(arr[i]*C.height)+'px">'+allnum+'</div>';
		H += '<'+C.dom.item.tag+' class="'+C.dom.item.style.className+'" style="line-height:'+C.height+'px;height:'+C.height+'px;">' + x + '</'+C.dom.item.tag+'>';
	}
	H = '<'+C.dom.tag+' onselectstart="return false;" class="'+C.dom.style.className+'">' + H + '</'+C.dom.tag+'>';
	this.o.html(H);
};
// 加减到指定数字
$jskey.Numx.prototype.to = function(v){
	var E = this;
	var C = E.config;
	var maxlen = C.maxlen;
	var varr = [];
	for(var i = 0; i < maxlen; i++){varr.push(0);}
	
	var vstr = v + "";
	var vlen = vstr.length;
	if(vlen > maxlen){
		vstr = vstr.substring(maxlen - vlen, vlen);
		vlen = vstr.length;
	}
	
	for(var i = 0; i < vlen; i++){
		var j = vlen - i;
		varr[i] = parseInt(vstr.substring(j-1, j));
	}
	var val = v - C.num;
	var temp_fn = function(E, v, varr){
		E.moveUp(E, v, varr);
	};
	
	C.tmpArray = varr;
	C.num = v;
	if(val == 0){
	}
	else if(val > 0){
		E.toUp(E, val);
	}
	else{
		E.toDown(E, -1*val);
	}
	
};
// 加1
$jskey.Numx.prototype.toUp = function(E, val){
	if(val == 0){return;}
	var i = 0;
	while(i < E.config.maxlen){
		var v = E.config.numArray[i];
		var o = $("#" + E.config.idx + i);
		if(v == 9){
			E.config.numArray[i] = 0;
			o.animate({marginTop:("-"+(E.config.numArray[i]*E.config.height)+"px")}, i==0 ? 10 : Math.pow(10, i+1));
			i++;
		}else{
			if(v == 0){
				o.css("marginTop", "0px");// 复原回上0
			}
			E.config.numArray[i] = E.config.numArray[i]+1;
			o.animate({marginTop:("-"+(E.config.numArray[i]*E.config.height)+"px")}, i==0 ? 10 : Math.pow(10, i+1));
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
	while(i < E.config.maxlen){
		var v = E.config.numArray[i];
		var o = $("#" + E.config.idx + i);
		if(v == 0){
			o.css("marginTop", "-"+E.config.fullHeight+"0px");// 复原回下0
			E.config.numArray[i] = 9;
			o.animate({marginTop:("-"+(E.numArray[i]*E.config.height)+"px")}, i==0 ? 10 : Math.pow(10, i+1));
			i++;
		}else{
			E.config.numArray[i] = E.config.numArray[i]-1;
			o.animate({marginTop:("-"+(E.config.numArray[i]*E.config.height)+"px")}, i==0 ? 10 : Math.pow(10, i+1));
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
	var C = E.config;
	var maxlen = C.maxlen;
	var n = C.num;
	var varr = [];
	for(var i = 0; i < maxlen; i++){varr.push(-1);}
	
	var vstr = v + "";
	var vlen = vstr.length;
	if(vlen > maxlen){
		vstr = vstr.substring(maxlen - vlen, vlen);
		vlen = vstr.length;
	}
	
	for(var i = 0; i < vlen; i++){
		var j = vlen - i;
		varr[i] = parseInt(vstr.substring(j-1, j));
	}
	var val = v - n;
	var temp_fn = function(E, v, varr){
		E.moveUp(E, v, varr);
	};
	if(val > 0){
		E.moveUp(E, v, varr);
	}
	else{
		E.moveDown(E, v, varr);
	}
};
// 加到指定数字
$jskey.Numx.prototype.moveUp = function(E, v, varr){
	var C = E.config;
	if(i >= C.maxlen){C.numArray = varr;C.num = v;return;}
	var i = 0;
	while(i < C.maxlen){
		if(varr[i] == -1){
			for(var j=i; j<C.maxlen; j++){// 加大了的数，高位肯定都是0
				varr[j] = 0;
			}
			break;
		}
		else if(varr[i] == C.numArray[i]){
		}
		else{
			var o = $("#" + C.idx + i);
			var top = parseInt(o.css("marginTop").replace('px', '').replace('-', ''));// 取正
			var tmp = varr[i];
			if(top > C.fullHeight){o.css("marginTop", "-"+(top+C.fullHeight)+"px");}// 复位上
			if(tmp < C.numArray[i]){tmp = tmp + 10;}// 滚动到上面的数字
			o.animate({marginTop:("-"+(tmp*C.height)+"px")}, 100, function(){});
		}
		i = i+1;
	}
	C.numArray = varr;
	C.num = v;
};
// 减到指定数字
$jskey.Numx.prototype.moveDown = function(E, v, varr){
	var C = E.config;
	if(i < 0){C.numArray = varr;C.num = v;return;}
	var i = E.maxlen - 1;
	while(i >= 0){
		if(varr[i] == -1){
			var o = $("#" + C.idx + i);
			o.css("marginTop", "0px");
			varr[i] = 0;
		}
		else if(varr[i] == C.numArray[i]){
		}
		else{
			var o = $("#" + C.idx + i);
			var top = parseInt(o.css("marginTop").replace('px', '').replace('-', ''));// 取正
			var tmp = varr[i];
			if(top < C.fullHeight){o.css("marginTop", "-"+(top+C.fullHeight)+"px");}// 复位下
			if(tmp > narr[i]){tmp = tmp + 10;}// 滚动到上面的数字
			o.animate({marginTop:("-"+(tmp*C.height)+"px")}, 100, function(){});
		}
		i = i-1;
	}
	C.numArray = varr;
	C.num = v;
};


$jskey.numx = function(p){
	return new $jskey.Numx(p);
};



}();