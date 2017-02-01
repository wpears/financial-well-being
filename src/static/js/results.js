/* global $*/
/* eslint no-extra-semi: "off" */
;(function(){

if(!location.pathname.match('/results')) return

var AVERAGE = 39
var HIGH = 64

var resourcesByScore = [
  {
    graph: 'improvement.png',
    wellBeing: 'Could be improved'
  },
  {
    graph: 'average.png',
    wellBeing: 'Average'
  },
  {
    graph: 'high.png',
    wellBeing: 'High'
  }
]

var imgPath = window.location.pathname.replace( 'results.html', '' ) + 'static/img/'

function getResourcesByScore(score){
  if(score < AVERAGE) return resourcesByScore[0]
  if(score < HIGH) return resourcesByScore[1]
  return resourcesByScore[2]
}

function loadResources(score, resources){
  var header = $('#score-header')
  var blurb = $('#well-being-blurb')
  var graph = $('#score-graph')

  $(header).text(header.text() + ' ' + score)
  $(blurb).text(blurb.text() + ' ' + resources.wellBeing)
  graph.attr('src', imgPath + resources.graph)
}


$(document).ready(function(){
  var score = +location.search.slice(1)
  loadResources(score, getResourcesByScore(score))
})

})()
