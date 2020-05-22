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
$jskey.numx({num:0,maxlen:0,height:200,times:1000,
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
var tennum = "";
for(var i = 0; i <= 9; i++){
	tennum += '<div class="num">'+ i +'</div>';
}
var allnum = tennum + tennum + tennum + tennum + tennum + tennum + tennum + tennum + tennum + tennum + tennum;
// allnum = allnum + allnum + allnum + allnum + allnum;
$jskey.Numx = function(p){
	this.config = p || {};
	this.k = count++;
	this.numArray = [];
	this.num = 0;
	this.maxlen = 16;
	this.kid = "";
	this.numArray = [];
	this.o = null;
	this.times = 1000;
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
	
	C.times = C.times||1000;
	if(C.times <= 0){C.times = 1000;}
	E.times = C.times;
	
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
	
	var maxi = E.maxlen - 1;
	var D = E.config.dom;
	var H = '';
	for(var i = maxi; i >= 0; i--){
		var x = '<div id="' + E.kid + i +'" class="numx" style="margin-top:-'+(arr[i]*E.height)+'px">'+allnum+'</div>';
		H += '<'+D.item.tag+' class="'+D.item.style.className+'" style="line-height:'+E.height+'px;height:'+E.height+'px;">' + x + '</'+D.item.tag+'>';
	}
	H = '<'+D.tag+' onselectstart="return false;" class="'+D.style.className+'">' + H + '</'+D.tag+'>';
	this.o.html(H);
	var nowbox = document.getElementById(E.kid + maxi);
	nowbox.box = null;
	for(var i = maxi - 1; i >= 0; i--){
		var box = document.getElementById(E.kid + i);
		nowbox.box = box;
		nowbox = box;
	}
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
	for(var i = 0; i < E.maxlen; i++){varr.push(0);}
	for(var i = 0; i < vlen; i++){var j = vlen - i;
		varr[i] = parseInt(vstr.substring(j-1, j));
	}
	var val = v - E.num;
	if(val == 0){return;}
	
	var maxIndex = E.maxlen - 1;
	for(var i = maxIndex; i > -1; i--){
		if(E.numArray[i] == varr[i]){continue;}
		maxIndex = i;break;
	}

	var maxtimes = E.times * maxIndex;

	var oList = [];
	for(var i = 0; i <= maxIndex; i++){
		oList[i] = document.getElementById(E.kid + i);
		var o = $(oList[i]);
		oList[i].jo = o;
	}
	var maxheight = 100 * E.height;
	var fixh = 0;
	if(val < 0){
		fixh = maxheight;
	}

	var j = 0;
	while(j <= maxIndex){// 复位加上/减下
		var top = E.numArray[j]*E.height+fixh;
		oList[j].jo.css("marginTop", "-"+top+"px");
		oList[j].fixtop = top;
		var myv = parseInt(Math.abs(val)/Math.pow(10, j));
		if(myv > 100){
			myv = myv%10;
			myv = myv == 0 ? 100 : (myv + 90);
		}
		var h = 0;
		if(val > 0){
			h = oList[j].fixtop + (myv*E.height);
		}
		else{
			h = oList[j].fixtop - (myv*E.height);
		}
		oList[j].fixh = h;
		oList[j].times = E.times;
		oList[j].fn = function(){
			if(this.box){
				this.box.jo.stop(true, false).animate({marginTop:("-"+this.box.fixh+"px")}, this.box.times, function(){
					this.fn();
				});
			}
		};
		j++;
	}


	j = 0;
	while(j < maxIndex - 1){
		oList[j].jo.animate({marginTop:("-"+oList[j].fixh+"px")}, maxtimes);
		j++;
	}

	j = maxIndex - 1;
	if(j > -1){
		oList[j].jo.animate({marginTop:("-"+oList[j].fixh+"px")}, E.times*1.5, function(){
			this.fn();
		});
	}
	j = maxIndex;
	oList[j].jo.animate({marginTop:("-"+oList[j].fixh+"px")}, E.times);
	
	E.numArray = varr;
	E.num = v;
};



$jskey.numx = function(p){
	return new $jskey.Numx(p);
};



}();