$(document).ready(function(){
/* SurviceBar */
	$('.icons_bar').css('opacity',0.2);
	$('.icons_bar').mouseover(function(){
		$(this).fadeTo(5,1);
		$('.icons_bar').not(this).fadeTo(5,0.2);
	});
	$('.icons_bar').mouseout(function(){
		$('.icons_bar').css('opacity',0.2);
	});
	
/* ButtonBar */
	$('.btn').css('opacity',0.6);
	$('.btn').mouseover(function(){
		$(this).fadeTo(1,1);
		$('.btn').not(this).fadeTo(1,0.6)
	});
	$('.btn').mouseout(function(){
		$(this).css('opacity',0.6);
	});
	
/* TeamBar */
	$('#team_bar').hover(function(){
		$(this).stop().animate(
			{left:'0px'},
			1000,
			'easeInSine'
		),
	function(){
		$(this).stop().animate(
			{left:'-99px'},
			1500,
			'easeOutBounce'
		);
	}
	});
});