/* eslint-env node */
const gulp = require('gulp');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
// unit testing
const jasmine = require('gulp-jasmine');
// live reloading
const browserSync = require('browser-sync').create();
// css optimization
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
// js optimization
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
// image optimization
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

/**
 * @function watchTestFiles
 * @description watch unit testing files -- spec and src js files
 */
function watchTestFiles() {
    browserSync.init({
        server: './',
    });

    gulp.watch(['js/app.js', 'jasmine/spec/feedreader.js']).on('change', browserSync.reload);
}

/**
 * @function watchFiles
 * @description watch css, js and html files
 */
function watchFiles() {
    browserSync.init({
        server: './',
    });
    // Update the "default" Task, calling .init on browserSync starts the server.
    gulp.watch('css/**/*.css', gulp.series('styles'));
    gulp.watch('js/**/*.js', gulp.series('scripts'));
    gulp.watch('index.html', gulp.series('copyHTML'));
    gulp.watch('./dist/index.html').on('change', browserSync.reload);
}

/**
 * @function copyFont
 * @description load font files and pipe to dest folder
 */
function copyFont(done) {
    gulp.src('fonts/*').pipe(gulp.dest('./dist/fonts'));
    done();
}

/**
 * @function copyHTML
 * @description load html files and pipe to dest folder
 */
function copyHTML(done) {
    gulp.src('./index.html').pipe(gulp.dest('./dist'));
    done();
}

/**
 * @function copyImages
 * @description load images, minified it for development production and pipe to dest folder
 */
function copyImages() {
    return gulp
        .src('img/*')
        .pipe(
            imagemin({
                progressive: true,
                use: [pngquant()],
            })
        )
        .pipe(gulp.dest('./dist/img'));
}

/**
 * @function distScripts
 * @description load js files and concat it for development and pipe to dest folder
 */
function scripts(done) {
    gulp.src(['js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(
            babel({
                presets: ['@babel/preset-env'],
            })
        )
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
    done();
}

/**
 * @function distScripts
 * @description load js files, concat, minified it for production and pipe to dest folder
 */
function distScripts(done) {
    gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(
            babel({
                presets: ['@babel/preset-env'],
            })
        )
        .pipe(concat('app.js'))
        .pipe(terser())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
    done();
}

/**
 * @function styles
 * @description load css files, add vendor prefixes for development and pipe to dest folder
 */
function styles() {
    let processors = [
        autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
        })
    ];
    return gulp
        .src('css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream()); // Update the "styles" Function
}

/**
 * @function distStyles
 * @description load css files, concat and minified it for production and pipe to dest folder
 */
function distStyles() {
    let processors = [
        autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
        }),
        cssnano
    ];
    return gulp
        .src('css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream()); // Update the "styles" Function
}

/**
 * @function tests
 * @description unit testing
 */
function tests() {
    var filesForTest = ['js/app.js', 'jasmine/spec/feedreader.js'];
    return gulp
        .src(filesForTest)
        .pipe(watch(filesForTest))
        .pipe(jasmine())
}

/**
 * @function copyTests
 * @description copy unit test files and pipe to dest folder
 */

function copyTests(done) {
    gulp.src(['jasmine/**/*.js'])
        .pipe(gulp.dest('dist/jasmine'));
    done();
}

exports.styles = styles;
exports.tests = tests;
exports.copyFont = copyFont;
exports.copyTests = copyTests;
exports.copyHTML = copyHTML;
exports.copyImages = copyImages;
exports.scripts = scripts;
exports.distScripts = distScripts;
exports.distStyles = distStyles;

// For development
exports.default = gulp.series(copyFont, copyHTML, copyImages, styles, scripts, copyTests, watchFiles);
// for unit testing
exports.unitTest = gulp.series(watchTestFiles);
// For production
exports.dist = gulp.series(copyFont, copyHTML, copyImages, distStyles, copyTests, distScripts);
