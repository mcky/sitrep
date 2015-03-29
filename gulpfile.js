var gulp = require('gulp')
    , util = require('gulp-util')
    , rename = require('gulp-rename')
    , browserify = require('gulp-browserify')
    , envify = require('envify/custom')
    , uglify = require('gulp-uglifyjs')
    , gulpif = require('gulp-if')
    , jshint = require('gulp-jshint')
    , jscs = require('gulp-jscs')
    , notify = require('gulp-notify')
    , react = require('gulp-react')
    , reactify = require('reactify')
    , browserSync = require('browser-sync')
    , sass = require('gulp-sass')
    , reload = browserSync.reload

var sassPath = './app/src/scss/'
    , production = process.env.NODE_ENV === 'production'

gulp.task('sass', function() {
    return gulp.src(sassPath+'style.scss')
        .pipe(sass({
            errLogToConsole: true
            ,includePaths: require('node-neat').includePaths
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./app/public/css/'))
        .pipe(reload({stream: true}))
})

gulp.task('serve', ['scripts', 'sass'], function() {
    if (util.env.sync) {
        browserSync({
            proxy: 'rls.dev'
        })
    }

    gulp.watch(sassPath+'**/*.scss', ['sass'])
    gulp.watch('./app/views/**/*.html').on('change', reload)
})


// // NODE_ENV=production gulp for smaller builds
// gulp.task('scripts', ['jshint', 'jscs'], function() {
gulp.task('scripts', function() {
// 	gulp.src('./app/client.jsx')
//     	.pipe(react())
//         .pipe(browserify({
//         	transform: ['reactify']
//         }))
//         // .pipe(browserify())
//         .pipe(rename('bundle.js'))
//         .pipe(gulpif(production, uglify()))
//         .pipe(reload({stream: true}))
//         .pipe(gulp.dest('./app/public/js/'))
//         .on("error", notify.onError("Error: <%= error.message %>"));
})

gulp.task('default', ['serve'])

gulp.task('build', ['sass'])
