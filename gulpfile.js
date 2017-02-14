var gulp = require('gulp');
require('dotenv').config();

gulp.task('default', function() {
	console.log('This is the public key', process.env.TWITTER_PUBLIC_KEY);
	console.log('This is the secret key', process.env.TWITTER_SECRET_KEY);
});
