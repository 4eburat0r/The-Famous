let project_folder = "dist";
let source_folder = "src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
    },
    src: {
        html: source_folder + "/*.html",
        css: source_folder + "/scss/main.scss",
        js: source_folder + "/js/main.js",
        img: source_folder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
    },
    clean: "./" + project_folder + "/"
};

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    scss = require('gulp-sass')(require('sass')),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'); 

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    });
}

function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: 'expanded'
            }).on('error', scss.logError)
        )
        .pipe(group_media())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.img, { encoding: false })
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js); 
    gulp.watch([path.watch.img], images);
}

let build = gulp.series(gulp.parallel(css, html, js, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.css = css;
exports.html = html;
exports.js = js; 
exports.images = images;
exports.build = build;
exports.watch = watch;
exports.default = watch;
