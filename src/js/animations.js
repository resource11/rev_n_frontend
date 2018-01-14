'use strict';

/*
See http://www.greensock.com/splittext/ for details.
This demo uses SplitText which is a membership benefit of Club GreenSock, http://www.greensock.com/club/
*/

var titleText = document.getElementsByClassName("title-treatment"),
    subtxtText01 = document.getElementsByClassName("subtext01-treatment"),
    subtxtText02 = document.getElementsByClassName("subtext02-treatment"),
    titleSplitText = new SplitText(titleText, {type:"chars,words"}),
    subtxtSplitText01 = new SplitText(subtxtText01, {type:"chars,words"}),
    subtxtSplitText02 = new SplitText(subtxtText02, {type:"chars,words"}),
    tl = new TimelineMax({delay:0.5, repeat:-1, repeatDelay:1}),
    titleNumWords = titleSplitText.words.length,
    titleNumChars = titleSplitText.chars.length,
    subtxtNumWords01 = subtxtSplitText01.words.length,
    subtxtNumChars01 = subtxtSplitText01.chars.length,
    subtxtNumWords02 = subtxtSplitText02.words.length,
    subtxtNumChars02 = subtxtSplitText02.chars.length;

//prep the titleText div for 3D goodness
TweenLite.set(titleText, {transformPerspective:600, perspective:300, transformStyle:"preserve-3d", autoAlpha:1});

//prep the subtxtText01 div for 3D goodness
TweenLite.set(subtxtText01, {transformPerspective:600, perspective:300, transformStyle:"preserve-3d", autoAlpha:1});

//prep the subtxtText02 div for 3D goodness
TweenLite.set(subtxtText02, {transformPerspective:600, perspective:300, transformStyle:"preserve-3d", autoAlpha:1});

//intro sequence, title
for(var i = 0; i < titleNumWords; i++){
  tl.from(titleSplitText.words[i], 1.5, {z:randomNumber(-500,300), opacity:0, rotationX:randomNumber(-80, 20)}, Math.random()*1.5);
}
tl.from(titleText, tl.duration(), {rotationX:180, transformOrigin:"75% 50% 50", ease:Power2.easeOut}, 0);

//intro sequence, subtext01
for(var i = 0; i < subtxtNumWords01; i++){
  tl.from(subtxtSplitText01.words[i], 1.5, {z:randomNumber(500,-300), opacity:0, rotationY:randomNumber(-40, 40)}, Math.random()*1.5);
  // tl.from(titleSplitText.chars[i], 1.5, {z:randomNumber(-500,300), opacity:0, rotationY:randomNumber(-40, 40)}, Math.random()*1.5);
}
tl.from(subtxtText01, tl.duration(), {rotationY:-180, transformOrigin:"50% 75% 100", ease:Power2.easeOut}, 0);

//intro sequence, subtext02
for(var i = 0; i < subtxtNumWords02; i++){
  tl.from(subtxtSplitText02.words[i], 1.5, {z:randomNumber(-500,300), opacity:0, rotationY:randomNumber(-40, 40)}, Math.random()*1.5);
  // tl.from(titleSplitText.chars[i], 1.5, {z:randomNumber(-500,300), opacity:0, rotationY:randomNumber(-40, 40)}, Math.random()*1.5);
}
tl.from(subtxtText02, tl.duration(), {rotationY:-180, transformOrigin:"50% 75% 100", ease:Power2.easeOut}, 0);

//randomly change z of each word, map opacity to z depth and rotate titleText on y axis
for(var i = 0; i < titleNumWords; i++){
  var z = randomNumber(-50,50)
  tl.to(titleSplitText.words[i], 0.5, {z:z, opacity:rangeToPercent(z, -50, 50)}, "pulse");
}
tl.to(titleText, 0.5, {x:-100, y:-30, rotationY:80}, "pulse");

//randomly change z of each word, map opacity to z depth and rotate titleText on xy axis
for(var i = 0; i < titleNumWords; i++){
  var z = randomNumber(-100,100)
  tl.to(titleSplitText.words[i], 0.5, {z:z, opacity:rangeToPercent(z, -100, 100)}, "pulse2");
}
tl.to(titleText, 0.5, {x:0, y:0, rotationX:-35, rotationY:0}, "pulse2");

//reset the titleText to normal position
tl.to(titleSplitText.words, 0.5, {z:0, opacity:1}, "reset")
tl.to(titleText, 0.5, {rotationY:0, rotationX:0}, "reset");

//add explode label 2 seconds after reset animation is done
tl.add("explode", "+=1")
//add explode effect
for(var i = 0; i < titleNumWords; i++){
  tl.to(titleSplitText.words[i], 0.6, {z:randomNumber(100, 500), opacity:0, rotationX:randomNumber(-360, 360)}, "explode+=" + Math.random()*0.2);
}

//randomly change z of each word, map opacity to z depth and rotate subtxtText01 on y axis
for(var i = 0; i < subtxtNumWords01; i++){
  var z = randomNumber(-50,50)
  tl.to(subtxtSplitText01.words[i], 0.5, {z:z, opacity:rangeToPercent(z, -50, 50)}, "pulse");
}
tl.to(subtxtText01, 0.5, {rotationY:80}, "pulse");

//randomly change z of each word, map opacity to z depth and rotate subtxtText01on xy axis
for(var i = 0; i < subtxtNumWords01; i++){
  var z = randomNumber(-100,100)
  tl.to(subtxtSplitText01.words[i], 0.5, {z:z, opacity:rangeToPercent(z, -100, 100)}, "pulse2");
}
tl.to(subtxtText01, 0.5, {x:0, y:0, rotationX:-35, rotationY:0}, "pulse2");

//reset the titleText to normal position
tl.to(subtxtSplitText01.words, 0.5, {z:0, opacity:1}, "reset")
tl.to(subtxtText01, 0.5, {rotationY:0, rotationX:0}, "reset");

//add explode label 2 seconds after reset animation is done
tl.add("explode", "+=0")
//add explode effect
for(var i = 0; i < subtxtNumWords01; i++){
  tl.to(subtxtSplitText01.words[i], 0.6, {z:randomNumber(100, 500), opacity:0, rotationX:randomNumber(-360, 360)}, "explode+=" + Math.random()*0.2);
}

//randomly change z of each word, map opacity to z depth and rotate subtxtText02 on y axis
for(var i = 0; i < subtxtNumWords02; i++){
  var z = randomNumber(-50,50)
  tl.to(subtxtSplitText02.words[i], 0.5, {z:z, opacity:rangeToPercent(z, -50, 50)}, "pulse");
}
tl.to(subtxtText02, 0.5, {rotationY:80}, "pulse");

//randomly change z of each word, map opacity to z depth and rotate subtxtText01on xy axis
for(var i = 0; i < subtxtNumWords02; i++){
  var z = randomNumber(-100,100)
  tl.to(subtxtSplitText02.words[i], 0.5, {z:z, opacity:rangeToPercent(z, -100, 100)}, "pulse2");
}
tl.to(subtxtText02, 0.5, {x:0, y:0, rotationX:-35, rotationY:0}, "pulse2");

//reset the titleText to normal position
tl.to(subtxtSplitText02.words, 0.5, {z:0, opacity:1}, "reset")
tl.to(subtxtText02, 0.5, {rotationY:0, rotationX:0}, "reset");

//add explode label 2 seconds after reset animation is done
tl.add("explode", "+=0")
//add explode effect
for(var i = 0; i < subtxtNumWords02; i++){
  tl.to(subtxtSplitText02.words[i], 0.6, {z:randomNumber(100, 500), opacity:0, rotationX:randomNumber(-360, 360)}, "explode+=" + Math.random()*0.2);
}

//TRY THIS FOR SUPER-SLOW-MO
//tl.timeScale(0.2);

//some helper functions
function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}

function rangeToPercent(number, min, max){
    return ((number - min) / (max - min));
}
