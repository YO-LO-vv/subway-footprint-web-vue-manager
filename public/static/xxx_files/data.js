var imgSrc =
	"data:image/png;base64,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"
// imgSrc = String.raw`E:\subway-footprint-web-vue\public\static\xxx_files\location.png`
locationSrc = "http://123.56.150.89:8866/SubwayFootPrint/location-nxcv5qa425lxhnw9o0u2-thumbnail-0.8.png"
var SubwayCitiesList = [{
		name: "北京市",
		keyword: "beijing",
		citycode: 131,
		cpre: "bj"
	},
	{
		name: "上海市",
		keyword: "shanghai",
		citycode: 289,
		cpre: "shh",
	},
	{
		name: "广州市",
		keyword: "guangzhou",
		citycode: 257,
		cpre: "gzh"
	},
	{
		name: "深圳市",
		keyword: "shenzhen",
		citycode: 340,
		cpre: "szh"
	},
	{
		name: "重庆市",
		keyword: "chongqing",
		citycode: 132,
		cpre: "chq"
	},
	{
		name: "天津市",
		keyword: "tianjin",
		citycode: 332,
		cpre: "tj"
	},
	{
		name: "石家庄市",
		keyword: "shijiazhuang",
		citycode: 150,
		cpre: "shjzh"
	},
	{
		name: "南京市",
		keyword: "nanjing",
		citycode: 315,
		cpre: "nj"
	},
	{
		name: "成都市",
		keyword: "chengdu",
		citycode: 75,
		cpre: "chd"
	},
	{
		name: "沈阳市",
		keyword: "shenyang",
		citycode: 58,
		cpre: "shy"
	},
	{
		name: "杭州市",
		keyword: "hangzhou",
		citycode: 179,
		cpre: "hzh"
	},
	{
		name: "武汉市",
		keyword: "wuhan",
		citycode: 218,
		cpre: "wh"
	},
	{
		name: "长沙市",
		keyword: "changsha",
		citycode: 158,
		cpre: "cs"
	},
	{
		name: "苏州市",
		keyword: "suzhou",
		citycode: 224,
		cpre: "suz"
	},
	{
		name: "大连市",
		keyword: "dalian",
		citycode: 167,
		cpre: "dl"
	},
	{
		name: "长春市",
		keyword: "changchun",
		citycode: 53,
		cpre: "chc"
	},
	{
		name: "西安市",
		keyword: "xian",
		citycode: 233,
		cpre: "xian"
	},
	{
		name: "昆明市",
		keyword: "kunming",
		citycode: 104,
		cpre: "km"
	},
	{
		name: "佛山市",
		keyword: "foshan",
		citycode: 138,
		cpre: "fsh"
	},
	{
		name: "哈尔滨市",
		keyword: "haerbin",
		citycode: 48,
		cpre: "hrb"
	},
	{
		name: "郑州市",
		keyword: "zhengzhou",
		citycode: 268,
		cpre: "zhzh"
	},
	{
		name: "宁波市",
		keyword: "ningbo",
		citycode: 180,
		cpre: "nbo"
	},
	{
		name: "无锡市",
		keyword: "wuxi",
		citycode: 317,
		cpre: "wuxi"
	},
	{
		name: "温州市",
		keyword: "wenzhou",
		citycode: 178,
		cpre: "wenzhou"
	},
	{
		name: "常州市",
		keyword: "changzhou",
		citycode: 348,
		cpre: "changzhou"
	},
	{
		name: "青岛市",
		keyword: "qingdao",
		citycode: 236,
		cpre: "qd"
	},
	{
		name: "济南市",
		keyword: "jinan",
		citycode: 288,
		cpre: "jn"
	},
	{
		name: "南昌市",
		keyword: "nanchang",
		citycode: 163,
		cpre: "nanchang"
	},
	{
		name: "福州市",
		keyword: "fuzhou",
		citycode: 300,
		cpre: "fuzhou"
	},
	{
		name: "东莞市",
		keyword: "dongguan",
		citycode: 119,
		cpre: "dongguan"
	},
	{
		name: "南宁市",
		keyword: "nanning",
		citycode: 261,
		cpre: "nanning"
	},
	{
		name: "合肥市",
		keyword: "hefei",
		citycode: 127,
		cpre: "hefei"
	},
	{
		name: "厦门市",
		keyword: "xiamen",
		citycode: 194,
		cpre: "xiamen"
	},
	{
		name: "乌鲁木齐市",
		keyword: "wulumuqi",
		citycode: 92,
		cpre: "wulumuqi"
	},
	{
		name: "贵阳市",
		keyword: "guiyang",
		citycode: 146,
		cpre: "guiyang"
	},
	{
		name: "兰州市",
		keyword: "lanzhou",
		citycode: 36,
		cpre: "lanzhou"
	},
	{
		name: "徐州市",
		keyword: "xuzhou",
		citycode: 316,
		cpre: "xuzhou"
	},
	{
		name: "呼和浩特市",
		keyword: "huhehaote",
		citycode: 321,
		cpre: "huhehaote"
	},
	{
		name: "太原市",
		keyword: "taiyuan",
		citycode: 176,
		cpre: "taiyuan"
	},
	{
		name: "洛阳市",
		keyword: "luoyang",
		citycode: 153,
		cpre: "luoyang"
	},
	{
		name: "绍兴市",
		keyword: "shaoxing",
		citycode: 293,
		cpre: "shaoxing"
	},
	{
		name: "芜湖市",
		keyword: "wuhu",
		citycode: 129,
		cpre: "wuhu"
	},
	{
		name: "香港特别行政区",
		keyword: "hongkong",
		citycode: 2912,
		cpre: "hk"
	},
	{
		name: "澳门特别行政区",
		keyword: "aomen",
		citycode: 2911,
		cpre: "mc"
	},
	{
		name: "台北市",
		keyword: "taibei",
		citycode: 9002,
		cpre: "shh",
		"cxfDis": 0
	},
	{
		name: "高雄市",
		keyword: "gaoxiong",
		citycode: 9019,
		cpre: "cs"
	},
	{
		name: "新加坡",
		keyword: "xinjiapo",
		citycode: 20001,
		cpre: "xinjiapo"
	},
	{
		name: "曼谷",
		keyword: "mangu",
		citycode: 20508,
		cpre: "mangu"
	},
	{
		name: "名古屋",
		keyword: "mingguwu",
		citycode: 26001,
		cpre: "mingguwu"
	},
	{
		name: "横滨",
		keyword: "hengbin",
		citycode: 26019,
		cpre: "hengbin"
	},
	{
		name: "京都",
		keyword: "jingdu",
		citycode: 26022,
		cpre: "jingdu"
	},
	{
		name: "大阪",
		keyword: "daban",
		citycode: 26033,
		cpre: "daban"
	},
	{
		name: "东京",
		keyword: "dongjing",
		citycode: 26041,
		cpre: "dongjing"
	},
	{
		name: "釜山",
		keyword: "fushan",
		citycode: 30001,
		cpre: "fushan"
	},
	{
		name: "大邱",
		keyword: "daqiu",
		citycode: 30004,
		cpre: "daqiu"
	},
	{
		name: "大田",
		keyword: "datian",
		citycode: 30005,
		cpre: "datian"
	},
	{
		name: "光州",
		keyword: "guangzhou_hanguo",
		citycode: 30007,
		cpre: "guangzhou_hanguo"
	},
	{
		name: "首尔",
		keyword: "shouer",
		citycode: 30016,
		cpre: "shouer"
	},
	{
		name: "巴黎",
		keyword: "bali",
		citycode: 49872,
		cpre: "bali"
	},
	{
		name: "里约热内卢",
		keyword: "liyuereneilu",
		citycode: 39816,
		cpre: "liyuereneilu"
	},
	{
		name: "巴西利亚",
		keyword: "baxiliya",
		citycode: 53009,
		cpre: "baxiliya"
	},
	{
		name: "圣保罗",
		keyword: "shengbaoluo",
		citycode: 39817,
		cpre: "shengbaoluo"
	},
	{
		name: "纽约",
		keyword: "niuyue",
		citycode: 60732,
		cpre: "niuyue"
	},
	{
		name: "莫斯科",
		keyword: "mosike",
		citycode: 65531,
		cpre: "mosike"
	},
	{
		name: "斯德哥尔摩",
		keyword: "sidegeermo",
		citycode: 51758,
		cpre: "sidegeermo"
	},
	{
		name: "罗马",
		keyword: "luoma",
		citycode: 50059,
		cpre: "luoma"
	},
	{
		name: "鹿特丹",
		keyword: "lutedan",
		citycode: 52390,
		cpre: "lutedan"
	},
	{
		name: "伦敦",
		keyword: "lundun",
		citycode: 51442,
		cpre: "lundun"
	},
	{
		name: "布鲁塞尔",
		keyword: "bulusaier",
		citycode: 50303,
		cpre: "bulusaier"
	},
	{
		name: "奥斯陆",
		keyword: "aosilu",
		citycode: 52166,
		cpre: "aosilu"
	},
	{
		name: "赫尔辛基",
		keyword: "heerxinji",
		citycode: 51373,
		cpre: "heerxinji"
	},
	{
		name: "布拉格",
		keyword: "bulage",
		citycode: 46663,
		cpre: "bulage"
	},
	{
		name: "布达佩斯",
		keyword: "budapeisi",
		citycode: 47021,
		cpre: "budapeisi"
	},
	{
		name: "华沙",
		keyword: "huasha",
		citycode: 47370,
		cpre: "huasha"
	},
	{
		name: "索菲亚",
		keyword: "suofeiya",
		citycode: 48184,
		cpre: "suofeiya"
	},
	{
		name: "布加勒斯特",
		keyword: "bujialesite",
		citycode: 48268,
		cpre: "bujialesite"
	},
	{
		name: "伊斯坦布尔",
		keyword: "yisitanbuer",
		citycode: 48552,
		cpre: "yisitanbuer"
	},
	{
		name: "安卡拉",
		keyword: "ankala",
		citycode: 48581,
		cpre: "ankala"
	},
	{
		name: "维也纳",
		keyword: "weiyena",
		citycode: 50242,
		cpre: "weiyena"
	},
	{
		name: "蒙特利尔",
		keyword: "mengtelier",
		citycode: 58134,
		cpre: "mengtelier"
	},
	{
		name: "慕尼黑",
		keyword: "munihei",
		citycode: 50889,
		cpre: "munihei"
	},
	{
		name: "哥本哈根",
		keyword: "gebenhagen",
		citycode: 51833,
		cpre: "gebenhagen"
	},
	{
		name: "汉堡",
		keyword: "hanbao",
		citycode: 50680,
		cpre: "hanbao"
	},
	{
		name: "汉诺威",
		keyword: "hannuowei",
		citycode: 50694,
		cpre: "hannuowei"
	},
	{
		name: "里斯本",
		keyword: "lisiben",
		citycode: 51944,
		cpre: "lisiben"
	},
	{
		name: "巴伦西亚",
		keyword: "balunxiya",
		citycode: 51305,
		cpre: "balunxiya"
	},
	{
		name: "明斯克",
		keyword: "mingsike",
		citycode: 84562,
		cpre: "mingsike"
	},
	{
		name: "巴塞罗那",
		keyword: "basailuona",
		citycode: 51271,
		cpre: "basailuona"
	},
	{
		name: "柏林",
		keyword: "bolin",
		citycode: 50990,
		cpre: "bolin"
	},
	{
		name: "法兰克福",
		keyword: "falankefu",
		citycode: 50783,
		cpre: "falankefu"
	},
	{
		name: "基辅",
		keyword: "jifu",
		citycode: 49201,
		cpre: "jifu"
	},
	{
		name: "马德里",
		keyword: "madeli",
		citycode: 51314,
		cpre: "madeli"
	},
	{
		name: "雅典",
		keyword: "yadian",
		citycode: 46874,
		cpre: "yadian"
	}
];




for (var i = 0; i < SubwayCitiesList.length; i++) {
	var {
		citycode,
		name
	} = SubwayCitiesList[i]
	$(`<option value="${citycode}">${name}</option>`).appendTo("select")
}
$("select").on("change", function() {
	window.location.href = window.location.href.split("?")[0] + "?cityCode=" + $(this).val()
})
var cityCode = $.getUrlQuery("cityCode") || 131
$("select").val(cityCode)
$("head title").html($("select :selected").text() + "地铁线路图")
var checkUrl = "https://thelittlestar.cn:8088/Subway/getAllSubways?code=" + cityCode

//发送请求
$.ajax({
	type: 'get',
	url: checkUrl,
	async: false, //同步/异步
	contentType: "application/x-www-form-urlencoded; charset=gbk",
	dataType: 'json', //返回 JSON 数据
	beforeSend: function() { //调用前触发，如加载效果等
	},
	success: function(data, status) {
		var l = data.l
		// console.log(l)
		//地铁线路
		//ex 换乘标志
		//rc 圆润拐弯
		//st 有效站点
		//iu 有效点?????
		for (var i = 0; i < l.length; i++) {
			// console.log(i)
			var {
				l_xmlattr,
				p
			} = l[i]
			var {
				lb,
				loop,
				uid
			} = l_xmlattr
			// if (!uid) { //暂未开通
			//     break;
			// }
			var dStr = ""; //地铁线路点
			var isLb = false; //是否圆润拐点
			for (var j = 0; j < p.length; j++) {
				var {
					x,
					y,
					lb,
					st,
					ex,
					rc
				} = p[j].p_xmlattr
				if (isLb) {
					isLb = false
					dStr += x + " " + y + " "
				} else {
					if (rc) {
						isLb = true
						dStr += "Q" + x + " " + y + " "
					} else {
						if (j == 0) {
							dStr += "M" + x + " " + y + " "
						} else {
							dStr += "L" + x + " " + y + " "
						}
						if (j == p.length - 1) {
							if (loop) {
								dStr += "Z"
							}
						}
					}
				}
			}

			var {
				lb,
				lc,
				lbx,
				lby
			} = l_xmlattr[0]
			// console.log("lc-------------" + lc)
			var path = $.svg('path').appendTo('#g-box')
			if (lc) {
				var lc_ = lc.split("x")[1]
			}
			path.attr({
				d: $.trim(dStr),
				lb: lb
			}).css("stroke", "#" + lc_);
			var text = $.svg('text').appendTo('#g-box').html(lb).addSvgClass("subway-name")
			if (lc) {
				var lc_ = lc.split("x")[1]
			}
			text.attr({
				x: lbx - 10,
				y: lby + 15,
			}).css("fill", "#" + lc_);
		}

		var repeatStr = "" //uid字符串判断重复点
		for (var i = 0; i < l.length; i++) {
			var {
				l_xmlattr,
				p
			} = l[i]
			// if (!l_xmlattr.uid) { //暂未开通
			//     break;
			// }
			for (var j = 0; j < p.length; j++) {
				var {
					x,
					y,
					rx,
					ry,
					lb,
					ex,
					rc,
					st,
					uid
				} = p[j].p_xmlattr
				if (st) {
					if (ex) {
						if (!repeatStr.includes(uid)) {
							var image = $.svg('image').appendTo('#g-box')
							image.attr({
								width: "20",
								height: "20",
								x: x - 10,
								y: y - 10
							});

							image[0].href.baseVal = imgSrc;
						}
					} else {
						var circle = $.svg('circle').appendTo('#g-box')
						if (lc) {
							var lc_ = l_xmlattr[0].lc.split("x")[1]
						}
						circle.attr({
							cx: x,
							cy: y,
							r: 4
						}).css("stroke", "#" + lc_);

					}
					if (!repeatStr.includes(uid)) {
						var text = $.svg('text').appendTo('#g-box').html(lb).addSvgClass("station-name")
						text.attr({
							x: x + rx + 2,
							y: y + ry + 12,
						});
						repeatStr += uid
					}
				}
			}
		}

		var eventsHandler = {
			haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
			init: function(options) {
				var instance = options.instance,
					initialScale = 1,
					pannedX = 0,
					pannedY = 0
				this.hammer = Hammer(options.svgElement, {
					inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput :
						Hammer.TouchInput
				})
				this.hammer.get('pinch').set({
					enable: true
				})
				this.hammer.on('doubletap', function(ev) {
					instance.zoomIn()
				})
				this.hammer.on('panstart panmove', function(ev) {
					if (ev.type === 'panstart') {
						pannedX = 0
						pannedY = 0
					}
					instance.panBy({
						x: ev.deltaX - pannedX,
						y: ev.deltaY - pannedY
					})
					pannedX = ev.deltaX
					pannedY = ev.deltaY
				})
				this.hammer.on('pinchstart pinchmove', function(ev) {
					if (ev.type === 'pinchstart') {
						initialScale = instance.getZoom()
						instance.zoomAtPoint(initialScale * ev.scale, {
							x: ev.center.x,
							y: ev.center.y
						})
					}
					instance.zoomAtPoint(initialScale * ev.scale, {
						x: ev.center.x,
						y: ev.center.y
					})
				})
				options.svgElement.addEventListener('touchmove', function(e) {
					e.preventDefault();
				});
			},
			destroy: function() {
				this.hammer.destroy()
			}
		}
		window.panZoom = svgPanZoom('#mobile-svg', {
			zoomEnabled: true,
			controlIconsEnabled: false,
			fit: 1,
			center: 1,
			customEventsHandler: eventsHandler
		});
	},
	complete: function() { //调用后触发（不管成功或失败）
		//向父页面发送信息


		//image添加点击
		var imageSet = $("image");
		for (var i = 0; i < imageSet.length; i++) {
			var a = imageSet[i];
			var b = imageSet[i].nextSibling;
			var c = b.textContent;
			(function(i, c, a) { //这个是function里i，即function的形参，也可以换成j，换成什么变量名都无所谓
				imageSet[i].addEventListener('click',
					function() {
						console.log(c)
						console.log(a)
						var x_ = a.getAttribute("x");
						var y_ = a.getAttribute("y");
						console.log(x_)
						console.log(y_)
						//添加箭头
						$('.ltdz').remove()
						// var currentLocation= $('.ltdz')
						// console.log(currentLocation)
						var image = $.svg('image').appendTo('#g-box')
						y_ = parseFloat(y_)
						y_ -= 5.0
						console.log("-------------------")
						console.log(y_)
						image.attr({
							width: "20",
							height: "20",
							x: x_,
							y: y_,
							class: "ltdz",
							href: locationSrc
						});

						// image[0].href.baseVal = locationSrc;
						//发送数据

						let data = {
							type: 1,
							code: 200,
							data: $("select").val()+'_'+c
						}
						window.parent.postMessage(data, '*');

					},

				);
			})(i, c, a);
		}
		//circle添加点击
		var imageSet = $("circle");
		for (var i = 0; i < imageSet.length; i++) {
			var a = imageSet[i];
			var b = imageSet[i].nextSibling;
			var c = b.textContent;
			(function(i, c, a) { //这个是function里i，即function的形参，也可以换成j，换成什么变量名都无所谓
				imageSet[i].addEventListener('click',
					function() {
						console.log(c);
						//var old_attr = imageSet[i].getAttribute("style");
						//console.log(old_attr);
						//改变颜色
						// if (old_attr.search("fill")) {
						// 	console.log(old_attr.search("fill"))
						// }
						// imageSet[i].setAttribute("style", old_attr + "fill: skyblue")
						var x_ = a.getAttribute("cx");
						var y_ = a.getAttribute("cy");
						console.log(x_)
						console.log(y_)
						//添加箭头
						$('.ltdz').remove()
						// var currentLocation= $('.ltdz')
						// console.log(currentLocation)
						x_ = parseFloat(x_)
						y_ = parseFloat(y_)
						var image = $.svg('image').appendTo('#g-box')
						image.attr({
							width: "20",
							height: "20",
							x: x_ - 10.0,
							y: y_ - 13.0,
							class: "ltdz",
							href: locationSrc
						});
						//发送数据
						let data = {
							type: 1,
							code: 200,
							data: $("select").val()+'_'+c
						}
						window.parent.postMessage(data, '*');
					},
				);
			})(i, c, a);

		}


	},
	error: function(data, status, e) {
		alert('接口调用错误！');
	}
});
