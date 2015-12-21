count = true;
moudel1 = false;
$(document).ready(function(){
/* selectors */
	/* selector 滑進滑出 */
	$('#trigger_bar').click(function(){
		if(count){
			$('#selectors').stop().animate(
				{left:'-45px'},
				1500,
				'easeOutBounce'
			);
			count = false;
		}else{
			$('#selectors').stop().animate(
				{left:'-580px'},
				1500,
				'easeOutBounce'
			);
			count = true;
		}	
	});
	
	/* selector 說明 */
	$('.factor').mouseover(function(e){
		var hover_txt = $(this).attr('hover_txt');
		$('#hoverDiv').text(hover_txt).show();
		$('#hoverDiv').css('left', e.clientX + 40)
					  .css('top', e.clientY - 110);
	}).mouseout(function(){
		$('#hoverDiv').hide();
	});
	
	
	
	/* 《 & 》轉換 */
	$('#trigger_bar').click(function(){
		if($('#direct').attr('class') == 'fa fa-angle-double-right fa-2x'){
			$('#direct').removeClass();
			$('#direct').addClass('fa fa-angle-double-left fa-2x');
		}else{
			$('#direct').removeClass();
			$('#direct').addClass('fa fa-angle-double-right fa-2x');
		}
		
	});
	
/* searchBar */
	$('#keying:text').focus(function(){
		$(this).css({
			'background-color':'#9dceff',
			'font':'bold 20px Tahoma'
		});
	});
	$(':text').blur(function(){
		$(this).css('background-color','#ddd');
	});
	
/* Order Bar */
	$('#sortable').sortable();
	$('#sortable').disableSelection();
	
/* dashboardSlide */
	/* dashboard 移出移入 */
	$('#labelin').click(function(){
		if(moudel1){
			$('#label').stop().animate(
				{right:'0px'},
				1500,
				'easeOutBounce'
			);
			moudel1 = false;
		}else{
			$('#label').stop().animate(
				{right:'-165px'},
				1500,
				'easeOutBounce'
			);
			moudel1 = true;
		}	
	});
	
	/* 勾選動作 */
	$('input[type=checkbox]').click(function() {  
            $("input").attr('disabled', false);  
            if ($("input:checked").length >= 3) {  
                $("input:checked").attr('disabled', false);
				if($("input").not(':checked')){
					$("input").not(':checked').attr('disabled',true);
				}	
            } else {  
                
            }  
    });
	
	/* + & - 轉換  法一*/
	var imgplus = new Image();
	imgplus.src = '/static/images/plus.png';
	imgplus.id = 'imgbtn';
	/* $('#imgbtn').replaceWith(imgplus); */

	var imgminus = new Image();
	imgminus.src = '/static/images/minus.png';
	imgminus.id = 'imgbtn';
	/* $('#imgbtn').replaceWith(imgminus); */
    
	var imgList = [imgplus,imgminus]
	$('#labelin').click(function(){
		if($('#imgbtn').attr('src') == '/static/images/minus.png'){
			$('#imgbtn').replaceWith(imgList[0]);
		}else{
			$('#imgbtn').replaceWith(imgList[1]);
		}
	});
	
	/* + & - 轉換 法二*/
	/* var plus = 'images/plus.png'
	var img = ['images/plus.png', 'images/minus.png']
	$('#labelin').click(function(){
		if($('#imgbtn').attr('class') == "minus"){
			$('#imgbtn').attr('src',img[0]);
			$('#imgbtn').removeClass();
			$('#imgbtn').addClass('plus');
		}else{
			$('#imgbtn').attr('src',img[1]);
			$('#imgbtn').removeClass();
			$('#imgbtn').addClass('minus');
		}
		
	}); */
});



