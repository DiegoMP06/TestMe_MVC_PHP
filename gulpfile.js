const {src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano');
const terser = require('gulp-terser-js');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const webp = require('gulp-webp');

const paths = {
    src: {
        scss: 'src/scss/**/*.scss',
        javascript: 'src/js/**/*.js',
        imagenes: 'src/img/**/*'
    },
    build: {
        css: 'public/build/css',
        js: 'public/build/js',
        img: 'public/build/img'
    }
}

function css() {
    const {src: {scss}, build:{css}} = paths;
    return src(scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(css));
}


function javascript() {
    const {src: {javascript}, build: {js}} = paths;
    return src(javascript)
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(js));
}

function imagenes() {
    const {src: {imagenes},build: {img}} = paths;
    return src(imagenes)
        .pipe(cache(imagemin({ optimizationLevel: 3 })))
        .pipe(dest(img))
}

function versionWebp() {
    const {src: {imagenes},build: {img}} = paths;
    return src(imagenes)
        .pipe(webp())
        .pipe(dest(img))
}


function watchArchivos() {
    const {src} = paths;

    watch(src.scss, css);
    watch(src.javascript, javascript);
    watch(src.imagenes, imagenes);
    watch(src.imagenes, versionWebp);
}

exports.default = parallel(css, javascript, imagenes, versionWebp, watchArchivos);
exports.build = parallel(css, javascript, imagenes, versionWebp); 