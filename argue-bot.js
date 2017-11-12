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

	_.forEach(filteredTweets, function(originalTweet) {
		m.seed(s, function () {
			// console.log(sentimentalTweet);

			var markovResponse = m.respond(originalTweet.tweetText);
			console.log(originalTweet.tweetText);
			var tweetResponse = ''; // String that will be sent back
			var tweetSize = 140; // character max

			_.forEach(markovResponse, function(bigram) {
				var nextTweet = tweetResponse + ' ' + bigram;
				if (nextTweet.length > tweetSize) {
					return false;
				} else {
					tweetResponse = nextTweet;
				}
			});
			console.log(tweetResponse);
			console.log("=======");
		});

		// client.post('statuses/retweet/' + sentimentalTweet.id, function(error, tweet, response) {
		//   if (!error) {
		//     console.log(tweet);
		//   }
		// });
	});

});
