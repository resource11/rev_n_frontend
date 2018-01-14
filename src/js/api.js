
// api HTTP requests/responses
const api = {
  billboardWatcher: null,
  url: 'https://stormy-oasis-7808.herokuapp.com/',

  ajax(config, cb) {
    $.ajax(config).done((data, textStatus, jqxhr) => {
      cb(null, data);
    }).fail((jqxhr, status, error) => {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: `${this.url}/register`,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: `${this.url}/login`,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  listAllBillboards(callback) {
    this.ajax({
      method: 'GET',
      url: `${this.url }/billboards`,
      dataType: 'json'
      }, callback);
  },

  //Authenticated api actions
  logout(id, token, callback) {
    this.ajax({
      method: 'POST',
      url: `${this.url}/logout`,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(id),
      dataType: 'json'
    }, callback);
  },

  createBillboard(token, data, callback) {
    this.ajax({
      method: 'POST',
      url: `${this.url}/billboards`,
      headers: {
        Authorization: `Token token=${token}`
      },
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },


  showBillboard(id, token, callback) {
    this.ajax({
      method: 'GET',
      url: `${this.url}/billboards/${id}`,
      headers: {
        Authorization: `Token token=${token}`
      },
      dataType: 'json'
    }, callback);
  },

  listUserBillboards(token, callback) {
    this.ajax({
      method: 'GET',
      url: `${this.url}/billboards`,
      headers: {
        Authorization: `Token token=${token}`
      },
      dataType: 'json'
      }, callback);
  },

  updateBillboard(id, token, data, callback) {
    this.ajax({
      method: 'PATCH',
      url: `${this.url}/billboards/${id}`,
      headers: {
        Authorization: `Token token=${token}`
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },

  deleteBillboard(id, token, callback) {
    this.ajax({
      method: 'DELETE',
      url: `${this.url}/billboards/${id}`,
      headers: {
        Authorization: `Token token=${token}`
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(id),
      dataType: 'json'
    }, callback);
  },


  watchBillboard(id, token) {
    const url = `${this.url}/billboards/${id}/watch`;
    const auth = {
      Authorization: `Token token=${token}`
    };
    this.billboardWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.billboardWatcher;
  }

};
