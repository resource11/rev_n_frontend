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

    // click hander for closing windows
  closeMeCreate.on('click', function(){
    $(this).closest('section').fadeOut();
    addRev.fadeIn(300);
  });

  // click handler for showing create menu
  addRev.on('click', function() {
    createSideMenu.fadeIn().removeClass('hidden');
    addRev.fadeOut(300);
  });



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
    revList.fadeIn(300).removeClass('hidden');
    messagesContainer.fadeIn(300).removeClass('hidden');
    addRev.fadeIn(300).removeClass('hidden');
    frontView.fadeIn(300).removeClass('hidden');
    revInfo.fadeIn(300).removeClass('hidden');
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

    console.log(JSON.stringify(data));

    api.createBillboard(session.token, data, createBillboardCb);
    // api.createBillboard(data, createBillboardCb);
    e.preventDefault();
    createSideMenu.slideUp(300);
    addRev.fadeIn(300);
  });


  // make the text on a user rev editable
  $('#user-revs').on('click', '.edit-rev', function(){

    var id = $(this).closest('.billboard-post').attr('data-id');
    console.log('id is ' + id);

    var editable = $(this).closest('.billboard-post').find('.editable');

    editable.attr('contentEditable', "true");


    // api.showBillboard(id, session.token, loadBillboardCb);

  });


  // save edited user rev handler
  $('#user-revs').on('click', '.save-rev', function(){

    var id = $(this).closest('.billboard-post').attr('data-id');
    console.log('id is still ' + id);

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

    console.log("clicked");
    // test to see if the data was wrapped
    console.log('data sending is: ' + JSON.stringify(data));



    api.editBillboard(id, session.token, data, editBillboardCb);


  });


  // load current rev into view
    $('#user-revs').on('click', '.view-rev', function(){

    var id = $(this).closest('.billboard-post').attr('data-id');
    console.log('id is ' + id);

    api.showBillboard(id, session.token, loadBillboardCb);

  });


  // edit billboard handler
  // data is not binding
  $('.edit-scheme').on('submit', function(e) {

    // var data = wrap('billboard', form2object(this));
    var id = billboard.id;

    var data = {
      billboard: {
      id: billboard.id,
      name: billboard.name,
      title: billboard.title,
      subtext01: billboard.subtext01,
      subtext02: billboard.subtext02,
      color_scheme: billboard.color_scheme,
      anim_option: billboard.anim_option
      }
    };

    console.log("clicked");
    // test to see if the data was wrapped
    console.log(JSON.strinigfy(data));

    // grab the data-id attr from the form data attr
  //   var id = editForm.attr('data-id');

  //   $('#edit-side').attr('data-pollid', billboard.id);

  // $('.edit-name').val(billboard.name);
  // $('.edit-title').val(billboard.title);
  // $('.edit-subtext01').val(billboard.subtext01);
  // $('.edit-subtext02').val(billboard.subtext02);
  // $('.edit-color').val(billboard.color_scheme);
  // $('.edit-anim').val(billboard.anim_option);

    console.log('data-id is ' + id);
    // test to see if the session.token is recognized
    console.log(session.token);

    api.editBillboard(id, session.token, data, editBillboardCb);
    e.preventDefault();
  });



  // delete bike event handler
  $('#user-revs').on('click', '.delete-rev', function() {

    console.log("clicked");

    var id = $(this).closest('.billboard-post').attr('data-id');
    console.log('id is ' + id);

    // change bg color as a test
    $(this).closest('.billboard-post').css({'background-color': 'purple', 'font-weight': 'bold'});

    // do an ajax DELETE request
    api.deleteBillboard(id, session.token, deleteBillboardCb);

    // update the bike list in the viewport
    $(this).closest('.billboard-post').remove();


  });





});
// end doc ready function
