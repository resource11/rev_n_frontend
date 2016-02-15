'use strict';

var session = {
  userId: null,
  token: null,
};

var registerSubmit = $('#register');
var loginSubmit = $('#login');
var registerMenu = $('.register-scheme');
var loginMenu = $('.login-scheme');
var createSideMenu = $('.create-scheme');
var createSubmit = $('#create-side');
var editSideMenu = $('.edit-scheme');
var editForm = $('#edit-side');
var userBillboardsList = $('#user-revs');
var closeMe = $('.close-me');
var closeMeCreate = $('.close-me-create');
var addRev = $('.add-rev');
var viewRev = $('.view-rev');
var editRev = $('.edit-rev');
var saveRev = $('.save-rev');
var messagesContainer = $('.messages-container');
var userMessages = $('.user-messages');
var frontView = $('.front-view');
var revList = $('.list-scheme');
var revInfo = $('.rev-info');

var leftPanel = $('.left-panel');
var midPanel = $('.mid-panel');
var rightPanel = $('.right-panel');

var leftPanelLftPrsp = $('.left-panel-lft-persp');
var midPanelLftPrsp = $('.mid-panel-lft-persp');

var midPanelRtPrsp = $('.mid-panel-rt-persp');
var rightPanelRtPrsp = $('.right-panel-rt-persp');

var bulletNav = $('.bullet-nav');


var color1, color2, color3, bgColor;


var colorScheme;
var animOption;


var listUserBillboardHTML = function (billboard) {
  userBillboardsList.prepend(
    '<article data-id=' + billboard.id +
    ' class="billboard-post"><div class="rev-item editable rev-name"><h5 contentEditable="false">'
     + billboard.name + '</h5><h6 class="editable rev-title" contentEditable="false">' + billboard.title +'</h6><p class="editable rev-subtext01" contentEditable="false">'
     + billboard.subtext01 + '</p><p class="editable rev-subtext01" contentEditable="false">' + billboard.subtext02 +
    '</p><p class="editable rev-color" contentEditable="false">' + billboard.color_scheme +
    '</p><p class="editable rev-anim" contentEditable="false">' + billboard.anim_option +
    '</p></div><div class="rev-button"><button class="view-rev icon-eye"> view</button><button class="edit-rev icon-pencil"> edit</button><button class="save-rev icon-cloud-check"> save</button><button href="" class="delete-rev icon-bin"> delete</button></article>'
    );
};

// create object from form data
var form2object = function(form) {
  var data = {};
  $(form).children().each(function(index, element) {
    var type = $(this).attr('type');
    if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
      data[$(this).attr('name')] = $(this).val();
    }
  });
  return data;
};


// wrap function
var wrap = function wrap(root, formData) {
  var wrapper = {};
  wrapper[root] = formData;
  return wrapper;
};


// callback function
var callback = function callback(error, data) {
  if (error) {
    console.error(error);
    $('#result').val('status: ' + error.status + ', error: ' + error.error);
    return;
  }
  $('#result').val(JSON.stringify(data, null, 4));
};


// registration callback
var regCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".register-messages").html("<strong>Error! Registration fail!</strong>");
    return;
  }
  console.log(JSON.stringify(data, null, 4));
    $('.register-messages').text('Welcome,  new user #' + data.user.id);
       // hide register container
  registerMenu.slideUp();
};



// login callback
var loginCb = function (error, data) {
  if (error) {
    console.error(error);

    $(".login-messages").delay(600).fadeIn(300).html("<strong>Error! Login fail!</strong>");
    return;
  }

  // assign current_user.id and session.token
  session.userId = data.user.id;
  session.token = data.user.token;
  loginMenu.slideUp();
  // show in console for testing purposes
  console.log(session.userId);
  console.log(session.token);

  // display current_user status
  data.user.current_user = true;

  // list current user billboards
  api.listUserBillboards(session.token, listUserBillboardsCb);
  loginMenu.slideUp();
  // revList.delay(600).fadeIn(300).removeClass('hidden');
  messagesContainer.fadeIn(300).removeClass('hidden');
  $('.messages-container h6').text('Welcome, user #' + session.userId);
  $('.user-messages').delay(600).fadeIn(300).text('Create a rev or show the list of saved revs');
  // addRev.fadeIn(300).removeClass('hidden');
  frontView.fadeIn(300).removeClass('hidden');
  bulletNav.fadeIn(300).removeClass('hidden');
  $('.title-treatment').delay(2600).addClass('animated zoomIn').one('animationEnd', function(){
    // $(this).remove('animated zoomIn');
  });
  $('.subtext01-treatment').delay(3600).addClass('animated zoomIn').one('animationEnd', function(){
    // $(this).remove('animated zoomIn');
  });
  $('.subtext02-treatment').delay(4600).addClass('animated zoomIn').one('animationEnd', function(){
    // $(this).remove('animated zoomIn');
  });

  $('.top-nav').fadeIn(300).removeClass('hidden');


  setInterval(function() {
  $(".myClass2")
    .velocity("transition.slideDownBigIn", { stagger: 250 })
    .delay(750)
    .velocity({ opacity: 0 }, 750)
  }, 20);


 setInterval(function() {
  $(".myClass3")
    .velocity("transition.slideLeftIn", { stagger: 250 })
    .delay(750)
    .velocity({ opacity: 0 }, 750)
  }, 2000);

 setInterval(function() {
  $(".myClass1")
    .velocity("transition.slideUpBigIn", { stagger: 250 })
    .delay(750)
    .velocity({ opacity: 0 }, 750)
  }, 2000);

  $(".myClass1 .myClass2 .myClass3").velocity(
  {
    translateZ: 0, // Force HA by animating a 3D property
    translateX: "200px",
    rotateZ: "45deg"
  },
  {
    duration: 2000,
    loop: 10 // Loop one time (animate scale to 1.5 then back to its original value).
  });


}; // end of login callback;



// logout callback
var logoutCb = function (error){
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Whoops! You're still logged in.</strong>");
  }
  data.user.current_user = false;
  // changeLogout();
  console.log(JSON.stringify(data, null, 4));
  console.log("Logged out");
};


// listUserBillboards callback
var listUserBillboardsCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Rev listing fail!</strong>");
    return;
  }


  // hide hero intro and show rev list
  $('.hero').fadeOut(200);
  // show user rev list
  // revList.delay(600).fadeIn().removeClass('hidden');

  // grab billboards from Rails
  var billboards = data.billboards;

  billboards.forEach(function(billboard){
    listUserBillboardHTML(billboard);
  });

};


// createBillboard callback
var createBillboardCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Rev create fail!</strong>");
    return;
  }

  var billboard = data.billboard;
  // listBillboardHTML(billboard);
  listUserBillboardHTML(billboard);
  // $('.user-messages').text('New rev ' + data.billboard.id + ' created by user ' + data.user.id);

  billboard.name = data.billboard.name;
  billboard.title = data.billboard.title;
  billboard.subtext01 = data.billboard.subtext01;
  billboard.subtext02 = data.billboard.subtext02;
  colorScheme = data.billboard.color_scheme;
  animOption = data.billboard.anim_option;



  // colorScheme = '+=color-scheme-' + billboard.color_scheme;

  $('.video-wall').attr('data-id', data.billboard.id);


  $('.user-messages').html('You are viewing rev: </br><strong>' + billboard.name + '</strong>');
  $('.title-treatment').html(billboard.title);
  $('.subtext01-treatment').html(billboard.subtext01);
  $('.subtext02-treatment').html(billboard.subtext02);

};
// end of createBillboard submit handler






// editBillboard callback
var editBillboardCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Rev update fail!</strong>");
    return;
  }

  $(".user-messages").html("<strong>Rev " + billboard.name + " updated!</strong>");

    // api.showBillboard(id, session.token, loadBillboardCb);

};
// end of editBillboard submit handler



// listUserBillboards callback
var loadBillboardCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Rev load fail!</strong>");
    return;
  }



  // grab billboards from Rails
  console.log('billboard is: ' + JSON.stringify(data));

  // set data attributes of video wall elements

  billboard.name = data.billboard.name;
  billboard.title = data.billboard.title;
  billboard.subtext01 = data.billboard.subtext01;
  billboard.subtext02 = data.billboard.subtext02;
  colorScheme = data.billboard.color_scheme;
  animOption = data.billboard.anim_option;



  // colorScheme = '+=color-scheme-' + billboard.color_scheme;

  $('.video-wall').attr('data-id', data.billboard.id);


  $('.user-messages').html('You are viewing rev: </br><strong>' + billboard.name + '</strong>');
  $('.title-treatment').html(billboard.title);
  $('.subtext01-treatment').html(billboard.subtext01);
  $('.subtext02-treatment').html(billboard.subtext02);

  // TweenMax.to([leftPanel, midPanel, rightPanel], 2, {className:'+=color-scheme-purple'}, 0.2);
  // TweenMax.to([leftPanel, midPanel, rightPanel], 0.5, {className:colorScheme}, 0.2);




  switch (colorScheme) {
  case "red":
    color1 = "#db0444";
    color2 = "#8f0222";
    color3 = "#6D0019";
    break;
  case "orange":
    color1 = "#ff6600";
    color2 = "#ea2803";
    color3 = "#C72903";
    // bgColor = "grad-orange.svg";
    bgColor = "color-scheme-orange";
    break;
  case "gold":
    color1 = "#f9a600";
    color2 = "#ea5507";
    color3 = "#B63F00";
    break;
  case "green":
    color1 = "#98C92B";
    color2 = "#0D7F01";
    color3 = "#095F00";
    break;
  case "blue":
    color1 = "#0ABBFB";
    color2 = "#0370C9";
    color3 = "#006CC3";
    break;
  case "purple":
    color1 = "#de47ac";
    color2 = "#96007F";
    color3 = "#5F0150";
    break;
  case "pink":
    color1 = "#ff5db1";
    color2 = "#ef017c";
    color3 = "#BB0061";
    break;
  case "slate":
    color1 = "#595959";
    color2 = "#1c1c1c";
    color3 = "#0c0c0c";
    break;
  default:
    break;
}

leftPanel.css("background","radial-gradient(" + color1 + " 0%,"+ color2 + " 100%)");
midPanel.css("background","radial-gradient(" + color1 + " 0%,"+ color2 + " 100%)");
rightPanel.css("background","radial-gradient(" + color1 + " 0%,"+ color2 + " 100%)");

leftPanelLftPrsp.css("background","radial-gradient(" + color1 + " 0%,"+ color2 + " 78%," + color3 + " 100%)");
// leftPanelLftPrsp.addClass(bgColor);
midPanelLftPrsp.css("background","radial-gradient(" + color1 + " 0%,"+ color2 + " 100%)");

midPanelRtPrsp.css("background","radial-gradient(" + color1 + " 0%,"+ color2 + " 100%)");
rightPanelRtPrsp.css("background","radial-gradient(" + color1 + " 0%,"+ color2 + " 78%," + color3 + " 100%)");


};



// deleteBikes callback
var deleteBillboardCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Rev deletion fail!</strong>");
    return;
  }

  $(".user-messages").html("<strong>Rev deletion success!</strong>");

};




