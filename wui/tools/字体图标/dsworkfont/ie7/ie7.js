/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'dsworkfont\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-uF0001': '&#xf0001;',
		'icon-uF0002': '&#xf0002;',
		'icon-uF0003': '&#xf0003;',
		'icon-uF0004': '&#xf0004;',
		'icon-uF0005': '&#xf0005;',
		'icon-uF0006': '&#xf0006;',
		'icon-uF0007': '&#xf0007;',
		'icon-uF0008': '&#xf0008;',
		'icon-uF0009': '&#xf0009;',
		'icon-uF0010': '&#xf0010;',
		'icon-uF0011': '&#xf0011;',
		'icon-uF0012': '&#xf0012;',
		'icon-uF0013': '&#xf0013;',
		'icon-uF0014': '&#xf0014;',
		'icon-uF0015': '&#xf0015;',
		'icon-uF0016': '&#xf0016;',
		'icon-uF0017': '&#xf0017;',
		'icon-uF0018': '&#xf0018;',
		'icon-uF0019': '&#xf0019;',
		'icon-uF0020': '&#xf0020;',
		'icon-uF0021': '&#xf0021;',
		'icon-uF0022': '&#xf0022;',
		'icon-uF0023': '&#xf0023;',
		'icon-uF0024': '&#xf0024;',
		'icon-uF0025': '&#xf0025;',
		'icon-uF0026': '&#xf0026;',
		'icon-uF0027': '&#xf0027;',
		'icon-uF0028': '&#xf0028;',
		'icon-uF0029': '&#xf0029;',
		'icon-uF0030': '&#xf0030;',
		'icon-uF0031': '&#xf0031;',
		'icon-uF0032': '&#xf0032;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
