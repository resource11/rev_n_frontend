'use strict';



//$(document).ready(...
$(function() {



 // button test animation handler
  $('.animateTest').on('click', function() {
    var myClass = $('.myClass');
    var myClass2 = $('.myClass2');
    console.log('clicked');
    // $(".myClass").animate({top:100, left:200}, 3000);
    // $(".myClass").animate({top:100, left:200}, {duration:3000, easing:"easeOutStrong"});
    // TweenMax.to(".myClass", 2, {top:100, left:200});
    TweenMax.to([myClass, myClass2], 2, {top:100, left:200});

  });




















});
// end doc ready function
