var gulp = require('gulp');

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mocha = require('gulp-mocha');


gulp.task('default', [], function () {
  nodemon({ script: './src/server/bin/www', ext: 'html js', ignore: ['ignored.js'] })
    .on('restart', function () {
      console.log('restarted!');
    });
});