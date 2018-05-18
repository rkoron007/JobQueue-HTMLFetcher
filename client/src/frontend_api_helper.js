require('es6-promise').polyfill();
require('isomorphic-fetch');

export const createJobAndAddQueue = (data, callback) => {
  let url = (data['url']);
  fetch(`/jobs/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
