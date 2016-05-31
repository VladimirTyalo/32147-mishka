"use strict";

const gulp = require("gulp"),
  sass = require("gulp-sass"),
  plumber = require("gulp-plumber"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  server = require("browser-sync"),
  gulpGlob = require("gulp-sass-glob"), // to import whole directories of scss
  path = require("path"),
  svgmin = require('gulp-svgmin'),
  svgstore = require("gulp-svgstore");


gulp.task("style", function () {
  gulp.src("sass/style.scss")
      .pipe(plumber())
      .pipe(gulpGlob())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer({
          browsers: [
            "last 1 version",
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 2 Opera versions",
            "last 2 Edge versions"
          ]
        })
      ]))
      .pipe(gulp.dest("css"))
      .pipe(server.reload({stream: true}));
});

gulp.task("serve", ["style"], function () {
  server.init({
    server: ".",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

// run only once to make optimize svg and make svg sprite
gulp.task('svgmin', function () {
  return gulp.src('./img/svg-icons/*.svg')
             .pipe(svgmin(function getOptions(file) {
               var prefix = path.basename(file.relative, path.extname(file.relative));

               SVGMIN_PLAGINS.push({
                 cleanupIDs: {
                   prefix: prefix + '-', minify: true
                 }
               });
               return {
                 plugins: SVGMIN_PLAGINS
               }
             }))
             .pipe(svgmin({
               js2svg: {
                 pretty: true
               }
             }))
             .pipe(svgstore())
             .pipe(gulp.dest('./img/sprite/'));
});

const SVGMIN_PLAGINS = [
  {
    removeDoctype: true
  },
  {
    removeComments: true
  },
  {
    cleanupNumericValues: {
      floatPrecision: 2
    }
  },
  {
    convertColors: {
      names2hex: false, rgb2hex: false
    }
  },
  {
    collections: true
  },
  {
    moveElemsAttrsToGroup: true
  }
];
