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
            var range = Math.ceil(Math.random() * 3);
            var points = range == 1 ? 1 : range == 2 ? 3 : 5;
            var redClass = 'red' + range;
            switch (url.id) {
                case -1:
                    item.addClass('real');
                    item.addClass(redClass);
                    item.attr('data-points', points);
                    a.attr('href', '');
                    break;
                case 0:
                    a.attr('href', '');
                    break;
                default:
                    item.addClass('real');
                    item.addClass(redClass);
                    item.attr('data-points', points);
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

    function replace() {
        // As mouseleave does not always trigger, we need to find and replace every existing "replacement" that is still around
        $('#grid .replacement').each(function() {
            replaceBack.apply(this);
        });
        var a = $(this);
        var replacement = $('<span class="replacement"></span>');
        replacement.attr('data-href', a.attr('href'));
        a.replaceWith(replacement);
        replacement.on('mouseleave', replaceBack);
    };

    function replaceBack() {
        var replacement = $(this);
        var a = $('<a></a>');
        a.attr('href', replacement.attr('data-href'));
        replacement.replaceWith(a);
        a.on('mouseenter', replace);
    }

    $('span.item a').on('mouseenter', replace);
	
	var timeSpan = $('#time');
	
	var time = 30;

    timeSpan.html(time);

    var score = 0;

    var countdownStarted = false;
    var intervalId;

    $('span.real').on('mousedown', function() {
        startCounter();
        if ($(this).hasClass('checked')) {
            return;
        }
        $(this).addClass('checked');
        $(this).removeClass('real');
        score += parseInt($(this).attr('data-points'));
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

    $('span:not(.real)').on('mousedown', function() {
        startCounter();
        score -= 10;
        $('#pain').show()
        $('#pain').fadeOut('fast');
        updateScore();
    });

    var scoreSpan = $('#score');

    function updateScore() {
        scoreSpan.html(score);
    };

    function startCounter () {
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
    };

    function endOfTheGame() {
        // Interruption du jeu
        $('span.real').off('mousedown');
        $('span:not(.real)').off('mousedown');

        // Apparition du message de game over...
        $('#gameover').slideDown(1000);
        // ...à la place des infos !
        $('#ingame').slideUp(1000);

        // Apparition score final
        $('#endscore').fadeIn(1000);
        $('#finalscore').html(score);

        // Disparition de la grille
        $('#grid').fadeOut(6000);
    };
});