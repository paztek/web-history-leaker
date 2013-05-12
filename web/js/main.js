$(document).ready(function() {

    var gridWidth = 400;
    var gridPadding = 1

    var nbLines = 20;
    var nbCols = 20;

    // Construction de la grille
    var gridSize = nbLines * nbCols;

    // Decrypte global var datae
    urls = jQuery.parseJSON(Base64.decode(datae));

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

    $('div.line').height(gridWidth / nbLines);
    $('span.item').width(gridWidth / nbCols);
    $('#playground').height(gridWidth + nbLines * gridPadding * 2);
    $('#playground').width(gridWidth + nbCols * gridPadding * 2);


    $('span.item a').on('click', function(event) {
        event.preventDefault();
    });

    // Opera/IE and Chrome/Safari/Mozilla on the other hand have different behaviours concerning the display of the
    // link tooltip when we change/replace the DOM
    if (navigator.appName == 'Opera' || navigator.appName == 'Internet Explorer') {
        // On hover, we just replace the href of the hovered link
        $('span.item a').hover(function() {
            $(this).data('href', $(this).attr('href'));
            $(this).attr('href', '');
        }, function() {
            $(this).attr('href', $(this).data('href'));
        });
    } else {
        // On hover, we replace the <a/> with a <span/>
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
    }


	
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
        $('#infos').slideUp(1000);

        // Apparition score final
        $('#endScore').fadeIn(1000);
        $('#final_score').html(score);

        // Disparition de la grille
        $('#grid').fadeOut(6000);
    };
});

/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}