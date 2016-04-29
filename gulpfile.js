var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin');

var paths = {
    pub: {
        js: 'public/scripts',
        css: 'public/css',
        img: 'public/img'
    },
    dist: {
        js: 'dist/scripts',
        css: 'dist/css',
        img: 'dist/img'
    }
};

gulp.task('less', function(){
    gulp.src('public/css/**/*.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest(paths.pub.css));
});

gulp.task('js', function(){
    gulp.src(paths.pub.js+'/inner/*.js')
        .pipe(uglify())
        // .pipe(concat('all.min.js'))
        .pipe(gulp.dest(paths.pub.js));
});

gulp.task('images', function() {
    return gulp.src(paths.pub.img+'/*')
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(paths.pub.img));
});

gulp.task('watch', function(){
    gulp.watch('public/css/**/*.less', ['less']);
    gulp.watch(paths.pub.js+'/inner/*.js', ['js']);
    gulp.watch(paths.pub.img+'/*', ['images']);
});

gulp.task('default', ['watch']);