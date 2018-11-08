/* global del */
var gulp = require("gulp");
var pug = require("gulp-pug");
var del = require("del");

gulp.task("clean", function () {
    del(["build/www"]);
});

gulp.task("html", function () {
    return gulp.src("src/views/{index,404,selectseat,genmap,register,selectpeople}.pug")
        .pipe(pug())
        .pipe(gulp.dest("build/www"));
});

gulp.task("static", function () {
    return gulp.src("public/**/*")
        .pipe(gulp.dest("build/www/"));
});

gulp.task("default", ["clean", "html", "static"]);