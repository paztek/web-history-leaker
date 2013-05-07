$(document).ready(function() {
	
	$('a').on('click', function(event) {
		event.preventDefault();
	});
	
	$('a').hover(function() {
		$(this).data('href', $(this).attr('href'));
		$(this).attr('href', '#');
	}, function() {
		$(this).attr('href', $(this).data('href'));
	});
	
	var timeDiv = $('#time');
	
	var time= 30;
	
	setInterval(function() {
		time -= 1;
		timeDiv.html(time);
	}, 1000);
});