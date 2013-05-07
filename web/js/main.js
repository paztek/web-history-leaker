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
	
	var timeSpan = $('#time');
	
	var time= 10;

    var urls = [];
	
	var id = setInterval(function() {
		time -= 1;
		timeSpan.html(time);
        if (time == 0) {
            clearInterval(id);
            console.log(urls);
        }
	}, 1000);

    var score = 0;

    $('span.real').on('click', function() {
        if ($(this).hasClass('checked')) {
            return;
        }
        $(this).addClass('checked');
        $(this).removeClass('real');
        score++;
        var a = $(this).find('a');
        if (a.length > 0) {
            console.log(a.first().data('href'));
            urls.push(a.first().data('href'));
        }
        updateScore();
    });

    var scoreSpan = $('#score');

    function updateScore() {
        scoreSpan.html(score);
    };
});