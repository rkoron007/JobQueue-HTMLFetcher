require('es6-promise').polyfill();
require('isomorphic-fetch');

export const createJobAndAddQueue = (data, callback) => {
  // sets a default url just in case one wasn't entered
  let url;
  if (data['url']){
    url = (data['url']);
  } else {
    url = "www.facebook.com";
  }

  fetch(`/jobs/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // same-origin policy can break some stylesheets
    // but security > edgecases
    credentials: 'same-origin',
  })
  	.then((response) => {
  		if (response.status >= 400) {
  			throw new Error("Bad response from server");
  		}
  		return response.json();
  	})
  	.then((response) => {
    if (callback) callback(response);
  	});
};

export const getJobStatus = (id, callback) => {
  // set a default job to return just in case one
  // wasnt sent to us
  if (!id){
    id = 1;
  }
  fetch(`/jobs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'same-origin',
    })
  .then(response => {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(status => {
    if (callback) callback(status);
  });
};
