'use strict';

var session = {
  userId: null,
  token: null,
};

// var billboard = {
//   id: null,
//   name: null,
//   title: null,
//   subtext01: null,
//   subtext02: null,
//   color_scheme: null,
//   anim_option: null,
//   user_id: null
// };


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
var saveRev = $('.save-rev');
var messagesContainer = $('.messages-container');
var frontView = $('.front-view');
var revList = $('.list-scheme');
var revInfo = $('.rev-info');

// var userBillboardsList = $('#user-revs');

// var removeBillboard = function(data, location1, location2) {
//   location1.find.location2.remove();
// };


var listUserBillboardHTML = function (billboard) {
  userBillboardsList.prepend(
    '<article data-id=' + billboard.id +
    ' class="billboard-post"><div class="rev-item editable"><h5 contentEditable="false">'
     + billboard.name + '</h5><h6 class="editable" contentEditable="false">' + billboard.title +'</h6><p class="editable" contentEditable="false">'
     + billboard.subtext01 + '</p><p class="editable" contentEditable="false">' + billboard.subtext02 +
    '</p><p class="editable" contentEditable="false">color scheme: ' + billboard.color_scheme +
    '</p><p class="editable" contentEditable="false">animation option: ' + billboard.anim_option +
    '</p></div><div class="rev-button"><button class="edit-rev icon-pencil"></button><button href="" class="delete-rev icon-bin"></button><div class="save-rev hidden"><p class="icon-droplet"></p></div></article>'
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
    $(".user-messages").html("<strong>Error! Registration fail!</strong>");
    return;
  }
  console.log(JSON.stringify(data, null, 4));
    $('.user-messages').text('Welcome,  new user #' + data.user.id);
};



// login callback
var loginCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Login fail!</strong>");
    return;
  }

  // assign current_user.id and session.token
  session.userId = data.user.id;
  session.token = data.user.token;
  $('.messages-container h6').text('Welcome, user #' + session.userId);

  // show in console for testing purposes
  console.log(session.userId);
  console.log(session.token);

  // display current_user status
  data.user.current_user = true;

  // list current user billboards
  api.listUserBillboards(session.token, listUserBillboardsCb);


  // console.log(JSON.stringify(data, null, 4));

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
  $('.hero-intro').fadeOut(200);
  // show user rev list
  revList.delay(600).fadeIn().removeClass('hidden');

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

};
// end of createBillboard submit handler






// updateFavBike callback
var editBillboardCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Rev update fail!</strong>");
    return;
  }
  // console.log test
  console.log('updated rev is is ' + JSON.stringify(data));

  var updatedBillboard = data.billboard;

  $(".user-messages").html("<strong>Rev updated!</strong>");

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
  // var billboard = data.billboard;

  console.log('billboard is: ' + JSON.stringify(data));

  // $('input.edit-form').each(function(){
  //       var input = $(this);
  //       if ($(input).data().bind) {
  //           console.log($(input).data().bind);
  //       }
  //   });

  // set data attribute of form

  // jQuery.data( $('.edit-name'), 'value', 86 );
  billboard.name = data.billboard.name;
  billboard.title = data.billboard.title;
  billboard.subtext01 = billboard.subtext01;
  billboard.subtext02 = data.billboard.subtext02;
  billboard.color_scheme = data.billboard.color_scheme;
  billboard.anim_option = data.billboard.anim_option;

  editSideMenu.fadeIn(300);
  $('#edit-side').attr('data-id', data.billboard.id);


  $('.edit-name').val(billboard.name);
  $('.edit-title').val(billboard.title);
  $('.edit-subtext01').val(billboard.subtext02);
  $('.edit-subtext02').val(billboard.subtext02);
  $('.edit-color').val(billboard.color_scheme);
  $('.edit-anim').val(billboard.anim_option);


  console.log('name is now: ' + $('.edit-name').val());

  // jQuery.data( div, "blah", 86 )

};



// deleteBikes callback
var deleteBillboardCb = function (error, data) {
  if (error) {
    console.error(error);
    $(".user-messages").html("<strong>Error! Rev deletion fail!</strong>");
    return;
  }

  // find div by data-id, delete that div in user-rev then in current billboard view

  $(".user-messages").html("<strong>Rev deletion success!</strong>");

};




