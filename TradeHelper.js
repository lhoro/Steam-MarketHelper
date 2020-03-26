// ==UserScript==
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @name         TH 
// @version      0.1
// @author       You
// @match        https://steamcommunity.com/market/listings/730/*
// @grant        none
// ==/UserScript==
var link = "https://steamcommunity.com/market/listings/730/";
$(document).ready(function() {
    if (location.href.substring(0, 47) == link) {
        setTimeout(find, 1000);
    }
})

var find = function(){
    var i=0;
    var text;
    for(i;i<5;i++){
        var zlecen = $('#market_commodity_buyrequests').text();
        zlecen = zlecen.slice(25, 200);
        zlecen = zlecen.match(/[0-9]*\,[0-9][0-9]/);
        zlecen = zlecen.toString().replace(",", ".");
        zlecen = parseFloat( zlecen );
        var cena = $('.market_listing_price_without_fee').eq(i).text();
        cena = cena.match(/[0-9]*\,[0-9][0-9]/);
        cena = cena.toString().replace(",", ".");
        cena = parseFloat( cena );
        var roznica = cena - zlecen;
        roznica = roznica.toString();
        roznica = roznica.match(/.[0-9]*\.[0-9][0-9]/);
        text = text + roznica + '\n';
    }
    alert(text);
};
