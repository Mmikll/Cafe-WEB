// dependencias
// SASS y Gulp
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//optimizacion de imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css( done ){
    //Indentify file / compile / save .css
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe( postcss( [ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))

    done()
}

function imagenes(){
    const options = {
        optimizationLeve: 3
    }
    return src('./src/img/**/*')
        .pipe( imagemin(options))
        .pipe( dest('./build/img'))
}

function versionWebp(){
    const options = {
        quality: 50
    }
    return src('./src/img/**/*.{jpg, png}')
        .pipe( webp(options))
        .pipe( dest('./build/img'))
}

function versionAvif(){
    const options = {
        quality: 50
    }
    return src('./src/img/**/*.{jpg, png}')
    .pipe( avif(options))
    .pipe( dest('./build/img'))
}

function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes)
}

exports.default = series(imagenes, versionWebp, versionAvif, css, dev)
exports.dev = dev;