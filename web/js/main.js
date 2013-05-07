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
});