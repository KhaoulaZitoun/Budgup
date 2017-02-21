var gulp = require("gulp");
var codacy = require("gulp-codacy");
var gulpIf = require("gulp-if");
var sequence = require("gulp-sequence");
var sonar = require("gulp-sonar");
var util = require('util');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var path = require('path');
var coveralls = require('gulp-coveralls');

// Coveralls

/*gulp.task('coveralls', ['test'], function () {
    if (!process.env.CI) {
        return;
    }

    return gulp.src('test/coverage/**//*lcov.info')
        .pipe(coveralls());
});
*/
//Codacy

gulp.task('codacy', function sendToCodacy() {
    return gulp
        .src(['test/coverage/coverage.lcov'])
        .pipe(gulpIf(!!process.env.TRAVIS, codacy({
            token: '41e25d0a34ec49e08b8815c4490573fe'
        })))
        ;
});


// Sonar

gulp.task('sonar', function () {
    var options = {
        sonar: {
            host: {
                url: 'http://localhost:9000'
            },
            jdbc: {
                url: 'jdbc:mysql://localhost:3306/sonar',
                username: 'sonar',
                password: 'sonar'
            },
            projectKey: 'sonar:budgup:0.0.1',
            projectName: 'Budgup',
            projectVersion: '0.0.1',
            // comma-delimited string of source directories
            sources: './client/public, ./client/views, ./server/controllers, ./server/models, ./test',
            language: 'js',
            sourceEncoding: 'UTF-8',
            javascript: {
                lcov: {
                    reportPath: 'test/sonar_report/lcov.info'
                }
            },
            exec: {
                // All these properties will be send to the child_process.exec method (see: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback )
                // Increase the amount of data allowed on stdout or stderr (if this value is exceeded then the child process is killed, and the gulp-sonar will fail).
                maxBuffer : 1024*1024
            }
        }
    };

    // gulp source doesn't matter, all files are referenced in options object above
    return gulp.src('thisFileDoesNotExist.js', { read: false })
        .pipe(sonar(options))
        .on('error', util.log);
});


//  Tests

gulp.task('pre-test', function () {
    return gulp.src(['lib/**/*.js'])
    // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
    return gulp.src(['test/*.js'])
        .pipe(mocha())
        // Creating the reports after tests ran
        .pipe(istanbul.writeReports())
        // Enforce a coverage of at least 90%
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('default', sequence(['pre-test','codacy'/*, 'coveralls'*/,'test']));