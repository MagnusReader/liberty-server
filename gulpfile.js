/* global del */
var gulp = require("gulp");
var pug = require("gulp-pug");
var replace = require("gulp-replace");
var del = require("del");

gulp.task("clean", function () {
    del(["build/www"]);
});

gulp.task("html", function () {
    return gulp.src("src/views/{index,bookroom,bookings,fines,profile,psychometric,genbarcode,books,about,login,feedback}.pug")
        .pipe(pug({
            pretty: true
        }))
        .pipe(replace(/"\//g, '"'))
        .pipe(gulp.dest("build/www"));
});









gulp.task("static", function () {
    return gulp.src("public/**/*")
        .pipe(gulp.dest("build/www/"));
});

// gulp.task("default", ["clean", "html", "static"]);