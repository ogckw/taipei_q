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

$(document).ready(function(){
	$('#t01').click(function(){
		$.ajax({
            url: '/nonrelblog/getnews',
            type: 'post', 
		    data: { area : "中山區" },
            success: function(response) {
			    taipei  = response
				alert(taipei)
				alert(taipei['1']['PK']) 
            },  
            failure: function(data) { 
                alert('server error maybe try connect admin');
            }
	    });
	});
    $('#t07').click(function(){
		$.ajax({
            url: '/nonrelblog/getnews',
            type: 'post', 
		    data: { area : "士林區" },
            success: function(response) {
			    taipei  = response
				alert(taipei)
				alert(taipei['1']['PK'])
				alert(taipei['1']['title'])
				alert(taipei['1']['push'])
            },  
            failure: function(data) { 
                alert('server error maybe try connect admin');
            }
	    });
	});	



	
});

