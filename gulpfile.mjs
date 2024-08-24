import gulp from 'gulp';
import concat from 'gulp-concat';
import prefix from 'gulp-autoprefixer';
import gulpSass from 'gulp-sass';
import * as sass from 'sass'; // Corrected import statement
import pug from 'gulp-pug';
import livereload from 'gulp-livereload';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import notify from 'gulp-notify';
import zip from 'gulp-zip';

const sassCompiler = gulpSass(sass); // Initialize gulp-sass with the Dart Sass compiler

import startServer from './server.js'; // Import the startServer function from server.js

// HTML Task
gulp.task('html', function () {
    return gulp.src('my-project/index.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('dist'))
        .pipe(notify('Html Done'))
        .pipe(livereload());
});

// CSS Task
// gulp.task('css', function () {
//     return gulp.src('my-project/*.css')
//         .pipe(sourcemaps.init())
//         .pipe(prefix({
//             overrideBrowserslist: ['last 3 versions'],
//             cascade: false
//         }))
//         .pipe(concat('main.css'))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(notify('CSS Done'))
//         .pipe(livereload());
// });

// Compressed Sass Task
// gulp.task('compCSS', function () {
//     return gulp.src('my-project/css/*.css')
//         .pipe(sourcemaps.init())
//         .pipe(sassCompiler({ outputStyle: 'compressed' }).on('error', sassCompiler.logError))
//         .pipe(prefix({
//             overrideBrowserslist: ['last 5 versions'],
//             cascade: false
//         }))
//         .pipe(concat('main-comp.css'))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(notify('Compere Done'))
//         .pipe(livereload());
// });

// Sass Task
gulp.task('sass', function () {
    return gulp.src('my-project/css/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sassCompiler().on('error', sassCompiler.logError)) // Use sassCompiler instead of sass()
        .pipe(prefix({
            overrideBrowserslist: ['last 3 versions'],
            cascade: false
        }))
        .pipe(concat('sass.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify('Css from Sass Done'))
        .pipe(livereload());
});

// Compressed Sass Task
gulp.task('compSass', function () {
    return gulp.src('my-project/css/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sassCompiler({ outputStyle: 'compressed' }).on('error', sassCompiler.logError))
        .pipe(prefix({
            overrideBrowserslist: ['last 5 versions'],
            cascade: false
        }))
        .pipe(concat('sass-comp.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify('Compressed Css from Sass Done'))
        .pipe(livereload());
});

// Run both Sass tasks in parallel
// gulp.task('allSass', gulp.parallel('sass', 'compSass'));
// gulp.task('allCss', gulp.parallel('css', 'compCss'));

// Scripts Task
gulp.task('js', function () {
    return gulp.src('my-project/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify('Scripts Done'))
        .pipe(livereload());
});

// zip all files from dist
gulp.task('compress', function () {
    return gulp.src('dist/**/*.*')
        .pipe(zip('project.zip'))
        .pipe(gulp.dest('.'))
        .pipe(notify('The Project Has been compressed'))
        .pipe(livereload());
})

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('my-project/index.pug', gulp.series('html')); // Corrected watch syntax
    gulp.watch('my-project/pug/*.pug', gulp.series('html')); // Corrected watch syntax
    gulp.watch('my-project/css/**/*.scss', gulp.series('sass'));
    gulp.watch('my-project/css/**/*.scss', gulp.series('compSass'));
    gulp.watch('my-project/js/*.js', gulp.series('js'));
    gulp.watch('dist/**/*.*', gulp.series('compress'));
});

gulp.task('default', gulp.series(startServer, 'watch'))