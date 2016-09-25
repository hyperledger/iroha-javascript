var gulp = require('gulp');
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");

gulp.task("browserify-iroha", function(){
    browserify({
        entries: ["src/index.js"]
    })
    .bundle()
    .pipe(source("iroha.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("dist/"));
});
