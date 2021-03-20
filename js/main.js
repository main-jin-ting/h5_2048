window.onload = init(4);
var timer;
var rank = 1;
var score = 0;
document.querySelector('.score').innerHTML = 0;
var music = document.getElementById("music");
music.volume = 0.1;
music.play();
var bgm = document.getElementById("bgm");
bgm.volume = 0.1;
var photo = document.getElementById("photo");
// 创建盘面
function init(m) {
	var otab = document.querySelector('.tab'),
		str = '',
		id = 1;
	for (var i = 0; i < m; i++) {
		str += '<tr>';
		for (var j = 0; j < m; j++) {
			str += '<td id="' + id++ + '"></td>';
		}
		str += '</tr>';
	}
	otab.innerHTML = str;
	for (var i = 0; i < m - 2; i++) {
		console.log(Isfill(m));
		if (Isfill(m)) {
			randomNum(m);
		}
	}
	Timer(m);
	result(m);
	Move(m);

}
//随机区间函数
function myRandom(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
//随机在格子上生成一个数字
function randomNum(m) {
	var num = myRandom(1, m * m);
	gridid = document.getElementById(num);
	if (gridid.innerHTML == '') {
		gridid.innerHTML = myRandom(1, 2) * 2;
	} else {
		randomNum(m);
	}
}

function Move(m) {
	$('#restart').click(function() {
		document.querySelector('.score').innerHTML = 0;
		init(m);
	});
	$('#modrank').click(function(){
		document.querySelector('.score').innerHTML = 0;
		init(m);
	});
	$('#modlevel').click(function(){
		document.querySelector('.score').innerHTML = 0;
		init(m);
		clearTime();
	});
	//键盘监听事件
	document.onkeydown = function(events) {
		//如果传递自己的浏览器对象：就使用events，如果没有就使用IE对象
		var eve = events || event;
		//按键触发的值
		console.log(eve.keyCode);
		//判断触发的按键
		//左键和A键
		if ((eve.keyCode == 37) || (eve.keyCode == 65)) {
			for (var i = 1; i <= (m * (m - 1) + 1); i += m) {
				for (var j = i; j <= (i + m - 1); j++) {
					for (var k = j; k > i; k--) {
						change(document.getElementById(k - 1),
							document.getElementById(k));
					}
				}
			}
			for (var i = 0; i < m - 3; i++) {
				console.log(Isfill(m));
				if (Isfill(m)) {
					randomNum(m);
					result(m);
				} else {
					if (!IsOver(m)) {
						alert("游戏结束");
						clearTime();
					}
				}
			}
			bgm.play();
		}
		//右键和D键
		if ((eve.keyCode == 39) || (eve.keyCode == 68)) {
			for (var i = 1; i <= (m * (m - 1) + 1); i += m) {
				for (var j = i + m; j >= i; j--) {
					for (var k = j; k < (i + m - 1); k++) {
						change(document.getElementById(k + 1),
							document.getElementById(k));
					}
				}
			}
			for (var i = 0; i < m - 3; i++) {
				console.log(Isfill(m));
				if (Isfill(m)) {
					randomNum(m);
					result(m);
				} else {
					if (!IsOver(m)) {
						alert("游戏结束");
						clearTime();
					}
				}
			}
			bgm.play();
		}
		//上键和W键
		if ((eve.keyCode == 38) || (eve.keyCode == 87)) {
			for (var i = 1; i <= m; i++) {
				for (var j = i; j <= (i + m * (m - 1)); j += m) {
					for (k = j; k > m; k -= m) {
						change(document.getElementById(k - m),
							document.getElementById(k));
					}
				}
			}
			for (var i = 0; i < m - 3; i++) {
				console.log(Isfill(m));
				if (Isfill(m)) {
					randomNum(m);
					result(m);
				} else {
					if (!IsOver(m)) {
						alert("游戏结束");
						clearTime();
					}
				}
			}
			bgm.play();
		}
		//下键和S键
		if ((eve.keyCode == 40) || (eve.keyCode == 83)) {
			for (var i = 1; i <= m; i++) {
				for (var j = i + m * (m - 1); j >= i; j -= m) {
					for (var k = j; k < (m * (m - 1) + 1); k += m) {
						change(document.getElementById(k + m),
							document.getElementById(k));
					}
				}
			}
			for (var i = 0; i < m - 3; i++) {
				console.log(Isfill(m));
				if (Isfill(m)) {
					randomNum(m);
					result(m);
				} else {
					if (!IsOver(m)) {
						alert("游戏结束");
						clearTime();
					}
				}
			}
			bgm.play();
		}
		if ((eve.keyCode == 13) || (eve.keyCode == 32)) {
			document.querySelector('.score').innerHTML = 0;
			init(m);
			changeImg();
		}
	}
}
//移动合并检测函数
function change(before, after) {
	//移动
	if (before.innerHTML == '' && after.innerHTML != '') {
		before.innerHTML = after.innerHTML;
		after.innerHTML = '';
	}
	//合并
	if (before.innerHTML != '' && before.innerHTML ==
		after.innerHTML) {
		before.innerHTML *= 2;
		after.innerHTML = '';
		score += before.innerHTML * 10;
		document.querySelector('.score').innerHTML = score;
	}

}
//改变颜色计算结果函数
function result(m) {
	var color = {
		'': '#fff',
		'2': '#0f0',
		'4': '#00ccff',
		'8': '#ff9900',
		'16': '#00cc66',
		'32': '#ffcccc',
		'64': '#ff33ff',
		'128': '#0066cc',
		'256': '#6633cc',
		'512': '#ff0099',
		'1024': '#990033',
		'2048': '#6600ff',
		'4096': '#cc0066'
	};
	for (var i = 1; i <= m * m; i++) {
		var gridid = document.getElementById(i);
		gridid.style.backgroundColor = color[gridid.innerHTML];
	}
}

$('#simple').click(function() {
	document.querySelector('.score').innerHTML = 0;
	init(4);
	score = 0;
	rank = 1;
});
$('#medium').click(function() {
	document.querySelector('.score').innerHTML = 0;
	init(5);
	score = 0;
	rank = 1;
});
$('#difficult').click(function() {
	document.querySelector('.score').innerHTML = 0;
	init(6);
	score = 0;
	rank = 1;
});

function Isfill(m) {
	// for(var i=1;i<=m*m;i++){console.log(document.getElementById(i));}
	for (var i = 1; i <= m * m; i++) {
		if (document.getElementById(i).innerHTML == '') {
			return true;
		} else {
			continue;
		}
	}
	return false;
}

function IsOverX(m) {
	for (var i = 1; i < m * m; i++) {
		if (i % m != 0) {
			if (document.getElementById(i).innerHTML == document.getElementById(i + 1).innerHTML) {
				return true;
			}
		}
	}
	return false;
}

function IsOverY(m) {
	for (var i = 1; i <= m * (m - 1); i++) {
		if (document.getElementById(i).innerHTML == document.getElementById(i + m).innerHTML) {
			return true;
		}
	}
	return false;
}

function IsOver(m) {
	return IsOverX(m) || IsOverY(m);
}

function Timer(m) {
	clearTime();
	timer = setInterval(function() {
		n--;
		var score = document.querySelector('.score').innerHTML;
		document.querySelector('.time').innerHTML = "时间：" + n + "s";
		document.querySelector('.rank').innerHTML = "LV:" + rank;
		//超过30秒后循环计时
		if (n == "0") {
			if (score >= 1500 * rank * (m - 3)) {
				rank++;
				changeImg();
				document.querySelector('.rank').innerHTML = rank;
				init(m);
			} else {
				alert("游戏结束");
				document.querySelector('.score').innerHTML = 0;
				rank = 1;
				init(m);
			}
		}

	}, 1000);
}

// 重置计时器
function clearTime() {
	clearInterval(timer);
	n = 31;
}

// 切换背景
function changeImg() {
	// 随机数
	var pic = Math.floor(Math.random() * 4 + 1);
	photo.src = "img/img" + pic + ".jpg";
	photo.style.animation = "gif" + pic + " 2s";
	bgm.play();
}
