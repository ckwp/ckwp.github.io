// Copyright(C)2014 Cafi Net All Rights Reserved.
// 利用規約 http://japanism.info/free-template.html#template
$(function(){
	// 調整用 ここから
		// スライドショーのスピードを変更
		var first_photo = 2000; // 最初の写真を何秒かけて表示するか（1000 = 1秒）
		var change_photo = 2000; // 写真を何秒かけて切り替えるか
		var slide_time = 5000; // 何秒ごとに写真の切り替えを実行するか（first_photo と change_photo より長く設定）
		var change_photo_click = 800; // 写真を何秒かけて切り替えるか（進む・戻るボタンなどクリックによる切り替え）
		// その他
		var header_hover = 400; // hover アクションのスピード
		var content_state = 1; // content の非表示・表示[1 = ON][0 = OFF]
		var min_width = 950; // ブレークポイント[950]
	// 調整用 ここまで
		
		var site_title = $('#site_title');
		var block1 = $('#block1');
		var content1 = $('#content1');
		var menu_button = $('#menu_button');
		var nav = $('#nav');
		var touch_start = ('ontouchstart' in window);
		function window_control () {
			$('#nav ul li a').unbind();
			$('a[href^=#block]').unbind();
			menu_button.unbind();
			nav.unbind();
			content1.unbind();
			var window_width = $(window).width()+15;
			var block1_width = block1.innerWidth();
			var block1_height = block1.innerHeight();
			var site_title_width = site_title.innerWidth();
			var site_title_height = site_title.innerHeight();
			var content1_width = content1.innerWidth();
			var content1_height = content1.innerHeight();
			if (window_width < min_width) {
				var title_top = (block1_height - site_title_height) / 2;
				var title_left = (block1_width - site_title_width) / 2;
				site_title.css({'top': title_top+'px', 'left': title_left+'px'});
				if(nav.css('margin-left') == '0px') {
					nav.css('margin-left', '-200px');
					menu_button.animate({'left': '0px'}, 'fast', 'linear');
				}
				menu_button.click(function(){
					if(nav.css('margin-left') == '-200px') {
						nav.animate({'margin-left': '0px'}, 'fast', 'linear');
						menu_button.animate({'left': '200px'}, 'fast', 'linear');
					} else {
						nav.animate({'margin-left': '-200px'}, 'fast', 'linear');
						menu_button.animate({'left': '0px'}, 'fast', 'linear');
					}
				});
				$('#nav ul li a').click(function(){	
					if(window_width < min_width && nav.css('margin-left') == '0px') {
						nav.animate({'margin-left': '-200px'}, 'fast', 'linear');
						menu_button.animate({'left': '0px'}, 'fast', 'linear');
					}			
				});
			} else {
				if(nav.css('margin-left') == '-200px') {
					nav.css('margin-left', '0px');
				}
			}
			if (touch_start == false) {
				if ($(window).height() < $(document).height() && content_state ==1) {
					var block_count = $("[id^='block']").length;
					for (var i = 3; i <= block_count-1; i++) {
						$('#content'+i).css('opacity', 0);
					}
				}
				$(window).scroll(function(){
					var scroll_value2 = $(window).scrollTop();
					if (content_state == 1) {
						for (var i = 3; i <= block_count-1; i++) {
							var block_top = $('#block'+(i-1)).offset().top;
							if (scroll_value2 >= block_top) {
								$('#content'+i).animate({'opacity': 1}, 700, 'swing');
							}
						}
						if ($(window).height() + scroll_value2 >= $(document).height() - 100) {
							for (var i = 3; i <= block_count-1; i++) {
								$('#content'+i).animate({'opacity': 1}, 700, 'swing');
							}
						}
					}
				});
			}
		}
		var last = $('#stage ul li').length;
		var number = 1;	
		var slide_set;
		var state;
		var cafinet;
		var stage = $('#stage');
		var stage_first = $('#stage ul li:first-child');
		var slide_control = $('#slide_control');
		var play_stop = $('#play_stop');
		$(window).load(function(){
			window_control();
			var stage_height = stage_first.find('img').height();
			stage.css('height', stage_height);
			var stage_width = stage_first.width();
			var slide_control_width = slide_control.innerWidth();
			slide_control.css({'top': stage_height - 30 + 'px', 'left': (stage_width - slide_control_width) / 2 +'px'});	
		});
		$(window).resize(function(){
			window_control();
			var stage_height = stage_first.find('img').height();
			stage.css('height', stage_height);
			var stage_width = stage_first.width();
			var slide_control_width = slide_control.innerWidth();
			slide_control.css({'top': stage_height - 30 + 'px', 'left': (stage_width - slide_control_width) / 2 +'px'});	
		});
		stage_first.animate({opacity:1}, first_photo);
		for (var i = 1; i <= last; i++) {
			if (i == 1) {
				$('#slide_control #number_last').append('<span id="photo_'+i+'"><img src="resources/slideshow/active.png"/></span>');
			} else {
				$('#slide_control #number_last').append('<span id="photo_'+i+'"><img src="resources/slideshow/active.png"/></span>');
				$('#photo_'+i).css('opacity', 0.5);
			}
			$('#photo_'+i).css('width', '20px');
		}
		function slide_start (){
			slide_set = setInterval(function(){
				if (number == last) {
					$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo);
					stage_first.animate({opacity:1}, change_photo);
					number = 1;
					$("#photo_1").animate({opacity:1}, change_photo);
					for (var i = 1; i <= last; i++) {
						if (i != number) {
							$("#photo_"+i).animate({opacity:0.5}, change_photo);
						}
					}
				} else {
					$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo).next('li').animate({opacity:1}, change_photo);
					number++;
					$("#photo_"+number).animate({opacity:1}, change_photo);
					for (var i = 1; i <= last; i++) {
						if (i != number) {
							$("#photo_"+i).animate({opacity:0.5}, change_photo);
						}
					}
				}
			},slide_time);
			state = 1;
			play_stop.html('<img src="resources/slideshow/stop.png" alt="停止"/>');
		}
		function slide_stop (){
			clearInterval(slide_set);
			state = 0;
			play_stop.html('<img src="resources/slideshow/play.png" alt="再生"/>');
		}
		slide_start();
		$("[id^='photo_']").on('click', function(){ 
			var photo_id = $(this).attr('id');
			var id_slice = photo_id.slice(6);
			slide_stop();
			$('#stage ul li:not(:nth-child(' + id_slice + '))').animate({opacity:0}, change_photo_click); 
			$('#stage ul li:nth-child(' + id_slice + ')').animate({opacity:1}, change_photo_click);
			number = id_slice;
			$("#photo_"+number).animate({opacity:1}, change_photo_click);
			for (var i = 1; i <= last; i++) {
				if (i != number) {
					$("#photo_"+i).animate({opacity:0.5}, change_photo_click);
				}
			}
		});	
		$('#prev_button').click(function(){
			slide_stop();
			if (number == 1) {
				$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo_click);
				$('#stage ul li:nth-child(' + last + ')').animate({opacity:1}, change_photo_click);
				number = last;
			} else {
				$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo_click).prev('li').animate({opacity:1}, change_photo_click);
				number--;
			}
			$("#photo_"+number).animate({opacity:1}, change_photo_click);
			for (var i = 1; i <= last; i++) {
				if (i != number) {
					$("#photo_"+i).animate({opacity:0.5}, change_photo_click);
				}
			}
		});
		$('#next_button').click(function(){
			slide_stop();
			if (number == last) {
				$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo_click);
				stage_first.animate({opacity:1}, change_photo_click);
				number = 1;
			} else {
				$('#stage ul li:nth-child(' + number + ')').animate({opacity:0}, change_photo_click).next('li').animate({opacity:1}, change_photo_click);
				number++;
			}
			$("#photo_"+number).animate({opacity:1}, change_photo_click);
			for (var i = 1; i <= last; i++) {
				if (i != number) {
					$("#photo_"+i).animate({opacity:0.5}, change_photo_click);
				}
			}
		});
		play_stop.on('click', function(){ 
			if(state == 1){
				slide_stop();
			} else if(state == 0){
				slide_start();
			}
		});		
		if (touch_start == false) {
			$('#site_title, header ul li').hover(function(){
				$(this).animate({opacity:0.5}, header_hover);
			},
			function(){
				$(this).animate({opacity:1}, header_hover);
			});
		}
	});