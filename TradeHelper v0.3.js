// ==UserScript==
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @name         TH 0.3
// @version      0.3
// @author       You
// @match        https://steamcommunity.com/market/listings/730/*
// @grant        none
// ==/UserScript==

// CS:GO Market link
let link = "https://steamcommunity.com/market/listings/730/";

// Document ready function
$(document).ready(function() {
    if (location.href.substring(0, 47) == link) {
        setTimeout(checkRequest, 1000);
    }
})

// Check request value
let checkRequest = () => {
    let request = 0;
    request = $('#market_commodity_buyrequests').text();
    request = request.slice(25, 200);
    request = request.match(/[0-9]*\,[0-9][0-9]/);
    request = parseFloat(request[0].toString().replace(",", "."));
    checkPrices(request);
}

// Check Market Prices
let checkPrices = (request) => {
    let i=0;
    let profits = [];
    for(i;i<5;i++){

        let price = $('.market_listing_price_without_fee').eq(i).text();
        price = price.match(/[0-9]*\,[0-9][0-9]/);
        price = parseFloat(price.toString().replace(",", "."));
        let profit = price - request;
        profit = profit.toFixed(2);
        profits.push(parseFloat(profit));
    }
    show(profits);
};

// Show informations
let show = (profits) => {
    let i = 0;
    let color = 0;
    let text = "";

    for(i;i<5;i++){
        if(profits[i] > 0)
            color = "green";
        else
            color = "red";
        text = text + "<span style='color:"+color+"; margin:10px'>"+profits[i]+"</span>";
    }

    $('<div/>',{
        html: text,
        style: "background-color:black; color:white; font-size:20px; position: fixed; top:104px; text-align:center; width: 50%; left:50%; transform:translateX(-50%);"
    }).appendTo('body');
}