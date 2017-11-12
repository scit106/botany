// Get the Twitter client to communicate with Twitter's API
var client = require('./twitter-setup').client;

var twitterMessage = 'I love Twitter'; // What we want to tweet

client.post('statuses/update', {status: twitterMessage},  function(error, tweet, response) {
	if(error) throw error;
	console.log(tweet);  // Tweet body.
	console.log(response);  // Raw response object.
});
