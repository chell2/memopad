//// JS ////

// タブ設定 ----------------------------------------------------------
// 参考 https://hsmt-web.com/blog/tab-switching/

document.addEventListener('DOMContentLoaded', function () {
	tabs = document.querySelectorAll('#js-tab li');
	for (i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('click', tabSwitch, false);
	}

	function tabSwitch() {
		tabs = document.querySelectorAll('#js-tab li');
		var node = Array.prototype.slice.call(tabs, 0);
		node.forEach(function (element) {
			element.classList.remove('active');
		});
		this.classList.add('active');

		content = document.querySelectorAll('.tab-content');
		var node = Array.prototype.slice.call(content, 0);
		node.forEach(function (element) {
			element.classList.remove('active');
		});

		const arrayTabs = Array.prototype.slice.call(tabs);
		const index = arrayTabs.indexOf(this);

		document.querySelectorAll('.tab-content')[index].classList.add('active');
	};
});


// 個人と集団の切り替え -------------------------------------------------
// 1.ラジオボタン選択で値を取得
// 参考 https://itsakura.com/jquery-radiobutton

$('input:radio[name="kubun"]').change(function () {
	const betsu = $('input:radio[name="kubun"]:checked').val();
	console.log(betsu);
	if (betsu == "営農集団") {
		tdName.innerHTML = '<input type="text" name="name" id="name" readonly>';
		tdNameKana.innerHTML = '<input type="text" name="nameKana" id="nameKana" readonly>';
		tdEinoName.innerHTML = '<input type="text" name="einoName" id="einoName">';
		tdRepPosi.innerHTML = '<input type="text" name="repPosi" id="repPosi">';
		tdRepName.innerHTML = '<input type="text" name="repName" id="repName">';
		tdRepNameKana.innerHTML = '<input type="text" name="repNameKana" id="repNameKana">';
	} else {
		tdName.innerHTML = '<input type="text" name="name" id="name">';
		tdNameKana.innerHTML = '<input type="text" name="nameKana" id="nameKana">';
		tdEinoName.innerHTML = '<input type="text" name="einoName" id="einoName" readonly>';
		tdRepPosi.innerHTML = '<input type="text" name="repPosi" id="repPosi" readonly>';
		tdRepName.innerHTML = '<input type="text" name="repName" id="repName" readonly>';
		tdRepNameKana.innerHTML = '<input type="text" name="repNameKana" id="repNameKana" readonly>';
	};

	// 2.readonlyの見た目を変える
	// 参考 https://freelance-jak.com/technology/javascript/553/
	$(function () {
		//input属性のものを一括で取得する
		var inputItem = document.getElementsByTagName("input");
		//ループしながら全てに処理を行う
		for (var i = 0; i < inputItem.length; i++) {
			//項目がreadonlyの場合のみ処理
			if (inputItem[i].readOnly) {
				//背景色を設定する
				inputItem[i].style.backgroundColor = "#e9e9e9";
				//タブ遷移を不可にする
				inputItem[i].tabIndex = "-1";
				//テキストボックスにマウスオーバーした際に禁止マークに切り替える
				inputItem[i].style.cursor = "not-allowed";
			};
		};
	});

	// 3.ふりがな自動入力：認定農業者名/営農集団名称、代表者氏名
	$(function () {
		$.fn.autoKana('#name', '#nameKana');
		$.fn.autoKana('#repName', '#repNameKana');
	});
});


// ふりがな自動入力（上記の切り替えをしない時用） ------------------
$(function () {
	$.fn.autoKana('#name', '#nameKana');
	$.fn.autoKana('#repName', '#repNameKana');
});


// 年齢計算 ---------------------------------------------------
function getAge() {
	//入力された誕生日を取得。
	var birthday = document.getElementById('birth').value;
	//現在まで時間を取得する。
	var d1 = new Date();
	//生まれた日までの時間を取得する。
	var d2 = new Date(birthday);
	//（現在の時間）ー（生まれた日までの時間）
	var diff = d1.getTime() - d2.getTime();
	//日付を出す処理。
	var daysPast = Math.floor(diff / (1000 * 24 * 60 * 60));
	//年数を出す処理。
	var age = Math.floor(daysPast / 365);
	//処理結果を表示させる処理。
	document.getElementById('age').innerHTML = age;
}


// 実施地区の表示 ----------------------------------------------
function getChiku() {
	var juu = document.getElementById("addr").value;
	if (juu.match(/北野/)) {
		juu = "北野";
	} else if (juu.match(/城島/)) {
		juu = "城島";
	} else if (juu.match(/三潴/)) {
		juu = "三潴";
	} else if (juu.match(/田主丸/)) {
		juu = "田主丸";
	} else {
		juu = "久留米";
	};
	document.getElementById('chiku').innerHTML = juu;
};


// 事業費欄のふきだし -------------------------------------------
// 参考 https://blog.ver001.com/javascript-tooltip/
let elms = document.querySelectorAll('input.jig');
for (let i = 0; i < elms.length; i++) {
	elms[i].onfocus = function () {
		let = tooltip = this.parentNode.querySelector('.tooltip');
		tooltip.style.display = 'inline-block';
	};
	elms[i].onblur = function () {
		let = tooltip = this.parentNode.querySelector('.tooltip');
		tooltip.style.display = 'none';
	};
};


// 面積の単位換算（a）--------------------------------------------
function kansan() {
	var area = document.getElementById("area1").value;
	var unit = document.getElementById("unit1").value;
	if (unit == "hectare") {
		var men = area * 100;
		document.getElementById('kansan1').innerHTML = men.toFixed(2);
	} else if (unit == "heibei") {
		var men = area / 100;
		document.getElementById('kansan1').innerHTML = men.toFixed(2);
	} else if (unit == "tan") {
		var men = area / 0.10083;
		document.getElementById('kansan1').innerHTML = men.toFixed(2);
	} else if (unit == "se") {
		var men = area / 1.00833;
		document.getElementById('kansan1').innerHTML = men.toFixed(2);
	} else {
		document.getElementById('kansan1').innerHTML = area;
	};
};


// セーブ&クリアボタン ---------------------------------
// 参考 たろう先生PDF
// Qiita https://qiita.com/ichikawa_0829/items/85413fedc59822ccef75
// 数値の取得 参考 https://itsakura.com/js-number

// localStorageが使用出来るかチェック
// if (!window.localStorage) {
// 	alert("お使いのブラウザはlocalstorageに対応してません。");
// }

// 1.Save クリックイベント
$('#save').on('click', function () {
	const keyNo = document.getElementById("shinNo").value;
	if (keyNo < 1) {
		alert("申請No.を入力してください");
	} else {
		const obj = {
			// 申請者情報
			"nendo": $('#nendo').val(),
			"kubun": $('[name="kubun"]:checked').val(),
			"name": $('#name').val(),
			"nameKana": $('#nameKana').val(),
			"einoName": $('#einoName').val(),
			"repPosi": $('#repPosi').val(),
			"repName": $('#repName').val(),
			"repNameKana": $('#repNameKana').val(),
			"birth": $('#birth').val(),
			"denwa": $('#denwa').val(),
			"contact": $('#contact').val(),
			"zip": $('#zip').val(),
			"addr": $('#addr').val(),
			"chiku": $('#chiku').val(),
			"bikou": $('#bikou').val(),
			// ほ場情報
			"crop": $('#crop').val(),
			"hojoAd1": $('#hojoAd1').val(),
			"farmer1": $('#farmer1').val(),
			"chimoku1": $('#chimoku1').val(),
			"area1": $('#area1').val(),
			"unit1": $('#unit1').val(),
			"kansan1": $('#kansan1').val(),
			// 事業計画
			"taisaku": $('#taisaku').val(),
			"kokko": $('[name="kokko"]:checked').val(),
			"naiyou1": $('#naiyou1').val(),
			"shisetsu1": $('#shisetsu1').val(),
			"ryou1": $('#ryou1').val(),
			"ritsu1": $('#ritsu1').val(),
			"zeikomi1": $('#zeikomi1').val(),
			"zeinuki1": $('#zeinuki1').val(),
			"sekou1": $('#sekou1').val(),
			// 負担内訳
			"sougaku": $('#sougaku').val(),
			"kenpi": $('#kenpi').val(),
			"shihi": $('#shihi').val(),
			"yuushi": $('#yuushi').val(),
			"jikof": $('#jikof').val(),
			// 契約情報
			"nameG": $('#nameG').val(),
			"zipG": $('#zipG').val(),
			"addrG": $('#addrG').val(),
			"denwaG": $('#denwaG').val(),
			"contactG": $('#contactG').val(),
			"keiyakubi": $('#keiyakubi').val(),
			"chakkou": $('#chakkou').val(),
			"shunkou": $('#shunkou').val(),
		};
		// console.log(obj);
		const jsonData = JSON.stringify(obj);
		// console.log(jsonData);
		localStorage.setItem(keyNo, jsonData);
		alert('申請No.' + keyNo + 'のデータを登録しました');
	};
});


//2.clear クリックイベント
// リロードで対応。登録データの削除は一覧画面で操作。
$('#reload').on('click', function () {
	var res = confirm("リロードしますか？");
	if (res == true) {
		// リロード実行
		window.location.reload();
	} else {
		// キャンセルのアラート表示
		alert("キャンセルしました");
	};
});


//3.保存データ取得表示
$('#call').on('click', function () {
	const keyC = document.getElementById("keyCall").value;
	console.log(keyC);
	if (localStorage.getItem(keyC)) {
		var json_get = localStorage.getItem(keyC);
		// console.log(json_get);
		var obj_get = JSON.parse(json_get);
		// console.log(obj_get);
		// 申請者情報
		shinNo.value = keyC;
		$('#nendo').val(obj_get.nendo);
		$('[name="kubun"]:checked').val(obj_get.kubun);
		$('#name').val(obj_get.name);
		$('#nameKana').val(obj_get.nameKana);
		$('#einoName').val(obj_get.einoName);
		$('#repPosi').val(obj_get.repPosi);
		$('#repName').val(obj_get.repName);
		$('#repNameKana').val(obj_get.repNameKana);
		$('#birth').val(obj_get.birth);
		$('#denwa').val(obj_get.denwa);
		$('#contact').val(obj_get.contact);
		$('#zip').val(obj_get.zip);
		$('#addr').val(obj_get.addr);
		$('#chiku').val(obj_get.chiku);
		$('#bikou').val(obj_get.bikou);
		// ほ場情報
		$('#crop').val(obj_get.crop);
		$('#hojoAd1').val(obj_get.hojoAd1);
		$('#farmer1').val(obj_get.farmer1);
		$('#chimoku1').val(obj_get.chimoku1);
		$('#area1').val(obj_get.area1);
		$('#unit1').val(obj_get.unit1);
		$('#kansan1').val(obj_get.kansan1);
		// 事業計画
		$('#taisaku').val(obj_get.taisaku);
		$('[name="kokko"]:checked').val(obj_get.kokko);
		$('#naiyou1').val(obj_get.naiyou1);
		$('#shisetsu1').val(obj_get.shisetsu1);
		$('#ryou1').val(obj_get.ryou1);
		$('#ritsu1').val(obj_get.ritsu1);
		$('#zeikomi1').val(obj_get.zeikomi1);
		$('#zeinuki1').val(obj_get.zeinuki1);
		$('#sekou1').val(obj_get.sekou1);
		// 負担内訳
		$('#sougaku').val(obj_get.sougaku);
		$('#kenpi').val(obj_get.kenpi);
		$('#shihi').val(obj_get.shihi);
		$('#yuushi').val(obj_get.yuushi);
		$('#jikof').val(obj_get.jikof);
		// 契約情報
		$('#nameG').val(obj_get.nameG);
		$('#zipG').val(obj_get.zipG);
		$('#addrG').val(obj_get.addrG);
		$('#denwaG').val(obj_get.denwaG);
		$('#contactG').val(obj_get.contactG);
		$('#keiyakubi').val(obj_get.keiyakubi);
		$('#chakkou').val(obj_get.chakkou);
		$('#shunkou').val(obj_get.shunkou);
	};
});


// 一覧表示画面 ---------------------------------
// 参考 https://kurage.ready.jp/jhp_g/html5/fileR_W.html
// 参考 http://www.shurey.com/js/labo/WebStorage.html

var storage = localStorage; //変数storageに localStorageを格納

// データを削除する
function remove() {
	var comm = confirm("指定の1件を削除しますか？");
	if (comm == true) {
		// 削除実行
		var keyCle = document.getElementById("keyClear").value;
		storage.removeItem(keyCle);  // 指定key に対応するデータを削除
	} else {
		// キャンセルのアラート表示
		alert("キャンセルしました");
	};
};


//全データをクリアする
function cle() {
	var conf = confirm("全件データ削除しますか？");
	if (conf == true) {
		// 削除実行
		storage.clear();
	} else {
		// キャンセルのアラート表示
		alert("キャンセルしました");
	};
};


//全キー名とデータを表示
function allKey() {
	var n, i, s, key;
	n = localStorage.length;
	s = "<table border='2' width='98%'><tr><th>&nbsp;</th><th>キー名</th><th>データ</th></tr>";
	for (i = 0; i < n; i++) {
		key = localStorage.key(i);
		s += "<tr>";
		s += "<th>" + i + "</th>";
		s += "<td>" + key + "</td>";
		s += "<td>" + localStorage.getItem(key) + "</td>";
		s += "</tr>";
	}
	s += "</table>";
	document.getElementById("result").innerHTML = s;
};


// csvエクスポート -------------------------------
// 参考 https://macoblog.com/jquery-csv-download/

$(function () {
	$('#export').on('click', function () {
		// 配列 の用意
		var array_data = [['りんご', 1, 200], ['メロン', 2, 4000], ['バナナ', 4, 500]];

		// BOM の用意（文字化け対策）
		var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
		// CSV データの用意
		var csv_data = array_data.sort().map(function (l) { return l.join(',') }).join('\r\n');
		var blob = new Blob([bom, csv_data], { type: 'text/csv' });
		var url = (window.URL || window.webkitURL).createObjectURL(blob);
		var a = document.getElementById('downloader');
		a.download = 'data.csv';
		a.href = url;
		// ダウンロードリンクをクリックする
		$('#downloader')[0].click();
	});
});


// Topへ戻るボタン -------------------------------
// 参考 https://otamunote.com/pagetop-installation/

$(function () {
	var pagetop = $('#page-top');
	pagetop.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			pagetop.fadeIn();
		} else {
			pagetop.fadeOut();
		}
	});
	pagetop.click(function () {
		$('body, html').animate({ scrollTop: 0 }, 500);
		return false;
	});
});

