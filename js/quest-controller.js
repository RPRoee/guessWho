'use strict';

var gLastRes = null;

$(init);


function init() {
  createQuestsTree();
  $('input').attr('autocomplete', 'off');
  $('.btn-start').click(onStartGuessing);
  $('.btn-yes').click({ ans: 'yes' }, onUserResponse);
  $('.btn-no').click({ ans: 'no' }, onUserResponse);
  // $('.btn-add-guess').click(onAddGuess);
  $('form').submit(onAddGuess)
  $('.restart-btn').click(onRestartGame);
}

function onStartGuessing() {
  $('.game-start').hide();
  renderQuest();
  $('.quest').show();
}

function renderQuest() {
  $('.quest h2').text(getCurrQuest().txt);
}

function onUserResponse(ev) {
  console.log(ev);
  var res = ev.data.ans;
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.right-guess').show();
      $('.quest').hide();
    } else {
      $('.quest').hide();
      $('.new-quest').show();
    }
  } else {
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  // ev.preventDefault();
  var newQuest = $('#newQuest').val();
  var newGuess = $('#newGuess').val();
  if (newQuest === '' || newGuess === '') return
  addGuess(newQuest, newGuess, gLastRes);
  onRestartGame();
  $('#newQuest').val('');
  $('#newGuess').val('');
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.right-guess').hide();
  $('.game-start').show();
  gLastRes = null;
  resetService();
}