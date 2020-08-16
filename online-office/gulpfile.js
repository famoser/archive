//MIT License, made by Florian Moser
//used together with bower, in a symfony project
'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var all = require('gulp-all');
var del = require("del");
var cleanCss = require("gulp-clean-css");
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var bower = require("gulp-bower");
var sass = require("gulp-sass");
var watch = require('gulp-watch');
var batchbatch = require('gulp-batch');
var browserSync = require('browser-sync');

//the URL where the development webpage is opened (for watch functionality)
var watch_url = "http://localhost:8000/";

var path = {
    bower_path: "web/assets/vendor/",
    publish_path: "web/dist/"
};

var deploy_paths = {
    fonts: path.publish_path + "fonts/",
    js: path.publish_path + "js/",
    css: path.publish_path + "css/"
};

var deploy_file_name = {
    js: "scripts.js",
    css: "styles.css",
    js_min: "scripts.min.js",
    css_min: "styles.min.css"
};


var config = {
    js_src_dirs: [
        path.bower_path + "jquery/dist/jquery.js",
        path.bower_path + "jquery-stupid-table/stupidtable.js",
        path.bower_path + "bootstrap/dist/js/bootstrap.js",
        path.bower_path + "AdminLTE/dist/js/app.js"
    ],
    js_bundle_name: "_bundle.js",
    js_target_dir: deploy_paths.js + "pre/",

    css_src_dirs: [
        path.bower_path + "bootstrap/dist/css/bootstrap.css",
        path.bower_path + "components-font-awesome/css/font-awesome.css",
        path.bower_path + "AdminLTE/dist/css/AdminLTE.css",
        path.bower_path + "AdminLTE/dist/css/skins/skin-blue.css"
    ],
    css_bundle_name: "_bundle.css",
    css_target_dir: deploy_paths.css + "pre/",

    font_src_dirs: [
        path.bower_path + "bootstrap/dist/fonts/**/*",
        path.bower_path + "components-font-awesome/fonts/**/*"
    ],
    font_target_dir: deploy_paths.fonts + "pre/",

    project_sass_src_dirs: [
        "web/assets/sass/*.sass"
    ],
    project_css_bundle_name: "_project_bundle.css",

    project_js_src_dirs: [
        "web/assets/js/**/*.js"
    ],
    project_js_bundle_name: "_project_bundle.js",

    project_font_src_dirs: [
        "web/assets/fonts/**/*"
    ]
};


//Create javascript bundle
gulp.task("javascript-bundle", ["bower-restore"], function () {
    return gulp.src(config.js_src_dirs)
        .pipe(concat(config.js_bundle_name))
        .pipe(gulp.dest(config.js_target_dir));
});

//Create css bundle
gulp.task("css-bundle", ["bower-restore"], function () {
    return gulp.src(config.css_src_dirs)
        .pipe(concat(config.css_bundle_name))
        .pipe(gulp.dest(config.css_target_dir));
});

//Create font bundle
gulp.task("font-bundle", ["bower-restore"], function () {
    return gulp.src(config.font_src_dirs)
        .pipe(gulp.dest(config.font_target_dir))
});


//build js
gulp.task("compile-project-js", function () {
    return gulp.src(config.project_js_src_dirs)
        .pipe(concat(config.project_js_bundle_name))
        .pipe(gulp.dest(config.js_target_dir))
});

//build sass
gulp.task("compile-project-sass", function () {
    return gulp.src(config.project_sass_src_dirs)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gulp.dest(function (file) {
            return file.base;
        }))
        .pipe(concat(config.project_css_bundle_name))
        .pipe(gulp.dest(config.css_target_dir));
});

//Create font bundle
gulp.task("copy-project-fonts", function () {
    return gulp.src(config.project_font_src_dirs)
        .pipe(gulp.dest(config.font_target_dir))
});


// clean directory
gulp.task("clean", function () {
    del([path.publish_path]);
});

//restore bower packages
gulp.task("bower-restore", function () {
    return bower();
});

//javascript bundled & minified
gulp.task("javascript", ["javascript-bundle", "compile-project-js"], function () {
    return gulp.src([config.js_target_dir + config.js_bundle_name, config.js_target_dir + config.project_js_bundle_name])
        .pipe(sourcemaps.init())
        .pipe(concat(deploy_file_name.js))
        .pipe(gulp.dest(deploy_paths.js))
        .pipe(rename(deploy_file_name.js_min))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(deploy_paths.js))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//css bundled & minified
gulp.task("css", ["css-bundle", "compile-project-sass"], function () {
    return gulp.src([config.css_target_dir + config.css_bundle_name, config.css_target_dir + config.project_css_bundle_name])
        .pipe(concat(deploy_file_name.css))
        .pipe(gulp.dest(deploy_paths.css))
        .pipe(rename(deploy_file_name.css_min))
        .pipe(cleanCss())
        .pipe(gulp.dest(deploy_paths.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//font bundled
gulp.task("font", ["font-bundle", "copy-project-fonts"], function () {
    return gulp.src(config.font_target_dir + "**/*")
        .pipe(gulp.dest(deploy_paths.fonts))
});


//bring all together
gulp.task("default", ["javascript", "css", "font"], function () {

});


gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: watch_url
    });
});

//the watch task; waits for file changes and updates resources automatically
gulp.task('watch', ["browser-sync"], function () {
    watch(config.project_sass_src_dirs, function () {
        gulp.start('css');
    });
    watch(config.project_js_src_dirs, function () {
        gulp.start('javascript');
    });
});
