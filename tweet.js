// To run this file, type 'node tweet.js'

var dotenv = require('dotenv');
var Twitter = require('twitter');
var sentiment = require('sentiment');
var _ = require('lodash');

dotenv.config();

var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var sentimentThreshold = 2;

client.get('search/tweets', {q: 'puppies'}, function(error, tweets, response) {
	var sentimentalTweets = tweets.statuses.map(function(tweet) {
		var sentimentObject = sentiment(tweet.text);

		return {
			score: sentimentObject.score,
			tweetText: tweet.text,
			tweetId: tweet.id
		};
	});

	var positiveTweets = _.remove(sentimentalTweets, function(sentimentalTweet) {
		return sentimentalTweet.score > sentimentThreshold;
	});

	console.log(positiveTweets);

	// This thing-a-ma-bober retweets tweets
	_.forEach(positiveTweets, function(sentimentalTweet) {
		client.post('statuses/retweet/' + sentimentalTweet.id, function(error, tweet, response) {
		  if (!error) {
		    console.log(tweet);
		  }
		});
	});
});

// This twinky-dink composes tweets
// client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
//   if(error) throw error;
//   console.log(tweet);  // Tweet body.
//   console.log(response);  // Raw response object.
// });
