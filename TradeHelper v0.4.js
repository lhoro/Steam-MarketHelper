// ==UserScript==
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @name         TH 0.4
// @version      0.4
// @author       You
// @match        https://steamcommunity.com/market/listings/730/*
// @grant        none
// ==/UserScript==

// CS:GO MARKET LINK
let link = "https://steamcommunity.com/market/listings/730/";

// DOCUMENT READY - START FUNCTION
$(document).ready(function() {
    if (location.href.substring(0, 47) == link) {
        setTimeout(checkRequest, 1000);
    }
})

// CHECK REQUEST VALUE
let checkRequest = () => {
    let request = document.getElementById("market_commodity_buyrequests");
    request = request.innerHTML;
    request = request.slice(25, 200);
    request = request.match(/(\d\s)?[0-9]*\,[0-9][0-9]/);
    request = request[0].toString().replace(" ", "")
    request = parseFloat(request.replace(",", "."));
    checkPrices(request);
}

// CHECK MARKET PRICES
let checkPrices = (request) => {
    let price, profit;
    let profits = [];
    let prices = [...document.getElementsByClassName("market_listing_price_without_fee")];

    prices.forEach((element)=>{
        price = element.innerHTML;
        price = price.match(/(\d\s)?[0-9]*\,[0-9][0-9]/);
        if(price != null){
            price = price.toString().replace(" ", "");
            price = parseFloat(price.toString().replace(",", "."));
            let profit = price - request;
            profit = profit.toFixed(2);
            profits.push(parseFloat(profit));
        }
        else{
            profits.push(parseFloat(0.00));
        }
    })

  show(profits , prices.length);
};


// SHOW PROFITS
let show = (profits, resoults) => {
    let i = 0;
    let color = 0;
    let text = "";

    for(i;i<resoults ;i++){
        if(profits[i] > 0)
            color = "green";
        else
            color = "red";
        text = text + "<span style='color:"+color+"; margin:10px'>"+profits[i]+"</span></br>";
    }

   $('<div/>',{
       html: text,
       style: "background-color:black; color:white; font-size:20px; position: fixed; top:50%; transform:translateY(-50%); text-align:center; right:10px;"
   }).appendTo('body');
}