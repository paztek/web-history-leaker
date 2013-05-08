$(document).ready(function() {

    var nbLines = 20;
    var nbCols = 20;
    var gridSize = nbLines * nbCols;

    // Construction de la grille

    // Decrypte global var datae
    urls = JSON.parse(atob(datae));

    console.log(urls);

    // 1) Construction du tableau complet : URLs répétées + autant de fake + padding avec du vide
    var data = [];
    while (data.length < gridSize/4) {
        data = data.concat(urls);
    }
    while (data.length < gridSize/2) {
        data = data.concat([{ id: -1 }]);
    }
    while (data.length < gridSize) {
        data = data.concat([{ id: 0 }]);
    }

    // 2) Construction de la grille en piochant dans le tableau data
    var grid = $('#grid');
    for (var i = 0; i < nbLines; i++) {
        var line = $('<div class="line"></div>');
        for (var j = 0; j < nbCols; j++) {
            var item = $('<span class="item"></span>');
            var a = $('<a></a>');
            item.append(a);
            var position = Math.floor(Math.random() * data.length);
            var url = data[position];
            data.splice(position, 1);
            item.attr('data-id', url.id);
            var redClass = 'red' + Math.ceil(Math.random() * 3);
            switch (url.id) {
                case -1:
                    item.addClass('real');
                    item.addClass(redClass);
                    a.attr('href', '');
                    break;
                case 0:
                    a.attr('href', '');
                    break;
                default:
                    item.addClass('real');
                    item.addClass(redClass);
                    a.attr('href', url.href);
                    break;
            }
            line.append(item);
        }
        grid.append(line);
    }

    $('span.item a').on('click', function(event) {
        event.preventDefault();
    });


    var FF = !(window.mozInnerScreenX == null);

    if (FF) {
        $('span.item a').attr('href', '');
    } else {
        $('span.item a').hover(function() {
            $(this).data('href', $(this).attr('href'));
            $(this).attr('href', '');
        }, function() {
            $(this).attr('href', $(this).data('href'));
        });
    }

	
	var timeSpan = $('#time');
	
	var time = 10;

    timeSpan.html(time);

    var score = 0;

    var countdownStarted = false;
    var intervalId;

    $('span.real').on('mousedown', function() {
        if (!countdownStarted) {
            intervalId = setInterval(function() {
                time -= 1;
                timeSpan.html(time);
                if (time == 0) {
                    clearInterval(intervalId);
                    // End of the game
                    endOfTheGame();
                }
            }, 1000);
            countdownStarted = true;
        }
        if ($(this).hasClass('checked')) {
            return;
        }
        $(this).addClass('checked');
        $(this).removeClass('real');
        score++;
        var a = $(this).find('a');
        console.log($(this).attr('data-id'));
        if ($(this).attr('data-id') > 0) {
            $.ajax({
                url: '/url/' + $(this).attr('data-id'),
                type: 'POST'
            }).done(function() {
                console.log('done');
            });
        }
        updateScore();
    });

    var scoreSpan = $('#score');

    function updateScore() {
        scoreSpan.html(score);
    };

    function endOfTheGame() {
        // Disparition de la grille
        $('#grid').fadeOut(3000);
        // Interruption du jeu
        $('span.real').off('mousedown');
        // Apparition du message de game over
        $('#final_score').html(score);
        $('#gameover').fadeIn('fast');
    };
});