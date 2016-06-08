;(function($){
	var $content = $('#content'),
		$contentUl = $('#content ul'),
		$loading = $('#loading'),
		$loadMore = $('<div id="more">点击加载更多...</div>');

	var winHeight = $(window).height();

	var sina = {
		init: function(){
			var _this = this;
			this.loadData();
			$(window).on('scroll', function(){
				var $newsList = $('li', $content);
				var scrollTop = $(window).scrollTop();
				if(scrollTop+winHeight >= $newsList.last().offset().top){
					$loadMore.appendTo(document.body);
				}
			});
			$loadMore.on('tap', function(){
				_this.loadData(function(){
					$content.animate({translate3d: "0,-200px,0"}, 'ease-out', function(){
						// setTimeout(function(){
							$content[0].style.transform = '';
						// }, 1000);
					});
					$loadMore.remove();
				});
			});
		},
		loadData: function(callback){
			$loading.show();
			$.getJSON("js/index.json", function(res){
				for(var i=0; i<res.length; i++){
					var news = res[i];
					var html = '<li>'+
									'<div class="img">'+
										'<img src="images/'+news.new_img+'">'+
									'</div>'+
									'<div class="info">'+
										'<h1>'+news.new_biaoti+'</h1>'+
										'<p>'+news.new_content+'</p>'+
										'<div class="comment"><span>5672</span><img src="images/comment.png"></div>'+
									'</div>'+
								'</li>';
					$contentUl.append(html);
				}
				$loading.hide();
				callback && callback();
			});
		}
	};

	sina.init();
})(Zepto);