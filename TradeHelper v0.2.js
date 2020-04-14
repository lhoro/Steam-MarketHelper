// ==UserScript==
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @name         TH xD
// @version      0.2
// @author       You
// @match        https://steamcommunity.com/market/listings/730/*
// @grant        none
// ==/UserScript==
let link = "https://steamcommunity.com/market/listings/730/";

$(document).ready(function() {
    if (location.href.substring(0, 47) == link) {
        setTimeout(checkPrices, 1000);
    }
})

let checkPrices = () => {
    let i=0;
    let text;
    for(i;i<5;i++){
        let zlecen = $('#market_commodity_buyrequests').text();
        zlecen = zlecen.slice(25, 200);
        zlecen = zlecen.match(/[0-9]*\,[0-9][0-9]/);
        zlecen = zlecen.toString().replace(",", ".");
        zlecen = parseFloat( zlecen );
        let cena = $('.market_listing_price_without_fee').eq(i).text();
        cena = cena.match(/[0-9]*\,[0-9][0-9]/);
        cena = cena.toString().replace(",", ".");
        cena = parseFloat( cena );
        let roznica = cena - zlecen;
        roznica = roznica.toString();
        roznica = roznica.match(/.[0-9]*\.[0-9][0-9]/);
        text = text + roznica + '\n';
    }
    show(text);
};

let show = (prices) => {
    $('<div/>',{
        text: prices,
        style: "background-color:red; color:white; font-size:20px; position: fixed; top:104px; text-align:center; width: 50%; left:50%; transform:translateX(-50%);"
    }).appendTo('body');
}