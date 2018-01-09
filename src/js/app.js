'use strict';

var user = {
  id: null,
  token: null
};

var billboard = {
  id: null,
  name: null,
  title: null,
  subtext01: null,
  subtext02: null,
  color_scheme: null,
  anim_option: null
};

var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';


//$(document).ready(...
$(function() {


  // menu transition click handlers

  // animate on register/login containers
  $('.register-a').on('click', function() {
    registerMenu.fadeIn().removeClass('hidden');
    $(".register-messages").fadeIn(300).html(" ");
  });

  $('.login-a').on('click', function() {
    loginMenu.fadeIn().removeClass('hidden');
    $(".login-messages").fadeIn(300).html(" ");
  });

  $('.register-a2').on('click', function() {
    loginMenu.slideUp(300);
    registerMenu.delay(600).slideDown(300).removeClass('hidden');
    $(".register-messages").fadeIn(300).html(" ");
  });

  $('.login-a2').on('click', function() {
    registerMenu.slideUp(300);
    loginMenu.delay(600).slideDown(300).removeClass('hidden');
    $(".login-messages").fadeIn(300).html(" ");
  });


  // click hander for closing windows
  closeMe.on('click', function(){
    $(this).closest('section').fadeOut();
  });

    // click hander for closing windows
  closeMeCreate.on('click', function(){
    $(this).closest('section').fadeOut();
    addRev.fadeIn(300);
  });

  // click handler for showing create menu
  // addRev.on('click', function() {
  //   createSideMenu.fadeIn().removeClass('hidden');
  //   addRev.fadeOut(300);
  // });

  // click handler for showing create menu
  $('#create-rev').on('click', function() {
    createSideMenu.fadeIn().removeClass('hidden');
    // addRev.fadeOut(300);
  });

  // click handler for showing show rev list menu
  $('#show-rev-list').on('click', function() {
    revList.fadeIn(300).removeClass('hidden');
    // addRev.fadeIn(300).removeClass('hidden');
    $(this).delay(600).fadeOut(300);
  });

  // register event handler
  registerSubmit.on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    $('.register-messages').delay(600).fadeIn(300).text('registering...');
    api.register(credentials, regCb);
    e.preventDefault();
  });


  // login event handler
  loginSubmit.on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    $(".login-messages").fadeIn(300).html(" - ");
    $('.login-messages').delay(600).fadeIn(300).text('logging in...');
    api.login(credentials, loginCb);
    e.preventDefault();

  });

  // // logout event handler
  // $('#logout').on('submit', function(e) {
  //   var credentials = wrap('credentials', form2object(this));

  //   api.login(credentials, logoutCb);
  //   e.preventDefault();
  // });



  // handlers requiring authentication

  // create new rev handler
  // always use jQuery vs a var to bind an event for this particular call
  createSubmit.on('submit', function(e) {
    var data = wrap('billboard', form2object(this));

    api.createBillboard(session.token, data, createBillboardCb);
    // api.createBillboard(data, createBillboardCb);
    e.preventDefault();
    createSideMenu.slideUp(300);
    addRev.fadeIn(300);
  });


  // make the text on a user rev editable
  $('#user-revs').on('click', '.edit-rev', function(){

    var id = $(this).closest('.billboard-post').attr('data-id');

    var editable = $(this).closest('.billboard-post').find('.editable');

    editable.attr('contentEditable', "true");


    // api.showBillboard(id, session.token, loadBillboardCb);

  });


  // save edited user rev handler
  $('#user-revs').on('click', '.save-rev', function(){

    var id = $(this).closest('.billboard-post').attr('data-id');

    var editable = $(this).closest('.billboard-post').find('.editable');

    editable.attr('contentEditable', "false");

    // somehow, h5 and h6 are considered the first and second children of the div
    // we start at nth-child(3) to grab the correct data
    var name = $(this).closest('.billboard-post').find('h5').html();
    var title = $(this).closest('.billboard-post').find('h6').html();
    var subtext01 = $(this).closest('.billboard-post').find('p:nth-child(3)').html();
    var subtext02 = $(this).closest('.billboard-post').find('p:nth-child(4)').html();
    var color_scheme = $(this).closest('.billboard-post').find('p:nth-child(5)').html();
    var anim_option = $(this).closest('.billboard-post').find('p:nth-child(6)').html();

    var data = {
      billboard: {
      // id: id,
      name: name,
      title: title,
      subtext01: subtext01,
      subtext02: subtext02,
      color_scheme: color_scheme,
      anim_option: anim_option
      }
    };


    api.editBillboard(id, session.token, data, editBillboardCb);
    api.showBillboard(id, session.token, loadBillboardCb);


  });



  // load current rev into view
    $('#user-revs').on('click', '.view-rev', function(){

    var id = $(this).closest('.billboard-post').attr('data-id');

    api.showBillboard(id, session.token, loadBillboardCb);

  });



  // delete bike event handler
  $('#user-revs').on('click', '.delete-rev', function() {

    var id = $(this).closest('.billboard-post').attr('data-id');

    // change bg color as a test
    $(this).closest('.billboard-post').css({'background-color': 'purple', 'font-weight': 'bold'});

    // do an ajax DELETE request
    api.deleteBillboard(id, session.token, deleteBillboardCb);

    // update the bike list in the viewport
    $(this).closest('.billboard-post').remove();


  });





});
// end doc ready function
