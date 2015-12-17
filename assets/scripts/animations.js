'use strict';



//$(document).ready(...
$(function() {

  var myClass1 = $('.myClass1');
  var myClass2 = $('.myClass2');
  var myClass3 = $('.myClass3');




// test play/pause using Tweenlite
var element = $('.myClass1');
var el1 = myClass1;
var el2 = myClass2;
var el3 = myClass3;


//create a TimelineLite instance
var tl = new TimelineLite();

//append a to() tween
tl.to(element, 1, {width:"50%"});

//add another sequenced tween (by default, tweens are added to the end of the timeline which makes sequencing simple)
tl.to(element, 1, {height:"300px", ease:Elastic.easeOut});

//offset the next tween by 0.75 seconds so there's a gap between the end of the previous tween and this new one
tl.to(element, 1, {opacity:0.5}, "+=0.75");

//overlap the next tween with the previous one by 0.5 seconds (notice the negative offset at the end)
tl.to(element, 1, {backgroundColor:"#FF0000"}, "-=0.5");

//animate 3 elements (e1, e2, and e3) to a rotation of 60 degrees, and stagger their start times by 0.2 seconds
// tl.staggerTo([e1, e2, e3], 1, {rotation:60}, 0.2);
tl.staggerTo([myClass1, myClass2, myClass3], 1, {rotation:60}, 0.2);

//then call myFunction()
// tl.call(myFunction);

//now we can control the entire sequence with the standard methods like these:
tl.pause();
tl.resume();
tl.restart();
tl.reverse();
tl.play();

//jump to exactly 2.5 seconds into the animation
tl.seek(2.5);

//slow down playback to 10% of the normal speed
tl.timeScale(0.1);

//add a label named "myLabel" at exactly 3 seconds:
tl.add("myLabel", 3);

//add a tween that starts at "myLabel"
tl.add( TweenLite.to(element, 1, {scale:0.5}), "myLabel");

//jump to "myLabel" and play from there:
tl.play("myLabel");


// button test animation handler
$('.play-anim').on('click', function() {
  console.log('clicked');
  tl.play();
});

$('.pause-anim').on('click', function() {
  console.log('clicked');
  tl.pause();
});

$('.resume-anim').on('click', function() {
  console.log('clicked');
  tl.resume();
});

$('.reverse-anim').on('click', function() {
  console.log('clicked');
  tl.reverse();
});

$('.restart-anim').on('click', function() {
  console.log('clicked');
  tl.restart();
});

 // // button test animation handler
 //  $('.play-anim').on('click', function() {

 //    console.log('clicked');

 //    tl.play();
 //    // // $(".myClass1").animate({top:100, left:200}, 3000);
 //    // // $(".myClass1").animate({top:100, left:200}, {duration:3000, easing:"easeOutStrong"});
 //    // // TweenMax.to(".myClass", 2, {top:100, left:200});
 //    // TweenMax.to([myClass1, myClass2, myClass3], 2, {top:50, left:70, ease:Elastic.easeOut});

 //  });

















});
// end doc ready function
