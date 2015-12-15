'use strict';

var session = {
  userId: null,
  token: null,
};

var billboard = {
  id: null,
  name: null,
  title: null,
  subtext01: null,
  subtext02: null,
  color_scheme: null,
  anim_option: null,
  user_id: null
};


var registerSubmit = $('#register');
var loginSubmit = $('#login');
var registerMenu = $('.register-scheme');
var loginMenu = $('.login-scheme');
var createSideMenu = $('.create-scheme');
var editSide = $('.edit-scheme');
var userBillboardsList = $('#user-revs');
var closeMe = $('.close-me');

// var userBillboardsList = $('#user-revs');

// var removeBillboard = function(data, location1, location2) {
//   location1.find.location2.remove();
// };


// var listBillboardHTML = function (billboard) {
//   allBillboardsList.append(
//     '<article data-id=' + billboard.id +
//     ' class="billboard-post"><div class="rev-item"><h5>'
//      + billboard.name + '</h5><p>' + billboard.title +'</p><p>'
//      + billboard.subtext01 + '</p><p>' + billboard.subtext02 +
//     '</p></div><div class="rev-button"><button class="edit-rev">edit</button><button class="delete-rev">delete</button></div></article>'
//     );
// };


var listUserBillboardHTML = function (billboard) {
  userBillboardsList.prepend(
    '<article data-id=' + billboard.id +
    ' class="billboard-post"><div class="rev-item"><h5>'
     + billboard.name + '</h5><h6>' + billboard.title +'</h6><p>'
     + billboard.subtext01 + '</p><p>' + billboard.subtext02 +
    '</p><p>color scheme: ' + billboard.color_scheme +
    '</p><p>animation option: ' + billboard.anim_option +
    '</p></div><div class="rev-button"><button class="edit-rev icon-pencil"></button><button href="" class="delete-rev icon-bin"></button></article>'
    );
};


// define jQuery search for user rev list
var revList = $(".list-scheme");

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
  $('.user-messages').text('Welcome, user #' + session.userId);

  // show in console for testing purposes
  console.log(session.userId);
  console.log(session.token);

  // display current_user status
  data.user.current_user = true;



  // list current user billboards
  api.listUserBillboards(session.token, listUserBillboardsCb);


  console.log(JSON.stringify(data, null, 4));

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

  console.log(data)

  var billboard = data.billboard;
  listBillboardHTML(billboard);
  // listUserBillboardHTML(billboard);
  $('.user-messages').text('New rev ' + data.billboard.id + ' created by user ' + data.user.id);

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
  console.log('updated rev is is ' + data);

  var updatedBillboard = data.billboard;

  console.log('favorite status is' + data.billboard.id);

  $(".user-messages").html("<strong>Rev updated!</strong>");

};
// end of editBillboard submit handler



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




