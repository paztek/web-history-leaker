Web History Leaker
==================

## Introduction

A few years ago (in 2010 for Firefox, which led the way), web browsers startied fixing security holes that could allow
leakage of sensistive information about the web history of the user. The vulnerabilities were using the ability to style
differently links and links:visited with CSS and Javascript to detect style attributes (width, padding, etc...)
that could set them apart.

Currently only CSS properties related to colors (color, background-color, etc...) can help distinguish links from links:visited.
As there is currently no way to extract the color of a pixel at an (x,y) position in JS, we couldn't find a way to circumvent
these limitations and write an autonomous (meaning no clicking or typing required) script to leak informations from the browser
history.

That's when we started to ask ourselves : "How can we lead users to click in specific zones when the only thing you have to
distinguish these zones from each others are colors ?".

A game of course !

So we're trying to make a simplistic but addictive enough JS game where when the user follows the rules and tries to get the
best score (according to the rules), he leaks informations about his browser history back to our webserver at each click !

## Usage

1) The attacker, who wants to sniff on one of his acquaintances web history, fills a web form listing all the URLs that should be tested by the game.

2) On submission, he receives a link pointing to a customized version of the "game".

3) He can now suggest his victim to play the game by sending him the link and by using some social engineering technics.

4) Once the victim has played the game, the attacker can consult a web page listing all the URLs that have been detected in the victim's browser history.

## How it works

We use some really tricky CSS rules, that we only understand half of the time, to display an HTML grid of squares.
These squares contain links that may have been visited or not by the victim. The player is invited through incentives like
a scoring system, a stressful countdown and awesome specials effects to click only on the squares that are visible to him
(meaning they are in his browser history).

We try to use browser specific JS technics to hide the link his mouse currently hovers and distract him from the fact that he is actually
giving away informations while playing.

Some optionnal improvements over the initial concept include the obfuscation of the list of URLs required by the game so that someone inspecting
the content of the page should have a harder time figuring out what this game is really about.