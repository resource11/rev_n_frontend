'use strict';

// api HTTP requests/responses

var api = {
  billboardWatcher: null,
  // url: 'https://mighty-lowlands-8515.herokuapp.com',
  // url: 'https://stormy-oasis-7808.herokuapp.com/',
  url: 'http://localhost:3000/',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.url + '/register',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  listAllBillboards: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/billboards',
      dataType: 'json'
      }, callback);
  },


  //Authenticated api actions

  logout: function(id, token, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/logout',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(id),
      dataType: 'json'
    }, callback);
  },

  createBillboard: function(token, data, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/billboards',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },


  showBillboard: function(id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/billboards/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  listUserBillboards: function(token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/billboards',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
      }, callback);
  },

  editBillboard: function(id, token, data, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/billboards/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },

  deleteBillboard: function(id, token, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/billboards/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(id),
      dataType: 'json'
    }, callback);
  },


  watchBillboard: function(id, token) {
    var url = this.url + '/billboards/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.billboardWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.billboardWatcher;
  }

};

