const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
-- top level functions
 gulp.task - define tasks
 gulp.src - point to files to files to use
 gulp.dest - points to folder to out put
 gulp.watch - watch files and folder for changes
*/

// Logs message
gulp.task('message', function(){
	return console.log('Gulp is running');
});

gulp.task('copyHtml', function(){
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
});

// Optimize images
gulp.task('imageMin', () => 
	gulp.src('src/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/images'))
);

// minify js
gulp.task('minify', function(){
	gulp.src('src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

// Compile Sass
gulp.task('sass', function(){
	gulp.src('src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'));
});

/*gulp.task('default', function(){
	return console.log('Gulp is running default');
});*/

// Scripts
gulp.task('scripts', function(){
	gulp.src('src/js/*js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function(){
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/images/*', ['imageMin']);
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/*.html', ['copyHtml']);
});

gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts']);