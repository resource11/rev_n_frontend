'use strict';

var user = {
  id: null,
  token: null
};


//$(document).ready(...
$(function() {


  // menu transition click handlers

  // animate on register/login containers
  $('.register-a').on('click', function() {
    registerMenu.fadeIn().removeClass('hidden');
  });

  $('.login-a').on('click', function() {
    loginMenu.fadeIn().removeClass('hidden');
  });

  $('.register-a2').on('click', function() {
    loginMenu.slideUp(300);
    registerMenu.delay(600).slideDown(300).removeClass('hidden');
  });

  $('.login-a2').on('click', function() {
    registerMenu.slideUp(300);
    loginMenu.delay(600).slideDown(300).removeClass('hidden');
  });


  // click hander for closing windows
  closeMe.on('click', function(){
    $(this).closest('section').fadeOut();
  });


 //  // create-new (poll) button click handler
 //  $('.user-messages').on('click', '.create-new', function() {

 //    $('#poll-creation-container').fadeIn().removeClass('hidden');

 //  });

 //  // or

 // $('#create-edit-del-button-dashboard').on('click', '.create-new', function() {
 //    console.log('clicked');
 //    $('#poll-creation-container').fadeIn();
 //  });



 //  // edit poll button click handler
 //  $('#create-edit-del-button-dashboard').on('click', '#edit', function() {
 //    console.log('clicked');
 //    $('#poll-edit-container').fadeIn().removeClass('hidden');
 //  });




  // register event handler
  registerSubmit.on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    api.register(credentials, regCb);
    e.preventDefault();
     // hide register container
    registerMenu.slideUp();
  });

  // login event handler
  loginSubmit.on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    console.log(credentials);
    api.login(credentials, loginCb);
    e.preventDefault();
     // hide login container
    loginMenu.slideUp();
    revList.fadeIn();
  });

  // // logout event handler
  // $('#logout').on('submit', function(e) {
  //   var credentials = wrap('credentials', form2object(this));

  //   api.login(credentials, logoutCb);
  //   e.preventDefault();
  // });



  // handlers requiring authentication

  // create new rev handler
  createSideMenu.on('submit', function(e) {
    var data = wrap('billboard', form2object(this));

    api.createBillboard(session.token, data, createBillboardCb);
    // api.createBillboard(data, createBillboardCb);
    e.preventDefault();
    createSideMenu.slideUp(300);
  });


  // open the edit form and send data-id attribute over
  userBillboardsList.on('click', '.edit-rev', function(){
    console.log(userBillboardsList);
    // open the edit form, find closest billboard data-id attr
    // set the edit-side form data-id to this data-id
  });


  // edit billboard handler
  editSide.on('submit', function(e) {
    var data = wrap('billboard', form2object(this));
    console.log("clicked");
    // test to see if the data was wrapped
    console.log(data.billboard);

    // grab the data-id attr from the form data attr
    var id = data.billboard.id;

    console.log('data-id is ' + id);
    // test to see if the session.token is recognized
    console.log(session.token);

    api.editBillboard(id, data, session.token, editBillboardCb);
    e.preventDefault();
  });



  // // delete bike event handler
  // $('#user-bikes').on('click', '.delete-bike', function() {

  //   console.log("clicked");

  //   // find the bike_id attached to the div
  //   var thisBikeId = $(this).closest('.bike-posts').attr('id');

  //   // confirmation the bike_id was captured
  //   console.log(thisBikeId);

  //   // change bg color as a test
  //   $(this).closest('.bike-posts').css({'background-color': 'purple', 'font-weight': 'bold'});

  //   // do an ajax DELETE request
  //   api.deleteBike(thisBikeId, session.token, deleteBikeCb);

  //   // update the bike list in the viewport
  //   $(this).closest('.bike-posts').remove();


  //   // find bike in all bikes listing and remove
  //   // still debugging this
  //   var thisBikeInAllBikes = $('#all-bikes').find('.bike-posts').attr(thisBikeId)
  //   thisBikeInAllBikes.remove();

  // });

 // create new bike handler
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
