// This bot finds positive tweets and retweets them out

var sentiment = require('sentiment');
var _ = require('lodash');

// Get the Twitter client to communicate with Twitter's API
var client = require('./twitter-setup').client;

// Searches for tweets that mentions 'puppies'
client.get('search/tweets', {q: 'puppies'}, function(error, tweets, response) {
	var sentimentalTweets = tweets.statuses.map(function(tweet) {
		var sentimentObject = sentiment(tweet.text);

		return {
			score: sentimentObject.score,
			tweetText: tweet.text,
			tweetId: tweet.id
		};
	});

	// Set the minimum sentiment score
	var sentimentThreshold = 2;

	var positiveTweets = _.remove(sentimentalTweets, function(sentimentalTweet) {
		return sentimentalTweet.score > sentimentThreshold;
	});


	// This thing-a-ma-bober retweets positive tweets
	_.forEach(positiveTweets, function(sentimentalTweet) {
		client.post('statuses/retweet/' + sentimentalTweet.id, function(error, tweet, response) {
			if (!error) {
		    	console.log('Error:', tweet);
			}
		});
	});
});
