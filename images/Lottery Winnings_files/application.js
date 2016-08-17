// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//





$(document).ready(function() {
  $('#allTickets').dataTable({
    "order": [
      [4, 'desc']
    ],

  });

  $('#leaderboard').dataTable({
    "order": [
      [3, 'desc']
    ],

  });

  setTimeout(function(){
    $('#noticeContainer').animate({ opacity: 0});
  }, 3000);
});

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function changeBrandName() {
  changeWord();
};

function changeWord() {
  var words = ['Treacherous Magnified Snails', 'Transcendental Murmuring Seal',
  'Trashy Masquerading Scientists', 'Tensacious Mustard Seasoning', 'Transatlantic Migrating Servants',
'Troubled Meditating Statesman', 'Temporary Mauling Session', 'Transcranial Magnetic Stimulation', 'Toilsome Mumbling Syndrome',
'Thunderous Metamorphosed Stockbroker', 'Tearful Manipulated Serpent', 'Tropical Marinated Seafood',
'Torpid Meandering Stream', 'Thermonuclear Mineralized Seafood', 'Troublesome Masterminding Strawberry', 'Too Much Swagger', 'Therapeutic Money Spending',
'Triangular Mesh Surfaces', 'Time Money Stuff', 'Traitorous Mechanical Seahorse', 'Touch My Soul']
  var numOfWords = words.length - 1;
  var number = getRandomIntInclusive(0, numOfWords);
  var brandName = document.getElementById("navWords");
  brandName.innerHTML = words[number];
}

function isInt(value) {
  var x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
}

function calcProfit() {
  var retail = $("#retailprice").val();
  var payout = $("#payoutprice").val();
  var lblProfit = $("#totalprofit");
  var profit = "";
  if (isInt(retail) && isInt(payout) && retail.length > 0 && payout.length > 0) {
    profit = parseInt(payout) - parseInt(retail);
    $('#showProfits').show();
    $('#profitValue').text(profit);
    lblProfit.attr('value', profit);
    if(profit > 0) {
      $('#netProfit').html('Gain: ');
      $('#showProfits').attr('class', 'profitGain');
    }
    else {
      $('#netProfit').html('Loss: ');
      $('#showProfits').attr('class', 'profitLoss');
    }
  }
  else {
    $('#showProfits').addClass('hidden');
  }
}

function checkRetail(event) {
  var $focused = $('#retailprice:focus');
  $focused.keyup(function () {
    var current = $(this);
    var text = current.val();
    var element = current.parent().parent();
    if(text.length > 0 && isInt(text)) {
      element.removeClass('has-error');
      current.parent().find('span.input-group-addon').addClass('valid-input-addon');
      current.parent().find('input').addClass('valid-input');
    }
    else {
      element.addClass('has-error');
      current.parent().find('span.input-group-addon.valid-input-addon').removeClass('valid-input-addon');
      current.parent().find('input.valid-input').removeClass('valid-input');
    }
  })
}

function checkPayout(event) {
  var $focused = $('#payoutprice:focus');
  $focused.keyup(function () {
    var current = $(this);
    var text = current.val();
    var element = current.parent().parent();
    if(text.length > 0 && isInt(text)) {
      element.removeClass('has-error');
      current.parent().find('span.input-group-addon').addClass('valid-input-addon');
      current.parent().find('input').addClass('valid-input');
    }
    else {
      element.addClass('has-error');
      current.parent().find('span.input-group-addon.valid-input-addon').removeClass('valid-input-addon');
      current.parent().find('input.valid-input').removeClass('valid-input');
    }
  })
}

function checkLocation(event) {
  var $focused = $('#ticket_location:focus');
  $focused.keyup(function () {
    var current = $(this);
    var text = current.val();
    var element = current.parent().parent();
    if(text.length >= 1) {
      element.removeClass('has-error');
      current.parent().find('input').addClass('valid-input');
      element.find('span.fa.fa-pencil-square.fa-2x').attr('id', 'valid-icon');
    }
    else {
      element.addClass('has-error');
      current.parent().find('input.valid-input').removeClass('valid-input');
      element.find('span#valid-icon.fa.fa-pencil-square.fa-2x').attr('id', 'invalid-icon');
    }
  })
}
;
