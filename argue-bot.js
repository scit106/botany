// To run this file, type 'node argue-bot'

var _ = require('lodash');
var fs = require('fs');
var markov = require('markov');

// Get the Twitter client to communicate with Twitter's API
var client = require('./twitter-setup').client;

// Markov fun!
var m = markov();
var s = fs.createReadStream(__dirname + '/speeches.txt');

client.get('search/tweets', {q: 'trump'}, function(error, tweets, response) {
	var filteredTweets = tweets.statuses.map(function(tweet) {
		return {
			tweetText: tweet.text,
			tweetId: tweet.id
		};
	});

	// This thing-a-ma-bober retweets positive tweets
	_.forEach(filteredTweets, function(originalTweet) {
		m.seed(s, function () {
			// console.log(sentimentalTweet);

			var response = m.respond(originalTweet.tweetText);
			console.log(originalTweet.tweetText);
			console.log(response);
		});

		// client.post('statuses/retweet/' + sentimentalTweet.id, function(error, tweet, response) {
		//   if (!error) {
		//     console.log(tweet);
		//   }
		// });
	});

});
