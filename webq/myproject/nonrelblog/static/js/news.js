/* function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken'); */





/* 中山區  1
中正區  1 
松山區  1
文山區  1
大安區  1
大同區  1
士林區  0
北投區  0
萬華區  0
信義區  0
南港區  0
內湖區  0 */
var setimental = [1,1,1,1,1,0,0,0,0,0,0,0];

$(document).ready(function(){
	$('button').click(function(){
		var area_search = $(this).text();
		$.ajax({
            url: '/nonrelblog/getnews',
            type: 'post', 
		    data: { area : area_search },
            success: function(response) {
			    taipeiNews  = response;
				newsPush(taipeiNews);
				/* alert(taipeiNews); */
				/* for (i = 1; i <= 5; i++) { 
                    string = '標題: '+taipeiNews[i]['title']+
					'\n時間: ' + taipeiNews[i]['time']+
				    ' \n推文數: '+taipeiNews[i]['positive'] +
					'\n連結: '+taipeiNews[i]['link']
                 } */
				 
            },  
            failure: function(data) { 
                alert('server error maybe try connect admin');
            }
	    });
		
		var imglike = new Image();
	    imglike.src = '/static/images/like.png';
	    imglike.id = 'face';
	    /* $('#imgbtn').replaceWith(imgplus); */
	    var imgdislike = new Image();
	    imgdislike.src = '/static/images/dislike.png';
	    imgdislike.id = 'face';
		
		imgFile = [imglike,imgdislike]
		
        var seti = $('button').index(this);
		if (setimental[seti]>0){
			$('#face').replaceWith(imgFile[0]);
		}else{
			$('#face').replaceWith(imgFile[1]);
		}
		
		
	  
	/* $('#imgbtn').replaceWith(imgminus); */
    
	})
});

//write html lazy function
function newsPush(taipeiNews){
	$('#news_record1 #news_populr').html(taipeiNews['apl']['1']['like']);
	$('#news_record1 #news_title a').html(taipeiNews['apl']['1']['title']);
	$('#news_record1 #news_title a').attr('href',taipeiNews['apl']['1']['link']);
	$('#news_record1 #news_time').html(taipeiNews['apl']['1']['date']);
	$('#news_record2 #news_populr').html(taipeiNews['apl']['2']['like']);
	$('#news_record2 #news_title a').html(taipeiNews['apl']['2']['title']);
	$('#news_record2 #news_title a').attr('href',taipeiNews['apl']['2']['link']);
	$('#news_record2 #news_time').html(taipeiNews['apl']['2']['date']);
	$('#news_record3 #news_populr').html(taipeiNews['apl']['3']['like']);
    $('#news_record3 #news_title a').html(taipeiNews['apl']['3']['title']);
	$('#news_record3 #news_title a').attr('href',taipeiNews['apl']['3']['link']);
	$('#news_record3 #news_time').html(taipeiNews['apl']['3']['date']);
	$('#news_record4 #news_populr').html(taipeiNews['cht']['1']['like']);
    $('#news_record4 #news_title a').html(taipeiNews['cht']['1']['title']);
	$('#news_record4 #news_title a').attr('href',taipeiNews['cht']['1']['link']);
	$('#news_record4 #news_time').html(taipeiNews['cht']['1']['date']);
	$('#news_record5 #news_populr').html(taipeiNews['cht']['2']['like']);
	$('#news_record5 #news_title a').html(taipeiNews['cht']['2']['title']);
	$('#news_record5 #news_title a').attr('href',taipeiNews['cht']['2']['link']);
	$('#news_record5 #news_time').html(taipeiNews['cht']['2']['date']);
	for (i=1;i<=5;i++){
		$('#ptt_record'+i+' #ptt_populr').html(taipeiNews['ptt'][i]['positive']);
	    $('#ptt_record'+i+' #ptt_title a').html(taipeiNews['ptt'][i]['title']);
	    $('#ptt_record'+i+' #ptt_title a').attr('href',taipeiNews['ptt'][i]['link']);
	    $('#ptt_record'+i+' #ptt_time').html(taipeiNews['ptt'][i]['time']);
		
	}
	
}
















