/* global $*/
/* eslint no-global-assign: "off"*/
'use strict';

global.$ = require( 'jquery' );
(function(){

if ( !document.querySelector( '#submit-quiz' ) ) return

var SCORING = {
  'read-self': {
    '18-61': [14,19,22,25,27,29,31,32,34,35,37,38,40,41,42,44,45,46,47,49,50,51,52,54,55,56,58,59,60,62,63,65,66,68,69,71,73,75,78,81,86],
    '62-plus': [14,20,24,26,29,31,33,35,36,38,39,41,42,44,45,46,48,49,50,52,53,54,56,57,58,60,61,63,64,66,67,69,71,73,75,77,79,82,84,88,95]
  },
  'read-to-me':{
    '18-61': [16,21,24,27,29,31,33,34,36,38,39,40,42,43,44,45,47,48,49,50,52,53,54,55,57,58,59,60,62,63,65,66,68,70,71,73,76,78,81,85,91],
    '62-plus': [18,23,26,28,30,32,33,35,36,38,39,40,41,43,44,45,46,47,48,49,50,52,53,54,55,56,57,58,60,61,62,64,65,67,68,70,72,75,77,81,87]
  }
}

var TOTAL_QUESTIONS = 12
var QUIZ_COMPLETE = false
var QUESTION_VALUES = {}


function allQuestionsCompleted(){
  return Object.keys(QUESTION_VALUES).length === TOTAL_QUESTIONS
}


function enableSubmit(){
  var submitInput = $('#submit-quiz')
  submitInput.title = 'Get your score'
  submitInput.removeClass('a-btn__disabled')
}


function handleClick(e){
  handleInput(e.target)
}


//thanks jQuery
function checkOnBack(i){
  handleInput(this)
}


function handleInput(input){
  if(input.name && input.checked) QUESTION_VALUES[input.name] = input.value
  QUIZ_COMPLETE = allQuestionsCompleted()
  if(QUIZ_COMPLETE) enableSubmit()
}


$(document).ready(function(){
  $('#submit-quiz').on('click', function(e){
    if(!QUIZ_COMPLETE) return e.preventDefault()
  })
  $(document).on('submit', function(e){
    e.preventDefault()
    var formValues = {}
    var pathname = window.location.pathname
    var resultsPagePath = ''
    if ( pathname.match( 'index.html' ) ) {
      resultsPagePath = pathname.replace( 'index.html', 'results.html?' )
    } else {
      resultsPagePath = pathname + 'results.html?'
    }

    $('#quiz-form').serialize().split('&').forEach(function(v){
      var keyval = v.split('=')
      formValues[keyval[0]] = keyval[1]
    })

    location = resultsPagePath + SCORING[formValues['method']][formValues['age']][
        Object.keys(formValues).filter(function(key){
          return key.indexOf('quest') === 0
        }).reduce(function(a, b){
          return a + (+formValues[b])
        }, 0)
      ]
  })

  $('.content_main input').on('click',function(e){
    var input = e.target
    if(input.name && input.checked) QUESTION_VALUES[input.name] = input.value
    QUIZ_COMPLETE = allQuestionsCompleted()
    if(QUIZ_COMPLETE) enableSubmit()
  }).each(checkOnBack)
})
})()
