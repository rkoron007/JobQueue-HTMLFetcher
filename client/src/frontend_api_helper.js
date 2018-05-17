require('es6-promise').polyfill();
require('isomorphic-fetch');

export const createJobAndAddQueue = (data, callback) => {
  console.log(data);
  fetch('/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  })
  	.then((response) => {
  		if (response.status >= 400) {
  			throw new Error("Bad response from server");
  		}
  		return response.json();
  	})
  	.then((response) => {
  		console.log(response);
  	});
};
